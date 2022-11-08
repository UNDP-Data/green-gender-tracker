import { useEffect, useReducer, useState } from 'react';
import { csv } from 'd3-request';
import { VizArea } from './VisualizationArea';
import Reducer from './Context/Reducer';
import Context from './Context/Context';
import { PolicyGreenLenseDataType, PolicyGreenLenseDataWithCountryData } from '../Types';
import CountryTaxonomy from '../Data/countryTaxonomy.json';

import '../style/segmentedStyle.css';

export const GreenLens = () => {
  const [policyData, setPolicyData] = useState<PolicyGreenLenseDataWithCountryData[] | null>(null);
  const initialState = {
    selectedRegion: 'All',
    selectedIncomeGroup: 'All',
    selectedFragilityGroup: 'All',
    selectedHDI: 'All',
    selectedDevelopmentGroup: 'All',
    selectedPolicyMeasureCat: 'All',
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
  const updateSelectedPolicyMeasureCat = (selectedMeasureCat: string) => {
    dispatch({
      type: 'UPDATE_SELECTED_POLICY_MEASURE_CAT',
      payload: selectedMeasureCat,
    });
  };

  useEffect(() => {
    csv('./data/green-policies.csv', (d: PolicyGreenLenseDataType[]) => {
      const pData: PolicyGreenLenseDataWithCountryData[] = d.map((el) => {
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
      setPolicyData(pData);
    });
  }, []);
  return (
    <>
      <h3 className='bold undp-typography'>Gender Response Policy Tracker with a Green Lens</h3>
      {
        policyData
          ? (
            <Context.Provider
              value={{
                ...state,
                updateSelectedRegion,
                updateSelectedIncomeGroup,
                updateSelectedFragilityGroup,
                updateSelectedHDI,
                updateSelectedDevelopmentGroup,
                updateSelectedPolicyMeasureCat,
              }}
            >
              <VizArea
                policyData={policyData}
              />
            </Context.Provider>
          )
          : <div className='undp-loader' />
      }
    </>
  );
};
