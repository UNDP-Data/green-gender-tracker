import {
  useContext,
  useEffect, useRef, useState,
} from 'react';
import { geoEqualEarth } from 'd3-geo';
import { zoom } from 'd3-zoom';
import { select } from 'd3-selection';
import { scaleThreshold } from 'd3-scale';
import { Select } from 'antd';
import styled from 'styled-components';
import World from '../Data/worldMap.json';
import { CountryGreenLenseSummaryDataType, CtxDataType } from '../Types';
import { Tooltip } from './Tooltip';
import Context from './Context/Context';

interface Props {
  data: CountryGreenLenseSummaryDataType[];
}

interface HoverDataType {
  data: CountryGreenLenseSummaryDataType;
  xPos: number;
  yPos: number;
}

const G = styled.g`
  pointer-events: none;
`;

const LegendEl = styled.div`
padding: 1rem 1rem 0 1rem;
background-color:rgba(255,255,255,0.7);
position: relative;
margin-bottom: var(--spacing-13);
z-index: 5;
@media (min-width: 961px) {
  max-width: 25rem;
  margin-left: 1rem;
  margin-top: -2rem;
  margin-bottom: var(--spacing-00);
  transform: translateY(-100%);
}
`;

const ABS_COLOR = ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#0c2c84'];
const ABS_VALUE = [5, 10, 15, 20, 25, 30];

