import { useEffect, useReducer, useState } from 'react';
import { csv } from 'd3-request';
import uniqBy from 'lodash.uniqby';
import { VizArea } from './VisualizationArea';
import Reducer from './Context/Reducer';
import Context from './Context/Context';
import { PolicyDataType, PolicyDataWithCountryData, CountrySummaryDataType } from '../Types';
import CountryTaxonomy from '../Data/countryTaxonomy.json';

import '../style/segmentedStyle.css';

export const GenderResponse = () => {
  const [policyData, setPolicyData] = useState<PolicyDataWithCountryData[] | null>(null);
  const [countrySummaryData, setCountrySummaryData] = useState<CountrySummaryDataType[] | null>(null);
  const initialState = {
    selectedRegion: 'All',
    selectedIncomeGroup: 'All',
    selectedFragilityGroup: 'All',
    selectedHDI: 'All',
    selectedDevelopmentGroup: 'All',
  };
  const [state, dispatch] = useReducer(Reducer, initialState);

  const updateSelectedRegion = (selectedRegion: string) => {
    dispatch({
      type: 'UPDATE_SELECTED_REGION',
      payload: selectedRegion,
    });
  };
  const updateSelectedIncomeGroup = (selectedIncomeGroup: string) => {
    dispatch({
      type: 'UPDATE_SELECTED_INCOME_GROUP',
      payload: selectedIncomeGroup,
    });
  };
  const updateSelectedFragilityGroup = (selectedFragilityGroup: string) => {
    dispatch({
      type: 'UPDATE_SELECTED_FRAGILITY_GROUP',
      payload: selectedFragilityGroup,
    });
  };
  const updateSelectedHDI = (selectedHDI: string) => {
    dispatch({
      type: 'UPDATE_SELECTED_HDI',
      payload: selectedHDI,
    });
  };
  const updateSelectedDevelopmentGroup = (selectedDevelopemntGroup: string) => {
    dispatch({
      type: 'UPDATE_SELECTED_DEVELOPMENT_GROUP',
      payload: selectedDevelopemntGroup,
    });
  };

  useEffect(() => {
    csv('./data/policies.csv', (d: PolicyDataType[]) => {
      const pData: PolicyDataWithCountryData[] = d.map((el) => {
        const countryTaxonomyIndx = CountryTaxonomy.findIndex((el1) => el1['Country Code'] === el['Country Code']);
        return {
          ...el,
          countryIncomeGroup: CountryTaxonomy[countryTaxonomyIndx]['Income Group'],
          fragility: CountryTaxonomy[countryTaxonomyIndx]['Fragility Level'],
          hdiGroup: CountryTaxonomy[countryTaxonomyIndx]['HDI code'],
          ldc: CountryTaxonomy[countryTaxonomyIndx]['Least Developed Countries (LDC)'] === 'LDC',
          sids: CountryTaxonomy[countryTaxonomyIndx]['Small Island Developing States (SIDS)'] === 'SIDS',
        };
      });

      const countryData: CountrySummaryDataType[] = uniqBy(pData, 'Country Code').map((p) => {
        const countryPoliciesList = pData.filter((el) => el['Country Code'] === p['Country Code']);
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
          noOfPoliciesAddressingVAWG: countryPoliciesList.filter((el) => el['Addresses VAWG'] === 'YES').length,
          noOfPoliciesSupportingUnpaidCare: countryPoliciesList.filter((el) => el['Directly supports unpaid care'] === 'YES').length,
          noOfPoliciesTargetingWomenEcoSecurity: countryPoliciesList.filter((el) => el["Targets Women's Economic Security"] === 'YES').length,
          noOfPoliciesThatAreEnvironmentalRelevance: countryPoliciesList.filter((el) => el['Environmental relevance'] === 'YES').length,
          noOfPoliciesPositiveForEnvironment: countryPoliciesList.filter((el) => el['Positive for environment'] === 'YES').length,
          noOfPoliciesGenderGreenNexus: countryPoliciesList.filter((el) => el['Gender-Green Nexus'] === 'YES').length,
        };
      });
      setPolicyData(pData);
      setCountrySummaryData(countryData);
    });
  }, []);
  return (
    <>
      <h3 className='bold undp-typography'>Policy Tracker</h3>
      {
        policyData && countrySummaryData
          ? (
            <Context.Provider
              value={{
                ...state,
                updateSelectedRegion,
                updateSelectedIncomeGroup,
                updateSelectedFragilityGroup,
                updateSelectedHDI,
                updateSelectedDevelopmentGroup,
              }}
            >
              <VizArea
                policyData={policyData}
                countrySummaryData={countrySummaryData}
              />
            </Context.Provider>
          )
          : <div className='undp-loader' />
      }
    </>
  );
};
