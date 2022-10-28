import { Select } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { csv } from 'd3-request';
import { queue } from 'd3-queue';
import uniqBy from 'lodash.uniqby';
import { CountryDataType, PolicyDataType, TFDataType } from '../Types';
import { CountryPolicyDashboard } from './CountryPolicyDashboard';
import { CountryTFDashboard } from './CountryTFDashboard';
import CountryTaxonomy from '../Data/countryTaxonomy.json';

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
        const dataFormated: TFDataType[] = tData.map((d: any) => {
          const countryTaxonomyIndx = CountryTaxonomy.findIndex((el1) => el1['Country Code'] === d['Country Code']);
          return {
            ...d,
            '#Men': d['#Men'] !== undefined ? +d['#Men'] : undefined,
            '#Women': d['#Women'] !== undefined ? +d['#Women'] : undefined,
            Total: d.Total !== undefined ? +d.Total : undefined,
            incomeGroup: CountryTaxonomy[countryTaxonomyIndx]['Income Group'],
            fragility: CountryTaxonomy[countryTaxonomyIndx]['Fragility Level'],
            hdiGroup: CountryTaxonomy[countryTaxonomyIndx]['HDI code'],
            ldc: CountryTaxonomy[countryTaxonomyIndx]['Least Developed Countries (LDC)'] === 'LDC',
            sids: CountryTaxonomy[countryTaxonomyIndx]['Small Island Developing States (SIDS)'] === 'SIDS',
            '%Women': d['%Women'] !== '' ? +d['%Women'] : undefined,
            'Leader Gender': d['Leader Gender'] !== '' ? d['Leader Gender'] : 'NA',
            'Woman Leader': d['Woman Leader'],
            'Composition Data': d['Composition Data'],
            genderParity: d['%Women'] !== undefined ? !!(+d['%Women'] > 47 && +d['%Women'] < 53) : undefined,
            'Composition Classification': d['Composition Classification'] !== '' ? d['Composition Classification'] : 'NA',
          };
        });
        const countries = uniqBy(pData, 'Country Code').map((d) => ({
          code: d['Country Code'],
          name: d['Country Name'],
        }));
        setTFData(dataFormated);
        setPolicyData(pData);
        setCountryList(countries);
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