export const MapViz = (props: Props) => {
  const {
    data,
  } = props;
  const {
    selectedRegion,
    selectedIncomeGroup,
    selectedFragilityGroup,
    selectedHDI,
    selectedDevelopmentGroup,
    selectedPolicyMeasureCat,
    updateSelectedDevelopmentGroup,
    updateSelectedFragilityGroup,
    updateSelectedHDI,
    updateSelectedIncomeGroup,
    updateSelectedPolicyMeasureCat,
    updateSelectedRegion,
  } = useContext(Context) as CtxDataType;
  const svgHeight = window.innerWidth > 960 ? 678 : 500;
  const svgWidth = window.innerWidth > 960 ? 1280 : 960;
  const mapSvg = useRef<SVGSVGElement>(null);
  const mapG = useRef<SVGGElement>(null);
  const projection = geoEqualEarth().rotate([0, 0]).scale(window.innerWidth > 960 ? 265 : 180).translate([window.innerWidth > 960 ? 550 : 430, window.innerWidth > 960 ? 380 : 280]);

  const [variable, setVariable] = useState<'noOfGenderPolicies' | 'noOfPoliciesPositiveForEnvironment' | 'noOfPoliciesGenderGreenNexus'>('noOfPoliciesGenderGreenNexus');
  const [hoverData, setHoverData] = useState<HoverDataType | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);

  const colorArray = ABS_COLOR;
  const valueArray = ABS_VALUE;
  const absColorScale = scaleThreshold<number, string>()
    .domain(ABS_VALUE)
    .range(ABS_COLOR);
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
      <div className='flex-div flex-space-between flex-vert-align-center margin-top-10 margin-bottom-07'>
        <div style={{ width: '50%', minWidth: '20rem' }}>
          <Select
            className='undp-select'
            value={variable}
            onChange={(e) => { setVariable(e); }}
          >
            <Select.Option className='undp-select-option' value='noOfPoliciesGenderGreenNexus'>Green and gender-sensitive measures</Select.Option>
            <Select.Option className='undp-select-option' value='noOfPoliciesPositiveForEnvironment'>Green measures</Select.Option>
            <Select.Option className='undp-select-option' value='noOfGenderPolicies'>Gender-sensitive measures</Select.Option>
          </Select>
        </div>
      </div>
      {
        selectedRegion === 'All' && selectedIncomeGroup === 'All' && selectedFragilityGroup === 'All' && selectedHDI === 'All' && selectedDevelopmentGroup === 'All' && selectedPolicyMeasureCat === 'All' ? null
          : (
            <div className='flex-div flex-wrap margin-bottom-07 margin-top-00 flex-vert-align-center' style={{ gap: 'var(--spacing-05)' }}>
              <>
                <p className='undp-typography margin-bottom-00 bold'>Filters:</p>
                {
                  selectedRegion === 'All' ? null : <div className='undp-chip undp-chip-small'>{selectedRegion}</div>
                }
                {
                  selectedIncomeGroup === 'All' ? null : <div className='undp-chip undp-chip-small'>{selectedIncomeGroup}</div>
                }
                {
                  selectedFragilityGroup === 'All' ? null : <div className='undp-chip undp-chip-small'>{selectedFragilityGroup}</div>
                }
                {
                  selectedHDI === 'All' ? null : <div className='undp-chip undp-chip-small'>{selectedHDI}</div>
                }
                {
                  selectedDevelopmentGroup === 'All' ? null : <div className='undp-chip undp-chip-small'>{selectedDevelopmentGroup}</div>
                }
                {
                  selectedPolicyMeasureCat === 'All' ? null : <div className='undp-chip undp-chip-small'>{selectedPolicyMeasureCat}</div>
                }
                <button
                  className='undp-chip undp-chip-red undp-chip-small'
                  type='button'
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    updateSelectedRegion('All');
                    updateSelectedIncomeGroup('All');
                    updateSelectedFragilityGroup('All');
                    updateSelectedHDI('All');
                    updateSelectedDevelopmentGroup('All');
                    updateSelectedPolicyMeasureCat('All');
                  }}
                >
                  Reset Filters
                </button>
              </>
            </div>
          )
      }
      <svg width='100%' height='100%' viewBox={`0 0 ${svgWidth} ${svgHeight}`} ref={mapSvg} style={{ backgroundColor: 'var(--gray-100)' }}>
        <g ref={mapG}>
          {
            (World as any).features.map((d: any, i: number) => {
              const index = data.findIndex((el) => el.countryCode === d.properties.ISO3);
              if ((index !== -1) || d.properties.NAME === 'Antarctica') return null;
              return (
                <g
                  key={i}
                  opacity={selectedRegion !== 'All' ? 0.1 : !selectedColor ? 1 : selectedColor === '#FAFAFA' ? 1 : 0.1}
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
                          stroke='#DDD'
                          strokeWidth={0.5}
                          fill='#FAFAFA'
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
                          stroke='#DDD'
                          strokeWidth={0.5}
                          fill='#FAFAFA'
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
              const color = d[variable] > 0 ? absColorScale(d[variable]) : '#D4D6D8';
              const regionOpacity = selectedRegion === 'All' || selectedRegion === d.region;
              const incomeOpacity = selectedIncomeGroup === 'All' || selectedIncomeGroup === d.incomeGroup;
              const fragilityOpacity = selectedFragilityGroup === 'All' || selectedFragilityGroup === d.fragility;
              const hdiOpacity = selectedHDI === 'All' || selectedHDI === d.hdiGroup;
              const devGroupOpacity = selectedDevelopmentGroup === 'All' || d.ldc;
              return (
                <g
                  key={i}
                  opacity={
                    selectedColor
                      ? selectedColor === color && regionOpacity && incomeOpacity && fragilityOpacity && hdiOpacity && devGroupOpacity ? 1 : 0.1
                      : regionOpacity && incomeOpacity && fragilityOpacity && hdiOpacity && devGroupOpacity ? 1 : 0.1
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
                            stroke='#DDD'
                            strokeWidth={0.5}
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
                            stroke='#DDD'
                            strokeWidth={0.5}
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
        <p className='margin-bottom-03 small-font'>
          {
            variable === 'noOfGenderPolicies'
              ? 'Gender-sensitive measures'
              : variable === 'noOfPoliciesPositiveForEnvironment'
                ? 'Green measures'
                : 'Green and gender-sensitive measures'
          }
        </p>
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
              onMouseOver={() => { setSelectedColor('#0c2c84'); }}
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
                  selectedColor === '#0c2c84' ? '#212121' : '#0c2c84'
                }
              />
            </g>
          </g>
          <g
            style={{ cursor: 'pointer' }}
            onMouseOver={() => { setSelectedColor('#FAFAFA'); }}
            onMouseLeave={() => { setSelectedColor(undefined); }}
          >
            <rect
              x={0}
              y={1}
              width={40}
              height={8}
              fill='#FAFAFA'
              stroke={selectedColor === '#FAFAFA' ? '#212121' : '#FAFAFA'}
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
            onMouseOver={() => { setSelectedColor('#D4D6D8'); }}
            onMouseLeave={() => { setSelectedColor(undefined); }}
          >
            <rect
              x={45}
              y={1}
              width={30}
              height={8}
              fill='#D4D6D8'
              stroke={selectedColor === '#D4D6D8' ? '#212121' : '#D4D6D8'}
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
