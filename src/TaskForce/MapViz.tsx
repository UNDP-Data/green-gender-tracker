import {
  useEffect, useRef, useState,
} from 'react';
import { geoEqualEarth } from 'd3-geo';
import { zoom } from 'd3-zoom';
import { select } from 'd3-selection';
import { scaleThreshold } from 'd3-scale';
import { Radio, Select } from 'antd';
import styled from 'styled-components';
import World from '../Data/worldMap.json';
import { CountryTFSummaryDataType } from '../Types';
import { Tooltip } from './Tooltip';

interface Props {
  data: CountryTFSummaryDataType[];
  selectedRegion: string;
}

interface HoverDataType {
  data: CountryTFSummaryDataType;
  xPos: number;
  yPos: number;
}

const G = styled.g`
  pointer-events: none;
`;

const LegendEl = styled.div`
  padding: 1rem 1rem 0 1rem;
  background-color:rgba(255,255,255,0.7);
  width: 20rem;
  margin-left: 1rem;
  margin-top: -2rem;
  position: relative;
  z-index: 1000;
  @media (min-width: 961px) {
    transform: translateY(-100%);
  }
`;

const PERCENT_COLOR = ['#ffffd9', '#e4f4cb', '#c4e6c3', '#9dd4c0', '#69c1c1', '#3ea2bd', '#347cab', '#265994', '#173978', '#081d58'];
const PERCENT_VALUE = [10, 20, 30, 40, 50, 60, 70, 80, 90];

const ABS_COLOR = ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#0c2c84'];
const ABS_VALUE = [5, 15, 25, 35, 45, 55];
const ABS_COLOR1 = ['#ffffcc', '#a1dab4', '#41b6c4', '#2c7fb8', '#253494'];
const ABS_VALUE1 = [2, 3, 4, 5];

