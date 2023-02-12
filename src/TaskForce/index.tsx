import { useEffect, useReducer, useState } from 'react';
import { csv } from 'd3-request';
import uniqBy from 'lodash.uniqby';
import sumBy from 'lodash.sumby';
import { VizArea } from './VisualizationArea';
import Reducer from './Context/Reducer';
import Context from './Context/Context';
import { CountryTFSummaryDataType, TFDataType } from '../Types';
import CountryTaxonomy from '../Data/countryTaxonomy.json';

export const TaskForce = () => {
  const [tfData, setTFData] = useState<TFDataType[] | null>(null);
  const [tfCountryData, setTFCountryData] = useState<CountryTFSummaryDataType[] | null>(null);
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
    csv('https://raw.githubusercontent.com/UNDP-Data/green-gender-tracker/Redesign/public/data/Taskforce.csv', (data: any) => {
      const dataFormated: TFDataType[] = data.map((d: any) => {
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
      const countryData: CountryTFSummaryDataType[] = uniqBy(dataFormated, 'Country Code').map((d) => {
        const countryTFList = dataFormated.filter((el) => el['Country Code'] === d['Country Code']);
        const countryTFsByRegionWomenMajority = countryTFList.filter((el) => el['Composition Classification'] === 'Majority Women' || el['Composition Classification'] === 'Gender Parity');
        const countryTFsByRegionWomenLeader = countryTFList.filter((el) => el['Leader Gender'] === 'Woman' || el['Leader Gender'] === 'Man and Woman (co-chairs)');
        const womenPercentAvg = countryTFList.filter((el) => el['%Women'] !== undefined).length > 0 ? sumBy(countryTFList.filter((el) => el['%Women'] !== undefined), (el) => (el['%Women'] ? el['%Women'] : 0)) / countryTFList.filter((el) => el['%Women'] !== undefined).length : -1;
        return {
          countryName: d.Country,
          countryCode: d['Country Code'],
          region: d['SDG Region'],
          incomeGroup: CountryTaxonomy[CountryTaxonomy.findIndex((el) => el['Country Code'] === d['Country Code'])]['Income Group'],
          fragility: CountryTaxonomy[CountryTaxonomy.findIndex((el) => el['Country Code'] === d['Country Code'])]['Fragility Level'],
          hdiGroup: CountryTaxonomy[CountryTaxonomy.findIndex((el) => el['Country Code'] === d['Country Code'])]['HDI code'],
          ldc: CountryTaxonomy[CountryTaxonomy.findIndex((el) => el['Country Code'] === d['Country Code'])]['Least Developed Countries (LDC)'] === 'LDC',
          sids: CountryTaxonomy[CountryTaxonomy.findIndex((el) => el['Country Code'] === d['Country Code'])]['Small Island Developing States (SIDS)'] === 'SIDS',
          noOfTF: countryTFList.length,
          noOfTFWithMembershipData: countryTFList.filter((el) => el['Composition Classification'] !== 'NA').length,
          noOfTFWithLeadershipData: countryTFList.filter((el) => el['Leader Gender'] !== 'NA').length,
          noOfTFWithMajorityWomenOfGenderParity: countryTFList.filter((el) => el['Composition Classification'] !== 'NA').length > 0 ? countryTFsByRegionWomenMajority.length : -1,
          percentOfTFWithMajorityWomenOfGenderParity: countryTFList.filter((el) => el['Composition Classification'] !== 'NA').length > 0 ? (countryTFsByRegionWomenMajority.length * 100) / countryTFList.filter((el) => el['Composition Classification'] !== 'NA').length : -1,
          noOfTFWithWomenLeader: countryTFList.filter((el) => el['Leader Gender'] !== 'NA').length > 0 ? countryTFsByRegionWomenLeader.length : -1,
          percentOfTFWithWomenLeader: countryTFList.filter((el) => el['Leader Gender'] !== 'NA').length > 0 ? (countryTFsByRegionWomenLeader.length * 100) / countryTFList.filter((el) => el['Leader Gender'] !== 'NA').length : -1,
          percentOfTFMembersWomen: womenPercentAvg,
          percentOfTFMembersWomenNA: !(countryTFList.filter((el) => el['%Women']).length > 0),
        };
      });
      setTFData(dataFormated);
      setTFCountryData(countryData);
    });
  }, []);
  return (
    <>
      <div className='flex-div flex-space-between flex-vert-align-center flex-wrap margin-bottom-05 margin-top-05'>
        <h2 className='bold undp-typography margin-bottom-00' style={{ width: '30rem', flexGrow: 1 }}>Women’s Participation in COVID-19 Task Forces</h2>
        <div className='flex-div flex-vert-align-center' style={{ gap: '2rem' }}>
          <img src='https://github.com/UNDP-Data/green-gender-tracker/raw/Redesign/public/img/UNDP-Logo-Blue-Medium.png' alt='UNDP logo' style={{ height: '56px' }} />
          <img src='https://github.com/UNDP-Data/green-gender-tracker/raw/Redesign/public/img/un-women-blue.png' alt='UN Women logo' style={{ width: '128px' }} />
          <img src='https://github.com/UNDP-Data/green-gender-tracker/raw/Redesign/public/img/University_of_Pittsburgh_Logo.png' alt='University of Pittsburg logo' style={{ height: '56px' }} />
          <img src='https://github.com/UNDP-Data/green-gender-tracker/raw/Redesign/public/img/ROK_Logo_PNG.png' alt='ROK logo' style={{ width: '200px' }} />
        </div>
      </div>
      {
        tfData && tfCountryData
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
                tfData={tfData}
                tfCountryData={tfCountryData}
              />
            </Context.Provider>
          )
          : <div className='undp-loader' />
      }
    </>
  );
};
