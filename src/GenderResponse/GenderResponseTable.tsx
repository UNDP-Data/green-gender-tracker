import { Select } from 'antd';
import sortBy from 'lodash.sortby';
import uniqBy from 'lodash.uniqby';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PolicyDataType } from '../Types';

interface Props {
  data: PolicyDataType[];
  selectedRegion: string;
}

const SelectionEl = styled.div`
  width: calc(50% - 0.5rem);
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
    selectedRegion,
  } = props;

  const [selectedType, setSelectedType] = useState('All');
  const [tableData, setTableData] = useState<PolicyDataType[] | undefined>(undefined);
  const [selectedCountry, setSelectedCountry] = useState<string[]>([]);
  const dataSorted = sortBy(data, 'Country');
  const countryList = uniqBy(dataSorted, 'Country').map((d) => d['Country Name']);

  useEffect(() => {
    setSelectedCountry([]);
  }, [selectedRegion]);

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
            : sortedData.filter((d) => d['Targets Women\'s Economic Security'] === 'YES');
    const dataByCountry = selectedCountry.length === 0 ? dataByType : dataByType.filter((d) => (selectedCountry.indexOf(d['Country Name']) !== -1));
    setTableData(dataByCountry);
  }, [selectedCountry, selectedType, data]);

  return (
    <>
      <h5 className='bold margin-bottom-04'>
        All gender response Details
        {selectedRegion === 'All' ? null : ` in ${selectedRegion}`}
      </h5>
      <div className='margin-top-04 margin-bottom-05 flex-div'>
        <SelectionEl>
          <p className='label'>Filter by Policy Type</p>
          <Select
            className='undp-select'
            value={selectedType}
            placeholder='All Regions Selected'
            onChange={(e) => { setSelectedType(e); }}
          >
            <Select.Option className='undp-select-option' value='All'>All Policies</Select.Option>
            <Select.Option className='undp-select-option' value='genderRelated'>Gender related policies</Select.Option>
            <Select.Option className='undp-select-option' value='vawg'>Policies adressing voilence againt women</Select.Option>
            <Select.Option className='undp-select-option' value='unpaidCare'>Policies supporting unpaid care</Select.Option>
            <Select.Option className='undp-select-option' value='ecoSecurity'>Policies targetting women&apos;s economic security</Select.Option>
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
                  <CellEl width='20%' className='undp-table-head-cell'>
                    Policy category
                  </CellEl>
                  <CellEl width='65%' className='undp-table-head-cell'>
                    Description
                  </CellEl>
                </div>
                {
                  tableData.map((d, i) => (
                    <div key={i} className='undp-table-row'>
                      <CellEl width='15%' className='undp-table-row-cell-small'>
                        {d['Country Name']}
                      </CellEl>
                      <CellEl width='20%' className='undp-table-row-cell-small'>
                        {d['Policy Measure Category']}
                      </CellEl>
                      <CellEl width='65%' className='undp-table-row-cell-small'>
                        <div>
                          {
                            d['Addresses VAWG'] === 'YES' || d['Directly supports unpaid care'] === 'YES' || d['Targets Women\'s Economic Security'] === 'YES'
                              ? (
                                <div className='flex-div flex-vert-align-center flex-wrap margin-bottom-04' style={{ gap: '0.5rem' }}>
                                  {
                                    d['Addresses VAWG'] === 'YES' || d['Directly supports unpaid care'] === 'YES' || d['Targets Women\'s Economic Security'] === 'YES'
                                      ? (
                                        <div className='undp-chip undp-chip-small'>
                                          Gender sensitive
                                        </div>
                                      ) : null
                                  }
                                  {
                                    d['Addresses VAWG'] === 'YES'
                                      ? (
                                        <div className='undp-chip undp-chip-small undp-chip-blue'>
                                          Addresses voilence against women
                                        </div>
                                      ) : null
                                  }
                                  {
                                    d['Directly supports unpaid care'] === 'YES'
                                      ? (
                                        <div className='undp-chip undp-chip-small undp-chip-yellow'>
                                          Supports unpaid care
                                        </div>
                                      ) : null
                                  }
                                  {
                                    d['Targets Women\'s Economic Security'] === 'YES'
                                      ? (
                                        <div className='undp-chip undp-chip-small undp-chip-green'>
                                          Targets economic security
                                        </div>
                                      ) : null
                                  }
                                </div>
                              ) : null
                            }
                          {d['Policy Measure Description']}
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
