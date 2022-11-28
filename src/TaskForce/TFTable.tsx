import { Input, Select } from 'antd';
import sortBy from 'lodash.sortby';
import uniqBy from 'lodash.uniqby';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CtxDataType, TFDataType } from '../Types';
import Context from './Context/Context';

import '../style/inputStyle.css';

interface Props {
  data: TFDataType[];
}

const SelectionEl = styled.div`
  width: calc(25% - 0.75rem);
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

export const TFTable = (props: Props) => {
  const {
    data,
  } = props;

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

  const [selectedType, setSelectedType] = useState('All');
  const [tableData, setTableData] = useState<TFDataType[] | undefined>(undefined);
  const [selectedComposition, setSelectedComposition] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string[]>([]);
  const [selectedSector, setSelectedSector] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const dataSorted = sortBy(data, 'Country');
  const countryList = uniqBy(dataSorted, 'Country').map((d) => d.Country);

  useEffect(() => {
    setSelectedCountry([]);
  }, [selectedRegion, selectedIncomeGroup, selectedFragilityGroup, selectedHDI, selectedDevelopmentGroup]);

  useEffect(() => {
    const sortedData = sortBy(data, 'Country');
    const dataByType = selectedType === 'All' ? sortedData : sortedData.filter((d) => d.Type === selectedType);
    const dataByComposition = selectedComposition === 'All'
      ? dataByType
      : selectedComposition === 'Gender Parity'
        ? dataByType.filter((d) => d['Composition Classification'] === 'Gender Parity')
        : selectedComposition === 'Woman'
          ? dataByType.filter((d) => d['%Women'] && d['%Women'] > 50)
          : dataByType.filter((d) => d['Leader Gender'] !== 'Man' && d['Leader Gender'] !== 'NA');
    const dataByCountry = selectedCountry.length === 0 ? dataByComposition : dataByComposition.filter((d) => (selectedCountry.indexOf(d.Country) !== -1));
    const dataBySector = selectedSector.length === 0 ? dataByCountry : dataByCountry.filter((d) => (selectedSector.indexOf(d.Sector) !== -1));
    const dataBySearch = searchValue ? dataBySector.filter((d) => (d['Description of Task Force'].toLowerCase().includes(searchValue.toLowerCase()) || d['Task Force Name'].toLowerCase().includes(searchValue.toLowerCase()))) : dataBySector;
    setTableData(dataBySearch);
  }, [selectedComposition, selectedCountry, selectedSector, selectedType, searchValue, data]);

  return (
    <>
      <h5 className='bold margin-bottom-05 undp-typography'>
        COVID-19 task force details
      </h5>
      {
        selectedRegion === 'All' && selectedIncomeGroup === 'All' && selectedFragilityGroup === 'All' && selectedHDI === 'All' && selectedDevelopmentGroup === 'All' ? null
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
                  }}
                >
                  Reset Filters
                </button>
              </>
            </div>
          )
      }
      <div className='margin-top-04 margin-bottom-07 flex-div flex-wrap'>
        <SelectionEl>
          <p className='label'>Filter by composition</p>
          <Select
            className='undp-select'
            value={selectedComposition}
            maxTagCount='responsive'
            placeholder='All'
            onChange={(e) => { setSelectedComposition(e || 'All'); }}
            allowClear
            clearIcon={<div className='clearIcon' />}
          >
            <Select.Option className='undp-select-option' value='All'>All task forces</Select.Option>
            <Select.Option className='undp-select-option' value='Gender Parity'>Gender-parity task forces</Select.Option>
            <Select.Option className='undp-select-option' value='Woman'>Majority women task forces</Select.Option>
            <Select.Option className='undp-select-option' value='Man and Woman (co-chairs)'>Women-led or co-led task forces</Select.Option>
          </Select>
        </SelectionEl>
        <SelectionEl>
          <p className='label'>Filter by sector</p>
          <Select
            className='undp-select'
            mode='multiple'
            value={selectedSector}
            placeholder='All sectors'
            onChange={(e) => { setSelectedSector(e); }}
            maxTagCount='responsive'
            allowClear
            clearIcon={<div className='clearIcon' />}
          >
            <Select.Option className='undp-select-option' value='Economic'>Economic</Select.Option>
            <Select.Option className='undp-select-option' value='Education'>Education</Select.Option>
            <Select.Option className='undp-select-option' value='Enforcement'>Enforcement</Select.Option>
            <Select.Option className='undp-select-option' value='Multi-Sectoral'>Multi-Sectoral</Select.Option>
            <Select.Option className='undp-select-option' value='Public Health'>Public Health</Select.Option>
            <Select.Option className='undp-select-option' value='Others'>Others</Select.Option>
          </Select>
        </SelectionEl>
        <SelectionEl>
          <p className='label'>Filter by task force type</p>
          <Select
            className='undp-select'
            value={selectedType}
            onChange={(e) => { setSelectedType(e); }}
            clearIcon={<div className='clearIcon' />}
          >
            <Select.Option className='undp-select-option' value='All'>All task force types</Select.Option>
            <Select.Option className='undp-select-option' value='Decision-Making'>Decision-Making</Select.Option>
            <Select.Option className='undp-select-option' value='Expert'>Expert</Select.Option>
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
      </div>
      <div className='margin-bottom-07'>
        <p className='label'>Task force description – key word search</p>
        <Input className='undp-input' placeholder='Search Task Force' onChange={(d) => { setSearchValue(d.target.value); }} />
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
                  <CellEl width='25%' className='undp-table-head-cell'>
                    Task force name
                  </CellEl>
                  <CellEl width='15%' className='undp-table-head-cell'>
                    % Women Members
                  </CellEl>
                  <CellEl width='45%' className='undp-table-head-cell'>
                    Description
                  </CellEl>
                </div>
                {
                  tableData.map((d, i) => (
                    <div key={i} className='undp-table-row' style={{ minWidth: '67.5rem' }}>
                      <CellEl width='15%' className='undp-table-row-cell-small'>
                        {d.Country}
                      </CellEl>
                      <CellEl width='25%' className='undp-table-row-cell-small'>
                        {d['Task Force Name']}
                      </CellEl>
                      <CellEl width='15%' className='undp-table-row-cell-small'>
                        {d['%Women'] ? `${d['%Women']}%` : 'NA'}
                      </CellEl>
                      <CellEl width='45%' className='undp-table-row-cell-small'>
                        <div>
                          <div className='flex-div flex-vert-align-center flex-wrap margin-bottom-04' style={{ gap: '0.5rem' }}>
                            <div className='undp-chip undp-chip-blue undp-chip-small'>
                              {d.Type}
                            </div>
                            <div className='undp-chip undp-chip-green undp-chip-small'>
                              {d.Sector}
                            </div>
                            {
                              d['Woman Leader'] === 'Yes' || d['Woman Leader'] === 'Co-Chair'
                                ? (
                                  <div className='undp-chip undp-chip-small'>
                                    {d['Woman Leader'] === 'Yes' ? 'Women leadership' : 'Women Co-Chair'}
                                  </div>
                                ) : null
                            }
                            {
                              d['Composition Classification'] === 'Majority Women' || d['Composition Classification'] === 'Gender Parity'
                                ? (
                                  <div className='undp-chip undp-chip-small'>
                                    {d['Composition Classification']}
                                  </div>
                                ) : null
                            }
                          </div>
                          {d['Description of Task Force']}
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
