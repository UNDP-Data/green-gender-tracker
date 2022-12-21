import { Checkbox, Input, Select } from 'antd';
import { csv } from 'd3-request';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PromisingPoliciesDataType } from '../Types';
import { PolicyList } from './PolicyList';

const SelectionEl = styled.div`
  width: calc(33.33% - 1.334rem);
  min-width: 20rem;
  flex-grow: 1;
`;

const countryList = ['Argentina', 'Bahrain', 'Belgium', 'Belize', 'Cuba', 'Dominican Republic', 'Guyana', 'Lithuania', 'Norway', 'Peru', 'Togo'];

export const Policies = () => {
  const [searchText, updateSearchText] = useState('');
  const [data, setData] = useState<PromisingPoliciesDataType[] | undefined>(undefined);
  const [selectedCountry, updateSelectedCountry] = useState<string>('All');
  const [selectedRegion, updateSelectedRegion] = useState<string>('All');
  const [showVAWG, setShowVAWG] = useState(true);
  const [showWEC, setShowWEC] = useState(true);
  const [showUCW, setShowUCW] = useState(true);
  useEffect(() => {
    csv('./data/promising-policies.csv', (d: PromisingPoliciesDataType[]) => {
      setData(d);
    });
  }, []);
  return (
    <>
      <h3 className='bold undp-typography'>Promising Policies for Gender Equality Catalogue</h3>
      <div className='flex-div flex-space-between margin-top-07 margin-bottom-05 flex-wrap'>
        <div style={{ width: '100%' }}>
          <p className='label'>Search a policy</p>
          <Input value={searchText} onChange={(value) => { updateSearchText(value.target.value); }} className='undp-input' placeholder='Search a policy' />
        </div>
        <SelectionEl>
          <p className='label'>Filter by countries</p>
          <Select
            className='undp-select'
            value={selectedCountry}
            placeholder='All Regions Selected'
            onChange={(e) => { updateSelectedCountry(e || 'All'); }}
            allowClear
            clearIcon={<div className='clearIcon' />}
          >
            <Select.Option className='undp-select-option' value='All'>All Countries</Select.Option>
            {
              countryList.map((d, i) => <Select.Option className='undp-select-option' key={i} value={d}>{d}</Select.Option>)
            }
          </Select>
        </SelectionEl>
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
          <div className='flex-wrap margin-bottom-07'>
            <p className='label margin-bottom-05'>Policy category and type</p>
            <Checkbox className='undp-checkbox' checked={showVAWG} onChange={() => { setShowVAWG(!showVAWG); }}>Violence against women and girls</Checkbox>
            <Checkbox className='undp-checkbox' checked={showWEC} onChange={() => { setShowWEC(!showWEC); }}>Women’s economic security</Checkbox>
            <Checkbox className='undp-checkbox' checked={showUCW} onChange={() => { setShowUCW(!showUCW); }}>Unpaid care</Checkbox>
          </div>
        </SelectionEl>
      </div>
      {
        data ? (
          <PolicyList
            data={data}
            searchText={searchText}
            showVAWG={showVAWG}
            showWEC={showWEC}
            showUCW={showUCW}
            selectedRegion={selectedRegion}
            selectedCountry={selectedCountry}
          />
        ) : <div className='undp-loader' />
      }
    </>
  );
};
