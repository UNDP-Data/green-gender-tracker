import { Segmented, Select } from 'antd';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import uniqBy from 'lodash.uniqby';
import { PolicyGreenLenseDataWithCountryData, CountryGreenLenseSummaryDataType, CtxDataType } from '../Types';
import { PolicyDashboard } from './PolicyDashboard';
import Context from './Context/Context';
import CountryTaxonomy from '../Data/countryTaxonomy.json';

import '../style/segmentedStyle.css';

interface Props {
  policyData: PolicyGreenLenseDataWithCountryData[];
}

const SelectionEl = styled.div`
  width: calc(33.33% - 1.334rem);
`;

const SegmentedEl = styled.div`
  width: calc(33.33% - 1.334rem);
`;

export const VizArea = (props: Props) => {
  const { policyData } = props;
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
  const [countryData, setCountryData] = useState<CountryGreenLenseSummaryDataType[] | null>(null);
  useEffect(() => {
    const cData: CountryGreenLenseSummaryDataType[] = uniqBy(policyData, 'Country Code').map((p) => {
      const countryPoliciesList = selectedPolicyMeasureCat === 'All' ? policyData.filter((el) => el['Country Code'] === p['Country Code']) : policyData.filter((el) => el['Country Code'] === p['Country Code'] && el['Policy Measure Category'] === selectedPolicyMeasureCat);
      return {
        countryName: p['Country Name'],
        countryCode: p['Country Code'],
        region: p.Region,
        incomeGroup: CountryTaxonomy[CountryTaxonomy.findIndex((el) => el['Country Code'] === p['Country Code'])]['Income Group'],
        fragility: CountryTaxonomy[CountryTaxonomy.findIndex((el) => el['Country Code'] === p['Country Code'])]['Fragility Level'],
        hdiGroup: CountryTaxonomy[CountryTaxonomy.findIndex((el) => el['Country Code'] === p['Country Code'])]['HDI code'],
        ldc: CountryTaxonomy[CountryTaxonomy.findIndex((el) => el['Country Code'] === p['Country Code'])]['Least Developed Countries (LDC)'] === 'LDC',
        sids: CountryTaxonomy[CountryTaxonomy.findIndex((el) => el['Country Code'] === p['Country Code'])]['Small Island Developing States (SIDS)'] === 'SIDS',
        noOfPolicies: countryPoliciesList.length,
        noOfGenderPolicies: countryPoliciesList.filter((el) => el['Addresses VAWG'] === 'YES' || el['Directly supports unpaid care'] === 'YES' || el["Targets Women's Economic Security"] === 'YES').length,
        noOfEnvironmetallyPositivePoliciesAddressingVAWG: countryPoliciesList.filter((el) => el['Addresses VAWG'] === 'YES' && el['Positive for environment'] === 'YES').length,
        noOfEnvironmetallyPositivePoliciesSupportingUnpaidCare: countryPoliciesList.filter((el) => el['Directly supports unpaid care'] === 'YES' && el['Positive for environment'] === 'YES').length,
        noOfEnvironmetallyPositivePoliciesTargetingWomenEcoSecurity: countryPoliciesList.filter((el) => el["Targets Women's Economic Security"] === 'YES' && el['Positive for environment'] === 'YES').length,
        noOfPoliciesThatAreEnvironmentalRelevance: countryPoliciesList.filter((el) => el['Environmental relevance'] === 'YES').length,
        noOfPoliciesPositiveForEnvironment: countryPoliciesList.filter((el) => el['Positive for environment'] === 'YES').length,
        noOfPoliciesGenderGreenNexus: countryPoliciesList.filter((el) => el['Gender-Green Nexus'] === 'YES').length,
      };
    });
    setCountryData(cData);
  }, [policyData, selectedPolicyMeasureCat]);
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
        <SelectionEl>
          <p className='label'>Filter by Policy Measure Category</p>
          <Select
            className='undp-select'
            value={selectedPolicyMeasureCat}
            placeholder='All Selected'
            onChange={(e) => { updateSelectedPolicyMeasureCat(e || 'All'); }}
            clearIcon={<div className='clearIcon' />}
            allowClear
          >
            <Select.Option className='undp-select-option' value='All'>All categories</Select.Option>
            <Select.Option className='undp-select-option' value='Labour market'>Labour market</Select.Option>
            <Select.Option className='undp-select-option' value='Economic, financial and fiscal support for businesses and entrepreneurs'>Economic, financial and fiscal support for businesses and entrepreneurs</Select.Option>
            <Select.Option className='undp-select-option' value='Violence against women'>Violence against women</Select.Option>
            <Select.Option className='undp-select-option' value='Social protection'>Social protection</Select.Option>
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
      {
        countryData
          ? (
            <PolicyDashboard
              allPolicies={policyData}
              countrySummaryData={countryData}
            />
          ) : <div className='undp-loader' />
      }
    </>
  );
};
