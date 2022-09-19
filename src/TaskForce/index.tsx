import { Select } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { csv } from 'd3-request';
import { TFDataType } from '../Types';
import { TaskForceDashboard } from './TaskForceDashboard';
import CountryTaxonomy from '../Data/countryTaxonomy.json';

const SelectionEl = styled.div`
  width: calc(50% - 1rem);
`;

export const TaskForce = () => {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedIncomeGroup, setSelectedIncomeGroup] = useState('All');
  const [tfData, setTFData] = useState<TFDataType[] | null>(null);
  useEffect(() => {
    csv('./data/TaskForce.csv', (data: any) => {
      const dataFormated: TFDataType[] = data.map((d: any) => ({
        ...d,
        '#Men': d['#Men'] !== undefined ? +d['#Men'] : undefined,
        '#Women': d['#Women'] !== undefined ? +d['#Women'] : undefined,
        Total: d.Total !== undefined ? +d.Total : undefined,
        incomeGroup: CountryTaxonomy.findIndex((el1) => el1['Alpha-3 code-1'] === d['Country Code']) === -1 ? '' : CountryTaxonomy[CountryTaxonomy.findIndex((el1) => el1['Alpha-3 code-1'] === d['Country Code'])]['Income group'],
        '%Women': d['%Women'] !== undefined ? +d['%Women'] : undefined,
        'Leader Gender': d['Leader Gender'] ? d['Leader Gender'] : '',
        'Woman Leader': d['Woman Leader'] ? d['Woman Leader'] : '',
        'Composition Data': d['Composition Data'] ? d['Composition Data'] : '',
        'Composition Classification': d['Composition Classification'] ? d['Composition Classification'] : '',
      }));
      setTFData(dataFormated);
    });
  }, []);
  return (
    <>
      <h3 className='bold'>COVID-19 Task Forces</h3>
      <div className='flex-div flex-space-between margin-top-07 margin-bottom-07'>
        <SelectionEl>
          <p className='label'>Filter by Regions</p>
          <Select
            className='undp-select'
            value={selectedRegion}
            placeholder='All Regions Selected'
            onChange={(e) => { setSelectedRegion(e || 'All'); }}
            allowClear
            clearIcon={<div className='clearIcon' />}
          >
            <Select.Option className='undp-select-option' value='All'>All Regions</Select.Option>
            <Select.Option className='undp-select-option' value='Africa'>Africa</Select.Option>
            <Select.Option className='undp-select-option' value='Americas'>Americas</Select.Option>
            <Select.Option className='undp-select-option' value='Asia'>Asia</Select.Option>
            <Select.Option className='undp-select-option' value='Europe'>Europe</Select.Option>
            <Select.Option className='undp-select-option' value='Oceania'>Oceania</Select.Option>
          </Select>
        </SelectionEl>
        <SelectionEl>
          <p className='label'>Filter by Income Groups</p>
          <Select
            className='undp-select'
            value={selectedIncomeGroup}
            placeholder='All Regions Selected'
            onChange={(e) => { setSelectedIncomeGroup(e || 'All'); }}
            clearIcon={<div className='clearIcon' />}
            allowClear
          >
            <Select.Option className='undp-select-option' value='All'>All income groups</Select.Option>
            <Select.Option className='undp-select-option' value='High income'>High income</Select.Option>
            <Select.Option className='undp-select-option' value='Upper middle income'>Upper middle income</Select.Option>
            <Select.Option className='undp-select-option' value='Lower middle income'>Lower middle income</Select.Option>
            <Select.Option className='undp-select-option' value='Low income'>Low income</Select.Option>
          </Select>
        </SelectionEl>
      </div>
      {
        tfData
          ? (
            <TaskForceDashboard
              selectedRegion={selectedRegion}
              allTFs={tfData}
              selectedIncomeGroup={selectedIncomeGroup}
            />
          )
          : <div className='loader' />
      }
    </>
  );
};
