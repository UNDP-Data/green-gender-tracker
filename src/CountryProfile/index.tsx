import { Select } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { csv } from 'd3-request';
import { queue } from 'd3-queue';
import uniqBy from 'lodash.uniqby';
import { CountryDataType, PolicyDataType, TFDataType } from '../Types';
import { CountryPolicyDashboard } from './CountryPolicyDashboard';
import { CountryTFDashboard } from './CountryTFDashboard';

const SelectionEl = styled.div`
  width: 100%;
`;

export const CountryProfile = () => {
  const [selectedCountry, setSelectedCountry] = useState <CountryDataType>({ name: 'Afghanistan', code: 'AFG' });
  const [policyData, setPolicyData] = useState<PolicyDataType[] | null>(null);
  const [tfData, setTFData] = useState<TFDataType[] | null>(null);
  const [countryList, setCountryList] = useState<CountryDataType[] | null>(null);
  useEffect(() => {
    queue()
      .defer(csv, './data/policies.csv')
      .defer(csv, './data/TaskForce.csv')
      .await((err: any, pData: PolicyDataType[], tData: any) => {
        if (err) throw err;
        const dataFormated = tData.map((d: any) => ({
          ...d,
          '#Men': d['#Men'] !== undefined ? +d['#Men'] : undefined,
          '#Women': d['#Women'] !== undefined ? +d['#Women'] : undefined,
          Total: d.Total !== undefined ? +d.Total : undefined,
          '%Women': d['%Women'] !== undefined ? +d['%Women'] : undefined,
          'Leader Gender': d['Leader Gender'] ? d['Leader Gender'] : '',
          'Woman Leader': d['Woman Leader'] ? d['Woman Leader'] : '',
          'Composition Data': d['Composition Data'] ? d['Composition Data'] : '',
          'Composition Classification': d['Composition Classification'] ? d['Composition Classification'] : '',
        }));
        const countries = uniqBy(pData, 'Country Code').map((d) => ({
          code: d['Country Code'],
          name: d['Country Name'],
        }));
        setTFData(dataFormated);
        setPolicyData(pData);
        setCountryList(countries);
      });

    csv('./data/policies.csv', (d: PolicyDataType[]) => {
      setPolicyData(d);
    });
  }, []);
  return (
    <>
      {
        policyData && tfData && countryList
          ? (
            <>
              <div className='flex-div flex-space-between margin-bottom-07'>
                <SelectionEl>
                  <Select
                    className='undp-select'
                    value={selectedCountry.name}
                    placeholder='Select Country'
                    showSearch
                    onChange={(e) => { setSelectedCountry(countryList[countryList.findIndex((d) => d.name === e)]); }}
                  >
                    {
                      countryList.map((d, i) => <Select.Option className='undp-select-option' key={i} value={d.name}>{d.name}</Select.Option>)
                    }
                  </Select>
                </SelectionEl>
              </div>
              <div className='flex-div flex-space-between margin-top-09'>
                <CountryPolicyDashboard
                  selectedCountry={selectedCountry}
                  allPolicies={policyData}
                />
              </div>
              <div className='flex-div flex-space-between margin-top-09 margin-bottom-05'>
                <CountryTFDashboard
                  selectedCountry={selectedCountry}
                  allTFs={tfData}
                />
              </div>
            </>
          )
          : <div className='loader' />
      }
    </>
  );
};
