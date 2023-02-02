import { Segmented, Select } from 'antd';
import { useContext } from 'react';
import styled from 'styled-components';
import { CountryTFSummaryDataType, CtxDataType, TFDataType } from '../Types';
import Context from './Context/Context';
import { TaskForceDashboard } from './TaskForceDashboard';

interface Props {
  tfData: TFDataType[];
  tfCountryData: CountryTFSummaryDataType[];
}

const SelectionEl = styled.div`
  width: calc(50% - 1rem);
  min-width: 20rem;
  flex-grow: 1;
`;

const SegmentedEl = styled.div`
  width: calc(33.33% - 1.334rem);
  min-width: 20rem;
  flex-grow: 1;
`;

export const VizArea = (props: Props) => {
  const { tfData, tfCountryData } = props;
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
      <div className='flex-div flex-space-between padding-top-05 padding-bottom-05 flex-wrap undp-table-head-sticky' style={{ backgroundColor: 'var(--white)', zIndex: 9 }}>
        <SelectionEl>
          <p className='label'>Filter by regions</p>
          <Select
            className='undp-select'
            value={selectedRegion}
            placeholder='All Regions Selected'
            onChange={(e) => { updateSelectedRegion(e || 'All'); }}
            allowClear
            clearIcon={<div className='clearIcon' />}
          >
            <Select.Option className='undp-select-option' value='All'>All regions</Select.Option>
            <Select.Option className='undp-select-option' value='Africa'>Africa</Select.Option>
            <Select.Option className='undp-select-option' value='Americas'>Americas</Select.Option>
            <Select.Option className='undp-select-option' value='Asia'>Asia</Select.Option>
            <Select.Option className='undp-select-option' value='Europe'>Europe</Select.Option>
            <Select.Option className='undp-select-option' value='Oceania'>Oceania</Select.Option>
          </Select>
        </SelectionEl>
        <SelectionEl>
          <p className='label'>Filter by income groups</p>
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
          <p className='label'>Filter by fragility level</p>
          <Segmented
            className='undp-segmented-small'
            value={selectedFragilityGroup}
            onChange={(value) => { updateSelectedFragilityGroup(value as 'All' | 'Extremely Fragile' | 'Fragile' | 'Not Fragile'); }}
            options={
              [
                {
                  label: 'All',
                  value: 'All',
                },
                {
                  label: 'Extremely fragile',
                  value: 'Extremely Fragile',
                },
                {
                  label: 'Fragile',
                  value: 'Fragile',
                },
                {
                  label: 'Not fragile',
                  value: 'Not Fragile',
                },
              ]
            }
            onResize={() => {}}
            onResizeCapture={() => {}}
          />
        </SegmentedEl>
        <SegmentedEl>
          <p className='label'>Filter by human development index</p>
          <Segmented
            className='undp-segmented-small'
            value={selectedHDI}
            onChange={(value) => { updateSelectedHDI(value as 'All' | 'Very High' | 'High' | 'Medium' | 'Low'); }}
            options={
              [
                {
                  label: 'All',
                  value: 'All',
                },
                {
                  label: 'Very high',
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
            onResize={() => {}}
            onResizeCapture={() => {}}
          />
        </SegmentedEl>
        <SegmentedEl>
          <p className='label'>Filter by development</p>
          <Segmented
            className='undp-segmented-small'
            value={selectedDevelopmentGroup}
            onChange={(value) => { updateSelectedDevelopmentGroup(value as 'All' | 'Least Developed Countries (LDC)'); }}
            options={
              [
                {
                  label: 'All',
                  value: 'All',
                },
                {
                  label: 'Least developed countries (LDC)',
                  value: 'Least Developed Countries (LDC)',
                },
              ]
            }
            onResize={() => {}}
            onResizeCapture={() => {}}
          />
        </SegmentedEl>
        {
          selectedRegion === 'All' && selectedIncomeGroup === 'All' && selectedFragilityGroup === 'All' && selectedHDI === 'All' ? null
            : (
              <div>
                <>
                  <button
                    className='undp-chip undp-chip-red'
                    type='button'
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      updateSelectedRegion('All');
                      updateSelectedIncomeGroup('All');
                      updateSelectedFragilityGroup('All');
                      updateSelectedHDI('All');
                      updateSelectedDevelopmentGroup('All');
                    }}
                  >
                    Reset Filters
                  </button>
                </>
              </div>
            )
        }
      </div>
      <TaskForceDashboard
        allTFs={tfData}
        tfCountryData={tfCountryData}
      />
    </>
  );
};
