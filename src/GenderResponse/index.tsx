import { Select } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { csv } from 'd3-request';
import { PolicyDataType, PolicyDataWithIncome } from '../Types';
import { PolicyDashboard } from './PolicyDashboard';
import CountryTaxonomy from '../Data/countryTaxonomy.json';

const SelectionEl = styled.div`
  width: calc(50% - 1rem);
`;

export const GenderResponse = () => {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedIncomeGroup, setSelectedIncomeGroup] = useState('All');
  const [policyData, setPolicyData] = useState<PolicyDataWithIncome[] | null>(null);
  useEffect(() => {
    csv('./data/policies.csv', (d: PolicyDataType[]) => {
      const pData: PolicyDataWithIncome[] = d.map((el) => ({ ...el, countryIncomeGroup: CountryTaxonomy[CountryTaxonomy.findIndex((el1) => el1['Alpha-3 code-1'] === el['Country Code'])]['Income group'] }));
      setPolicyData(pData);
    });
  }, []);
  return (
    <>
      <h3 className='bold'>Policy Tracker</h3>
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
        policyData
          ? (
            <PolicyDashboard
              selectedRegion={selectedRegion}
              selectedIncomeGroup={selectedIncomeGroup}
              allPolicies={policyData}
            />
          )
          : <div className='loader' />
      }
    </>
  );
};
