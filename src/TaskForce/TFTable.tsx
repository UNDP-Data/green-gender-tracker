import { Select } from 'antd';
import sortBy from 'lodash.sortby';
import uniqBy from 'lodash.uniqby';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TFDataType } from '../Types';

interface Props {
  data: TFDataType[];
  selectedRegion: string;
}

const SelectionEl = styled.div`
  width: calc(25% - 0.75rem);
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
    selectedRegion,
  } = props;

  const [selectedType, setSelectedType] = useState('All');
  const [tableData, setTableData] = useState<TFDataType[] | undefined>(undefined);
  const [selectedLeadGender, setSelectedLeadGender] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string[]>([]);
  const [selectedSector, setSelectedSector] = useState<string[]>([]);
  const dataSorted = sortBy(data, 'Country');
  const countryList = uniqBy(dataSorted, 'Country').map((d) => d.Country);

  useEffect(() => {
    setSelectedCountry([]);
  }, [selectedRegion]);

  useEffect(() => {
    const sortedData = sortBy(data, 'Country');
    const dataByType = selectedType === 'All' ? sortedData : sortedData.filter((d) => d.Type === selectedType);
    const dataByLeadGender = selectedLeadGender.length === 0 ? dataByType : dataByType.filter((d) => (selectedLeadGender.indexOf(d['Leader Gender']) !== -1));
    const dataByCountry = selectedCountry.length === 0 ? dataByLeadGender : dataByLeadGender.filter((d) => (selectedCountry.indexOf(d.Country) !== -1));
    const dataBySector = selectedSector.length === 0 ? dataByCountry : dataByCountry.filter((d) => (selectedSector.indexOf(d.Sector) !== -1));
    setTableData(dataBySector);
  }, [selectedLeadGender, selectedCountry, selectedSector, selectedType, data]);

  return (
    <>
      <h5 className='bold margin-bottom-04'>
        All task Force Details
        {selectedRegion === 'All' ? null : ` in ${selectedRegion}`}
      </h5>
      <div className='margin-top-04 margin-bottom-05 flex-div'>
        <SelectionEl>
          <p className='label'>Filter by lead gender</p>
          <Select
            className='undp-select'
            mode='multiple'
            value={selectedLeadGender}
            maxTagCount='responsive'
            placeholder='All'
            onChange={(e) => { setSelectedLeadGender(e); }}
            allowClear
            clearIcon={<div className='clearIcon' />}
          >
            <Select.Option className='undp-select-option' value='Man'>Men Leadership</Select.Option>
            <Select.Option className='undp-select-option' value='Woman'>Women Leadership</Select.Option>
            <Select.Option className='undp-select-option' value='Man and Woman (co-chairs)'>Co-Chair</Select.Option>
          </Select>
        </SelectionEl>
        <SelectionEl>
          <p className='label'>Filter by sector</p>
          <Select
            className='undp-select'
            mode='multiple'
            value={selectedSector}
            placeholder='All Sectors'
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
            placeholder='All Regions Selected'
            onChange={(e) => { setSelectedType(e); }}
            clearIcon={<div className='clearIcon' />}
          >
            <Select.Option className='undp-select-option' value='All'>All task forces type</Select.Option>
            <Select.Option className='undp-select-option' value='Decision-Making'>Decision-Making</Select.Option>
            <Select.Option className='undp-select-option' value='Expert'>Expert</Select.Option>
          </Select>
        </SelectionEl>
        <SelectionEl>
          <p className='label'>Filter by countries</p>
          <Select
            className='undp-select'
            value={selectedCountry}
            mode='multiple'
            placeholder='All countries Selected'
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
      {
        tableData
          ? (
            <div style={{ maxHeight: '40rem', borderBottom: '1px solid var(--gray-400)' }} className='undp-scrollbar'>
              <div style={{ width: '100%' }}>
                <div className='undp-table-head-small undp-table-head-sticky'>
                  <CellEl width='15%' className='undp-table-head-cell undp-sticky-head-column'>
                    Country
                  </CellEl>
                  <CellEl width='30%' className='undp-table-head-cell'>
                    Task force Name
                  </CellEl>
                  <CellEl width='55%' className='undp-table-head-cell'>
                    Description
                  </CellEl>
                </div>
                {
                  tableData.map((d, i) => (
                    <div key={i} className='undp-table-row'>
                      <CellEl width='15%' className='undp-table-row-cell-small'>
                        {d.Country}
                      </CellEl>
                      <CellEl width='30%' className='undp-table-row-cell-small'>
                        {d['Task Force Name']}
                      </CellEl>
                      <CellEl width='55%' className='undp-table-row-cell-small'>
                        <div>
                          <div className='flex-div flex-vert-align-center flex-wrap margin-bottom-04' style={{ gap: '0.5rem' }}>
                            <div className='undp-chip undp-chip-blue undp-chip-small'>
                              {d.Type}
                            </div>
                            <div className='undp-chip undp-chip-blue undp-chip-small'>
                              {d.Sector}
                            </div>
                            {
                              d['Woman Leader'] === 'Yes' || d['Woman Leader'] === 'Co-Chair'
                                ? (
                                  <div className='undp-chip undp-chip-blue undp-chip-small undp-chip-green'>
                                    {d['Woman Leader'] === 'Yes' ? 'Women leadership' : 'Women Co-Chair'}
                                  </div>
                                ) : d['Woman Leader'] === 'No'
                                  ? (
                                    <div className='undp-chip undp-chip-blue undp-chip-small undp-chip-yellow'>
                                      Men leadership
                                    </div>
                                  ) : null
                            }
                            {
                              d['Composition Classification'] === 'Majority Women' || d['Composition Classification'] === 'Gender Parity'
                                ? (
                                  <div className='undp-chip undp-chip-blue undp-chip-small undp-chip-green'>
                                    {d['Composition Classification']}
                                  </div>
                                ) : d['Composition Classification'] === 'Majority Men' ? (
                                  <div className='undp-chip undp-chip-blue undp-chip-small undp-chip-yellow'>
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
