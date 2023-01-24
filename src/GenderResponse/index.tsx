import { useEffect, useReducer, useState } from 'react';
import { csv } from 'd3-request';
import { VizArea } from './VisualizationArea';
import Reducer from './Context/Reducer';
import Context from './Context/Context';
import { PolicyDataType, PolicyDataWithCountryData } from '../Types';
import CountryTaxonomy from '../Data/countryTaxonomy.json';

export const GenderResponse = () => {
  const [policyData, setPolicyData] = useState<PolicyDataWithCountryData[] | null>(null);
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
    csv('https://raw.githubusercontent.com/UNDP-Data/green-gender-tracker/main/public/data/gender-policies.csv', (d: PolicyDataType[]) => {
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
      setPolicyData(pData);
    });
  }, []);
  return (
    <>
      <div className='flex-div flex-space-between flex-vert-align-bottom flex-wrap margin-bottom-05'>
        <h2 className='bold undp-typography margin-bottom-00'>Gender Response Tracker</h2>
        <div className='flex-div flex-vert-align-center' style={{ gap: '2rem' }}>
          <img src='/img/UNDP-Logo-Blue-Medium.png' alt='UNDP logo' height='56' />
          <img src='/img/un-women-blue.png' alt='UN Women logo' width='128' />
        </div>
      </div>
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