export const MapViz = (props: Props) => {
  const {
    data,
    selectedRegion,
  } = props;
  const svgHeight = 678;
  const svgWidth = window.innerWidth > 960 ? 1280 : 960;
  const mapSvg = useRef<SVGSVGElement>(null);
  const mapG = useRef<SVGGElement>(null);
  const projection = geoEqualEarth().rotate([0, 0]).scale(265).translate([550, 380]);

  const [variable, setVariable] = useState<'noOfTFWithWomenLeader' | 'noOfTFWithMajorityWomenOfGenderParity' | 'noOfTFMembersWomen'>('noOfTFWithWomenLeader');

  const percentVariable = {
    noOfTFWithWomenLeader: 'percentOfTFWithWomenLeader',
    noOfTFWithMajorityWomenOfGenderParity: 'percentOfTFWithMajorityWomenOfGenderParity',
    noOfTFMembersWomen: 'percentOfTFMembersWomen',
  };
  const [calculation, setCalculation] = useState<'abs' | 'percent'>('abs');
  const [hoverData, setHoverData] = useState<HoverDataType | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);

  const colorArray = calculation === 'abs' ? variable === 'noOfTFMembersWomen' ? ABS_COLOR : ABS_COLOR1 : PERCENT_COLOR;
  const valueArray = calculation === 'abs' ? variable === 'noOfTFMembersWomen' ? ABS_VALUE : ABS_VALUE1 : PERCENT_VALUE;

  const colorScale = scaleThreshold<number, string>()
    .domain(valueArray)
    .range(colorArray);
  useEffect(() => {
    const mapGSelect = select(mapG.current);
    const mapSvgSelect = select(mapSvg.current);
    const zoomBehaviour = zoom()
      .scaleExtent([1, 6])
      .translateExtent([[-20, 0], [svgWidth + 20, svgHeight]])
      .on('zoom', ({ transform }) => {
        mapGSelect.attr('transform', transform);
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapSvgSelect.call(zoomBehaviour as any);
  }, [svgHeight, svgWidth]);
  return (
    <div>
      <div className='flex-div flex-space-between flex-vert-align-center margin-top-10'>
        <div style={{ width: '50%' }}>
          <Select
            className='undp-select'
            value={variable}
            onChange={(e) => { setVariable(e); }}
          >
            <Select.Option className='undp-select-option' value='noOfTFWithWomenLeader'>Task force with women leaders or women co-chairs</Select.Option>
            <Select.Option className='undp-select-option' value='noOfTFWithMajorityWomenOfGenderParity'>Task force with gender parity or with majortiy women member</Select.Option>
            <Select.Option className='undp-select-option' value='noOfTFMembersWomen'>Women member in task force</Select.Option>
          </Select>
        </div>
        <Radio.Group
          value={calculation}
          onChange={(e) => { setCalculation(e.target.value); }}
        >
          <Radio className='undp-radio' value='abs'>No. of</Radio>
          <Radio className='undp-radio' value='percent'>Percentage of Total</Radio>
        </Radio.Group>
      </div>
      <svg width='100%' height='100%' viewBox={`0 0 ${svgWidth} ${svgHeight}`} ref={mapSvg}>
        <g ref={mapG}>
          {
            (World as any).features.map((d: any, i: number) => {
              const index = data.findIndex((el) => el.countryCode === d.properties.ISO3);
              if ((index !== -1) || d.properties.NAME === 'Antarctica') return null;
              return (
                <g
                  key={i}
                  opacity={!selectedColor ? 1 : 0.3}
                >
                  {
                    d.geometry.type === 'MultiPolygon' ? d.geometry.coordinates.map((el:any, j: any) => {
                      let masterPath = '';
                      el.forEach((geo: number[][]) => {
                        let path = ' M';
                        geo.forEach((c: number[], k: number) => {
                          const point = projection([c[0], c[1]]) as [number, number];
                          if (k !== geo.length - 1) path = `${path}${point[0]} ${point[1]}L`;
                          else path = `${path}${point[0]} ${point[1]}`;
                        });
                        masterPath += path;
                      });
                      return (
                        <path
                          key={j}
                          d={masterPath}
                          stroke='#AAA'
                          strokeWidth={0.25}
                          fill='#D4D6D8'
                        />
                      );
                    }) : d.geometry.coordinates.map((el:any, j: number) => {
                      let path = 'M';
                      el.forEach((c: number[], k: number) => {
                        const point = projection([c[0], c[1]]) as [number, number];
                        if (k !== el.length - 1) path = `${path}${point[0]} ${point[1]}L`;
                        else path = `${path}${point[0]} ${point[1]}`;
                      });
                      return (
                        <path
                          key={j}
                          d={path}
                          stroke='#AAA'
                          strokeWidth={0.25}
                          fill='#D4D6D8'
                        />
                      );
                    })
                  }
                </g>
              );
            })
          }
          {
            data.map((d, i: number) => {
              const index = (World as any).features.findIndex((el: any) => d.countryCode === el.properties.ISO3);
              const variableName = calculation === 'abs' ? variable : percentVariable[variable] as 'noOfTFWithWomenLeader' | 'percentOfTFWithWomenLeader' | 'noOfTFWithMajorityWomenOfGenderParity' | 'percentOfTFWithMajorityWomenOfGenderParity' | 'noOfTFMembersWomen' | 'percentOfTFMembersWomen';
              const color = d[variableName] > 0 ? colorScale(d[variableName]) : d[variableName] === -1 ? '#D4D6D8' : '#FFBCB7';
              const regionOpacity = selectedRegion === 'All' || selectedRegion === d.region;
              return (
                <g
                  key={i}
                  opacity={
                    selectedColor
                      ? selectedColor === color ? 1 : 0.1
                      : regionOpacity ? 1 : 0.1
                  }
                  onMouseEnter={(event) => {
                    setHoverData({
                      data: d,
                      xPos: event.clientX,
                      yPos: event.clientY,
                    });
                  }}
                  onMouseMove={(event) => {
                    setHoverData({
                      data: d,
                      xPos: event.clientX,
                      yPos: event.clientY,
                    });
                  }}
                  onMouseLeave={() => {
                    setHoverData(undefined);
                  }}
                >
                  {
                    index === -1 ? null
                      : (World as any).features[index].geometry.type === 'MultiPolygon' ? (World as any).features[index].geometry.coordinates.map((el:any, j: any) => {
                        let masterPath = '';
                        el.forEach((geo: number[][]) => {
                          let path = ' M';
                          geo.forEach((c: number[], k: number) => {
                            const point = projection([c[0], c[1]]) as [number, number];
                            if (k !== geo.length - 1) path = `${path}${point[0]} ${point[1]}L`;
                            else path = `${path}${point[0]} ${point[1]}`;
                          });
                          masterPath += path;
                        });
                        return (
                          <path
                            key={j}
                            d={masterPath}
                            stroke='#AAA'
                            strokeWidth={0.25}
                            fill={color}
                          />
                        );
                      }) : (World as any).features[index].geometry.coordinates.map((el:any, j: number) => {
                        let path = 'M';
                        el.forEach((c: number[], k: number) => {
                          const point = projection([c[0], c[1]]) as [number, number];
                          if (k !== el.length - 1) path = `${path}${point[0]} ${point[1]}L`;
                          else path = `${path}${point[0]} ${point[1]}`;
                        });
                        return (
                          <path
                            key={j}
                            d={path}
                            stroke='#AAA'
                            strokeWidth={0.25}
                            fill={color}
                          />
                        );
                      })
                  }
                </g>
              );
            })
          }
          {
            hoverData
              ? (World as any).features.filter((d: any) => d.properties.ISO3 === hoverData.data.countryCode).map((d: any) => (
                <G
                  opacity={!selectedColor ? 1 : 0.3}
                >
                  {
                    d.geometry.type === 'MultiPolygon' ? d.geometry.coordinates.map((el:any, j: any) => {
                      let masterPath = '';
                      el.forEach((geo: number[][]) => {
                        let path = ' M';
                        geo.forEach((c: number[], k: number) => {
                          const point = projection([c[0], c[1]]) as [number, number];
                          if (k !== geo.length - 1) path = `${path}${point[0]} ${point[1]}L`;
                          else path = `${path}${point[0]} ${point[1]}`;
                        });
                        masterPath += path;
                      });
                      return (
                        <path
                          key={j}
                          d={masterPath}
                          stroke='#212121'
                          opacity={1}
                          strokeWidth={1}
                          fillOpacity={0}
                          fill='none'
                        />
                      );
                    }) : d.geometry.coordinates.map((el:any, j: number) => {
                      let path = 'M';
                      el.forEach((c: number[], k: number) => {
                        const point = projection([c[0], c[1]]) as [number, number];
                        if (k !== el.length - 1) path = `${path}${point[0]} ${point[1]}L`;
                        else path = `${path}${point[0]} ${point[1]}`;
                      });
                      return (
                        <path
                          key={j}
                          d={path}
                          stroke='#212121'
                          opacity={1}
                          strokeWidth={1}
                          fillOpacity={0}
                          fill='none'
                        />
                      );
                    })
                  }
                </G>
              )) : null
          }
        </g>
      </svg>
      <LegendEl>
        <h6 className='margin-bottom-02'>
          {
            variable === 'noOfTFWithWomenLeader'
              ? 'Task force with women leader or co-chair'
              : variable === 'noOfTFMembersWomen'
                ? 'Women member of task force'
                : 'Task force with gender parity or majority women'
          }
        </h6>
        <svg width='100%' viewBox={`0 0 ${335} ${30}`}>
          <g transform={`translate(${76},0)`}>
            {
              valueArray.map((d, i) => (
                <g
                  key={i}
                  style={{ cursor: 'pointer' }}
                  onMouseOver={() => { setSelectedColor(colorArray[i]); }}
                  onMouseLeave={() => { setSelectedColor(undefined); }}
                >
                  <rect
                    x={(i * 260) / colorArray.length + 1}
                    y={1}
                    width={(260 / colorArray.length) - 2}
                    height={8}
                    fill={colorArray[i]}
                    stroke={selectedColor === colorArray[i] ? '#212121' : colorArray[i]}
                  />
                  <text
                    x={((i + 1) * 260) / colorArray.length}
                    y={25}
                    textAnchor='middle'
                    fontSize={12}
                    fill='#212121'
                  >
                    {d}
                  </text>
                </g>
              ))
            }
            <g
              style={{ cursor: 'pointer' }}
              onMouseOver={() => { setSelectedColor(calculation === 'abs' ? '#0c2c84' : '#081d58'); }}
              onMouseLeave={() => { setSelectedColor(undefined); }}
            >
              <rect
                x={((valueArray.length * 260) / colorArray.length) + 1}
                y={1}
                width={(260 / colorArray.length) - 2}
                height={8}
                fill={colorArray[valueArray.length]}
                strokeWidth={1}
                stroke={
                  calculation === 'abs'
                    ? selectedColor === '#0c2c84' ? '#212121' : '#0c2c84'
                    : selectedColor === '#081d58' ? '#212121' : '#081d58'
                }
              />
            </g>
          </g>
          <g
            style={{ cursor: 'pointer' }}
            onMouseOver={() => { setSelectedColor('#D4D6D8'); }}
            onMouseLeave={() => { setSelectedColor(undefined); }}
          >
            <rect
              x={0}
              y={1}
              width={40}
              height={8}
              fill='#D4D6D8'
              stroke={selectedColor === '#D4D6D8' ? '#212121' : '#D4D6D8'}
            />
            <text
              x={20}
              y={25}
              textAnchor='middle'
              fontSize={10}
              fill='#212121'
            >
              No Data
            </text>
          </g>
          <g
            style={{ cursor: 'pointer' }}
            onMouseOver={() => { setSelectedColor('#FFBCB7'); }}
            onMouseLeave={() => { setSelectedColor(undefined); }}
          >
            <rect
              x={45}
              y={1}
              width={30}
              height={8}
              fill='#FFBCB7'
              stroke={selectedColor === '#FFBCB7' ? '#212121' : '#FFBCB7'}
            />
            <text
              x={60}
              y={25}
              textAnchor='middle'
              fontSize={10}
              fill='#212121'
            >
              0
            </text>
          </g>
        </svg>
      </LegendEl>
      {
        hoverData ? <Tooltip data={hoverData.data} xPos={hoverData.xPos} yPos={hoverData.yPos} /> : null
      }
    </div>
  );
};
