import { Input, Select, Switch } from 'antd';
import sortBy from 'lodash.sortby';
import uniqBy from 'lodash.uniqby';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CtxDataType, PolicyGreenLenseDataType } from '../Types';
import Context from './Context/Context';

import '../style/switchStyle.css';

interface Props {
  data: PolicyGreenLenseDataType[];
}

const SelectionEl = styled.div`
  width: calc(33.33% - 1.334rem);
  min-width: 20rem;
  flex-grow: 1;
`;

interface CellProps {
  width: string;
  cursor?: string;
}

const CellEl = styled.div<CellProps>`
  width: ${(props) => props.width};
  cursor: ${(props) => (props.cursor ? props.cursor : 'auto')};
`;

export const GenderResponseTable = (props: Props) => {
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
    updateSelectedRegion,
    updateSelectedIncomeGroup,
    updateSelectedFragilityGroup,
    updateSelectedHDI,
    updateSelectedDevelopmentGroup,
    updateSelectedPolicyMeasureCat,
  } = useContext(Context) as CtxDataType;

  const [selectedType, setSelectedType] = useState('All');
  const [tableData, setTableData] = useState<PolicyGreenLenseDataType[] | undefined>(undefined);
  const [selectedCountry, setSelectedCountry] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [showEnvPositiveOnly, setShowEnvPositiveOnly] = useState(false);
  const dataSorted = sortBy(data, 'Country Name');
  const countryList = uniqBy(dataSorted, 'Country Name').map((d) => d['Country Name']);

  useEffect(() => {
    setSelectedCountry([]);
    setShowEnvPositiveOnly(false);
    setSearchValue(null);
  }, [selectedRegion, selectedIncomeGroup, selectedFragilityGroup, selectedHDI, selectedDevelopmentGroup]);

  useEffect(() => {
    const sortedData = sortBy(data, 'Country');
    const dataByType = selectedType === 'All'
      ? sortedData
      : selectedType === 'genderRelated'
        ? sortedData.filter((d) => d['Addresses VAWG'] === 'YES' || d['Directly supports unpaid care'] === 'YES' || d['Targets Women\'s Economic Security'] === 'YES')
        : selectedType === 'vawg'
          ? sortedData.filter((d) => d['Addresses VAWG'] === 'YES')
          : selectedType === 'unpaidCare'
            ? sortedData.filter((d) => d['Directly supports unpaid care'] === 'YES')
            : selectedType === 'ecoSecurity'
              ? sortedData.filter((d) => d['Targets Women\'s Economic Security'] === 'YES')
              : selectedType === 'envRelavant'
                ? sortedData.filter((d) => d['Positive for environment'] === 'YES')
                : sortedData.filter((d) => d['Gender-Green Nexus'] === 'YES');
    const dataByCountry = selectedCountry.length === 0 ? dataByType : dataByType.filter((d) => (selectedCountry.indexOf(d['Country Name']) !== -1));
    const dataByEnv = showEnvPositiveOnly ? dataByCountry.filter((d) => d['Positive for environment'] === 'YES') : dataByCountry;
    const dataBySearch = searchValue ? dataByEnv.filter((d) => (d['Policy Measure Description'].toLowerCase().includes(searchValue.toLowerCase()))) : dataByEnv;
    setTableData(dataBySearch);
  }, [selectedCountry, selectedType, searchValue, showEnvPositiveOnly, data]);
  return (
    <>
      <h5 className='bold margin-bottom-05 undp-typography'>
        View policy measure details
      </h5>
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
      <div className='margin-top-04 margin-bottom-05 flex-div flex-wrap flex-space-between'>
        <SelectionEl>
          <p className='label'>Filter by policy type</p>
          <Select
            className='undp-select'
            value={selectedType}
            onChange={(e) => { setSelectedType(e); }}
          >
            <Select.Option className='undp-select-option' value='All'>All measures</Select.Option>
            <Select.Option className='undp-select-option' value='genderRelated'>Gender-sensitive</Select.Option>
            <Select.Option className='undp-select-option' value='envRelavant'>Green</Select.Option>
            <Select.Option className='undp-select-option' value='envGenNexus'>Green and gender-sensitive</Select.Option>
            <Select.Option className='undp-select-option' value='vawg'>Violence against women</Select.Option>
            <Select.Option className='undp-select-option' value='unpaidCare'>Unpaid care</Select.Option>
            <Select.Option className='undp-select-option' value='ecoSecurity'>Women&apos;s economic security</Select.Option>
          </Select>
        </SelectionEl>
        <SelectionEl>
          <p className='label'>Filter by countries/territories</p>
          <Select
            className='undp-select'
            value={selectedCountry}
            mode='multiple'
            placeholder='All countries/territories selected'
            maxTagCount='responsive'
            onChange={(e) => { setSelectedCountry(e); }}
            clearIcon={<div className='clearIcon' />}
            allowClear
          >
            {
              countryList.map((d, i) => <Select.Option key={i} className='undp-select-option' value={d}>{d}</Select.Option>)
            }
          </Select>
        </SelectionEl>
        <SelectionEl>
          <p className='label'>Show only green measures</p>
          <Switch className='undp-switch' onChange={(checked) => { setShowEnvPositiveOnly(checked); }} />
        </SelectionEl>
      </div>
      <div className='margin-bottom-07'>
        <p className='label'>Measure description – key word search</p>
        <Input className='undp-input' placeholder='Search policies' onChange={(d) => { setSearchValue(d.target.value); }} />
      </div>
      {
        tableData
          ? (
            <div style={{ maxHeight: '40rem', borderBottom: '1px solid var(--gray-400)' }} className='undp-scrollbar'>
              <div style={{ width: '100%' }}>
                <div className='undp-table-head-small undp-table-head-sticky' style={{ minWidth: '67.5rem' }}>
                  <CellEl width='15%' className='undp-table-head-cell undp-sticky-head-column'>
                    Country
                  </CellEl>
                  <CellEl width='20%' className='undp-table-head-cell'>
                    Policy category
                  </CellEl>
                  <CellEl width='65%' className='undp-table-head-cell'>
                    Description
                  </CellEl>
                </div>
                {
                  tableData.map((d, i) => (
                    <div key={i} className='undp-table-row' style={{ minWidth: '67.5rem' }}>
                      <CellEl width='15%' className='undp-table-row-cell-small'>
                        {d['Country Name']}
                      </CellEl>
                      <CellEl width='20%' className='undp-table-row-cell-small'>
                        {d['Policy Measure Category']}
                      </CellEl>
                      <CellEl width='65%' className='undp-table-row-cell-small'>
                        <div>
                          {
                            d['Addresses VAWG'] === 'YES' || d['Directly supports unpaid care'] === 'YES' || d['Targets Women\'s Economic Security'] === 'YES' || d['Positive for environment'] === 'YES'
                              ? (
                                <div className='flex-div flex-vert-align-center flex-wrap margin-bottom-04' style={{ gap: '0.5rem' }}>
                                  {
                                    d['Addresses VAWG'] === 'YES' || d['Directly supports unpaid care'] === 'YES' || d['Targets Women\'s Economic Security'] === 'YES'
                                      ? (
                                        <div className='undp-chip undp-chip-small' style={{ backgroundColor: '#E4D4E8' }}>
                                          Gender-sensitive
                                        </div>
                                      ) : null
                                  }
                                  {
                                    d['Addresses VAWG'] === 'YES'
                                      ? (
                                        <div className='undp-chip undp-chip-small undp-chip-blue'>
                                          Violence against women
                                        </div>
                                      ) : null
                                  }
                                  {
                                    d['Directly supports unpaid care'] === 'YES'
                                      ? (
                                        <div className='undp-chip undp-chip-small undp-chip-blue'>
                                          Unpaid care work
                                        </div>
                                      ) : null
                                  }
                                  {
                                    d['Targets Women\'s Economic Security'] === 'YES'
                                      ? (
                                        <div className='undp-chip undp-chip-small undp-chip-blue'>
                                          Women&apos;s economic security
                                        </div>
                                      ) : null
                                  }
                                  {
                                    d['Positive for environment'] === 'YES'
                                      ? (
                                        <div className='undp-chip undp-chip-small undp-chip-green'>
                                          Green
                                        </div>
                                      ) : null
                                  }
                                </div>
                              ) : null
                            }
                          {
                            d['Policy Measure Description']
                          }
                        </div>
                      </CellEl>
                    </div>
                  ))
                }
              </div>
            </div>
          ) : null
      }
    </>
  );
};
