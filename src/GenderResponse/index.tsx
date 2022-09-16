import { Select } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { csv } from 'd3-request';
import { PolicyDataType } from '../Types';
import { PolicyDashboard } from './PolicyDashboard';

const SelectionEl = styled.div`
  width: calc(50% - 1rem);
`;

export const GenderResponse = () => {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedIncomeGroup, setSelectedIncomeGroup] = useState('All');
  const [policyData, setPolicyData] = useState<PolicyDataType[] | null>(null);
  useEffect(() => {
    csv('./data/policies.csv', (d: PolicyDataType[]) => {
      setPolicyData(d);
    });
  }, []);
  return (
    <>
      <h3 className='bold'>COVID-19 Global Gender Response Tracker</h3>
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
            <Select.Option className='undp-select-option' value='Africa'>High income</Select.Option>
            <Select.Option className='undp-select-option' value='Americas'>Upper middle income</Select.Option>
            <Select.Option className='undp-select-option' value='Asia'>Lower middle income</Select.Option>
            <Select.Option className='undp-select-option' value='Europe'>Low income</Select.Option>
          </Select>
        </SelectionEl>
      </div>
      {
        policyData
          ? (
            <PolicyDashboard
              selectedRegion={selectedRegion}
              allPolicies={policyData}
            />
          )
          : <div className='loader' />
      }
    </>
  );
};
