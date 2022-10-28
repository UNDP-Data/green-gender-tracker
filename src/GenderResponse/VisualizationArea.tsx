import { Segmented, Select } from 'antd';
import { useContext } from 'react';
import styled from 'styled-components';
import { PolicyDataWithCountryData, CountrySummaryDataType, CtxDataType } from '../Types';
import { PolicyDashboard } from './PolicyDashboard';

import '../style/segmentedStyle.css';
import Context from './Context/Context';

interface Props {
  policyData: PolicyDataWithCountryData[];
  countrySummaryData: CountrySummaryDataType[];
}

const SelectionEl = styled.div`
  width: calc(50% - 1rem);
`;

const SegmentedEl = styled.div`
  width: calc(33% - 1.33rem);
`;

export const VizArea = (props: Props) => {
  const { policyData, countrySummaryData } = props;
  const {
    selectedRegion,
    selectedIncomeGroup,
    selectedFragilityGroup,
    selectedHDI,
    selectedDevelopmentGroup,
    updateSelectedRegion,
    updateSelectedIncomeGroup,
    updateSelectedFragilityGroup,
    updateSelectedHDI,
    updateSelectedDevelopmentGroup,
  } = useContext(Context) as CtxDataType;
  return (
    <>
      <div className='flex-div flex-space-between margin-top-07 margin-bottom-07 flex-wrap'>
        <SelectionEl>
          <p className='label'>Filter by Regions</p>
          <Select
            className='undp-select'
            value={selectedRegion}
            placeholder='All Regions Selected'
            onChange={(e) => { updateSelectedRegion(e || 'All'); }}
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
            onChange={(e) => { updateSelectedIncomeGroup(e || 'All'); }}
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
        <SegmentedEl>
          <p className='label'>Filter By Fragility Level</p>
          <Segmented
            className='undp-segmented'
            value={selectedFragilityGroup}
            onChange={(value) => { updateSelectedFragilityGroup(value as 'All' | 'Extremely Fragile' | 'Fragile' | 'Not Fragile'); }}
            options={
              [
                {
                  label: 'All',
                  value: 'All',
                },
                {
                  label: 'Extremely Fragile',
                  value: 'Extremely Fragile',
                },
                {
                  label: 'Fragile',
                  value: 'Fragile',
                },
                {
                  label: 'Not Fragile',
                  value: 'Not Fragile',
                },
              ]
            }
          />
        </SegmentedEl>
        <SegmentedEl>
          <p className='label'>Filter By HDI</p>
          <Segmented
            className='undp-segmented'
            value={selectedHDI}
            onChange={(value) => { updateSelectedHDI(value as 'All' | 'Very High' | 'High' | 'Medium' | 'Low'); }}
            options={
              [
                {
                  label: 'All',
                  value: 'All',
                },
                {
                  label: 'Very High',
                  value: 'Very High',
                },
                {
                  label: 'High',
                  value: 'High',
                },
                {
                  label: 'Medium',
                  value: 'Medium',
                },
                {
                  label: 'Low',
                  value: 'Low',
                },
              ]
            }
          />
        </SegmentedEl>
        <SegmentedEl>
          <p className='label'>Filter By Development</p>
          <Segmented
            className='undp-segmented'
            value={selectedDevelopmentGroup}
            onChange={(value) => { updateSelectedDevelopmentGroup(value as 'All' | 'Least Developed Countries (LDC)'); }}
            options={
              [
                {
                  label: 'All',
                  value: 'All',
                },
                {
                  label: 'Least Developed Countries (LDC)',
                  value: 'Least Developed Countries (LDC)',
                },
              ]
            }
          />
        </SegmentedEl>
      </div>
      <PolicyDashboard
        allPolicies={policyData}
        countrySummaryData={countrySummaryData}
      />
    </>
  );
};
