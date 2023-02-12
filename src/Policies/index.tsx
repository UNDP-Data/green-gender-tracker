import { Input, Select } from 'antd';
import { csv } from 'd3-request';
import { useEffect, useState } from 'react';
import uniqBy from 'lodash.uniqby';
import styled from 'styled-components';
import { PromisingPoliciesDataType } from '../Types';
import { PolicyList } from './PolicyList';

const SelectionEl = styled.div`
  width: calc(33.33% - 1.334rem);
  min-width: 20rem;
  flex-grow: 1;
`;

export const Policies = () => {
  const [searchText, updateSearchText] = useState('');
  const [data, setData] = useState<PromisingPoliciesDataType[] | undefined>(undefined);
  const [countryOptions, setCountryOptions] = useState<string[] | undefined>(undefined);
  const [selectedCountry, updateSelectedCountry] = useState<string>('All');
  const [selectedRegion, updateSelectedRegion] = useState<string>('All');
  const [showVAWG, setShowVAWG] = useState(true);
  const [showWEC, setShowWEC] = useState(true);
  const [showUCW, setShowUCW] = useState(true);
  useEffect(() => {
    csv('https://raw.githubusercontent.com/UNDP-Data/green-gender-tracker/Redesign/public/data/promising-policies.csv', (d: PromisingPoliciesDataType[]) => {
      setCountryOptions(uniqBy(d, 'Country').map((el) => el.Country));
      setData(d);
    });
  }, []);
  return (
    <>
      <div className='flex-div flex-space-between flex-vert-align-center flex-wrap margin-bottom-05 margin-top-05'>
        <h2 className='bold undp-typography margin-bottom-00' style={{ width: '30rem', flexGrow: 1 }}>Promising Policies for Gender Equality Catalogue</h2>
        <div className='flex-div flex-vert-align-center' style={{ gap: '2rem' }}>
          <img src='https://github.com/UNDP-Data/green-gender-tracker/raw/Redesign/public/img/UNDP-Logo-Blue-Medium.png' alt='UNDP logo' style={{ height: '56px' }} />
          <img src='https://github.com/UNDP-Data/green-gender-tracker/raw/Redesign/public/img/un-women-blue.png' alt='UN Women logo' style={{ width: '128px' }} />
          <img src='https://github.com/UNDP-Data/green-gender-tracker/raw/Redesign/public/img/ROK_Logo_PNG.png' alt='ROK logo' style={{ width: '200px' }} />
        </div>
      </div>
      {
        data && countryOptions ? (
          <>
            <div className='flex-div flex-space-between padding-top-05 padding-bottom-05 flex-wrap undp-table-head-sticky' style={{ backgroundColor: 'var(--white)', zIndex: 9 }}>
              <SelectionEl>
                <p className='label'>Measure description – key word search</p>
                <Input value={searchText} onChange={(value) => { updateSearchText(value.target.value); }} className='undp-input' placeholder='Measure description – key word search' />
              </SelectionEl>
              <SelectionEl>
                <p className='label'>Filter by countries/territories</p>
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
                    countryOptions.map((d, i) => <Select.Option className='undp-select-option' key={i} value={d}>{d}</Select.Option>)
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
                <div className='flex-wrap margin-bottom-00'>
                  <p className='label margin-bottom-05'>Gender-sensitive dimension</p>
                  <div className='flex-div flex-wrap'>
                    <button
                      type='button'
                      className='flex-div flex-vert-align-center'
                      style={{
                        backgroundColor: !showVAWG ? 'transparent' : '#590F6B',
                        border: '2px solid #590F6B',
                        padding: '0 1rem',
                        borderRadius: '4rem',
                        gap: '0.5rem',
                        cursor: 'pointer',
                      }}
                      onClick={() => { setShowVAWG(!showVAWG); }}
                    >
                      <img
                        src={showVAWG ? 'https://github.com/UNDP-Data/green-gender-tracker/raw/Redesign/public/img/Icon_VAWG_White.png' : 'https://github.com/UNDP-Data/green-gender-tracker/raw/Redesign/public/img/Icon_VAWG.png'}
                        alt='Violence against women and girls icon'
                        style={{ height: '64px' }}
                      />
                      <h6
                        className='undp-typography margin-bottom-00'
                        style={{
                          color: showVAWG ? 'var(--white)' : '#590F6B',
                        }}
                      >
                        Violence against women and girls
                      </h6>
                    </button>
                    <button
                      type='button'
                      className='flex-div flex-vert-align-center'
                      style={{
                        backgroundColor: !showWEC ? 'transparent' : '#8CA645',
                        border: '2px solid #8CA645',
                        padding: '0 1rem',
                        borderRadius: '4rem',
                        gap: '0.5rem',
                        cursor: 'pointer',
                      }}
                      onClick={() => { setShowWEC(!showWEC); }}
                    >
                      <img
                        src={showWEC ? 'https://github.com/UNDP-Data/green-gender-tracker/raw/Redesign/public/img/Icon_WES_White.png' : 'https://github.com/UNDP-Data/green-gender-tracker/raw/Redesign/public/img/Icon_WES.png'}
                        alt='Women’s economic security icon'
                        style={{ height: '64px' }}
                      />
                      <h6
                        className='undp-typography margin-bottom-00'
                        style={{
                          color: showWEC ? 'var(--white)' : '#8CA645',
                        }}
                      >
                        Women’s economic security
                      </h6>
                    </button>
                    <button
                      type='button'
                      className='flex-div flex-vert-align-center'
                      style={{
                        backgroundColor: !showUCW ? 'transparent' : '#0C9CD8',
                        border: '2px solid #0C9CD8',
                        padding: '0 1rem',
                        borderRadius: '4rem',
                        gap: '0.5rem',
                        cursor: 'pointer',
                      }}
                      onClick={() => { setShowUCW(!showUCW); }}
                    >
                      <img
                        src={showUCW ? 'https://github.com/UNDP-Data/green-gender-tracker/raw/Redesign/public/img/Icon_UCW_White.png' : 'https://github.com/UNDP-Data/green-gender-tracker/raw/Redesign/public/img/Icon_UCW.png'}
                        alt='Unpaid care icon'
                        style={{ height: '64px' }}
                      />
                      <h6
                        className='undp-typography margin-bottom-00'
                        style={{
                          color: showUCW ? 'var(--white)' : '#0C9CD8',
                        }}
                      >
                        Unpaid care
                      </h6>
                    </button>
                  </div>
                </div>
              </SelectionEl>
            </div>
            <PolicyList
              data={data}
              searchText={searchText}
              showVAWG={showVAWG}
              showWEC={showWEC}
              showUCW={showUCW}
              selectedRegion={selectedRegion}
              selectedCountry={selectedCountry}
            />
          </>
        ) : <div className='undp-loader' />
      }
    </>
  );
};
