import styled from 'styled-components';
import uniqBy from 'lodash.uniqby';
import { useContext } from 'react';
import { MapViz } from './MapViz';
import { CountrySummaryDataType, CtxDataType, PolicyDataWithCountryData } from '../Types';
import { CountryTable } from './CountryTable';
import { GenderResponseTable } from './GenderResponseTable';
import { GetFilteredData } from '../utils/getFilteredData';
import Context from './Context/Context';

interface Props {
  allPolicies: PolicyDataWithCountryData[];
  countrySummaryData: CountrySummaryDataType[];
}

interface WidthProps {
  width: string;
}

const StatCardsDiv = styled.div<WidthProps>`
  width: ${(props) => props.width};
  cursor: auto;
`;

export const PolicyDashboard = (props: Props) => {
  const {
    allPolicies,
    countrySummaryData,
  } = props;
  const {
    selectedRegion,
    selectedIncomeGroup,
    selectedFragilityGroup,
    selectedHDI,
    selectedDevelopmentGroup,
  } = useContext(Context) as CtxDataType;
  const genderRelatedPolicies = allPolicies.filter((d) => d['Addresses VAWG'] === 'YES' || d['Directly supports unpaid care'] === 'YES' || d["Targets Women's Economic Security"] === 'YES');
  const environmentRelatedPolicies = allPolicies.filter((d) => d['Environmental relevance'] === 'YES');
  const environmentPositivePolicies = allPolicies.filter((d) => d['Positive for environment'] === 'YES');
  const genderGreenNexusPolicies = allPolicies.filter((d) => d['Gender-Green Nexus'] === 'YES');
  const allFilteredPolicies = GetFilteredData(allPolicies, selectedRegion, selectedIncomeGroup, selectedFragilityGroup, selectedHDI, selectedDevelopmentGroup);
  const filteredGenderedPolicies = GetFilteredData(genderRelatedPolicies, selectedRegion, selectedIncomeGroup, selectedFragilityGroup, selectedHDI, selectedDevelopmentGroup);
  const filteredEnvironmentRelatedPolicies = GetFilteredData(environmentRelatedPolicies, selectedRegion, selectedIncomeGroup, selectedFragilityGroup, selectedHDI, selectedDevelopmentGroup);
  const filteredEnvironmentPositivePolicies = GetFilteredData(environmentPositivePolicies, selectedRegion, selectedIncomeGroup, selectedFragilityGroup, selectedHDI, selectedDevelopmentGroup);
  const filteredCenderGreenNexusPolicies = GetFilteredData(genderGreenNexusPolicies, selectedRegion, selectedIncomeGroup, selectedFragilityGroup, selectedHDI, selectedDevelopmentGroup);
  const allCountriesLength = uniqBy(allFilteredPolicies, 'Country Code').length;
  const countryWithGenderPoliciesLength = uniqBy(filteredGenderedPolicies, 'Country Code').length;

  return (
    <div className='margin-top-09'>
      <div className='flex-div margin-bottom-07 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='undp-typography margin-bottom-00'>{allCountriesLength}</h3>
          <p className='margin-top-05 margin-bottom-00'>Countries/territories with COVID-19 response policies</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{countryWithGenderPoliciesLength}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Countries/territories with gender related COVID-19 response policies</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{allFilteredPolicies.length}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Policies for COVID-19 response</p>
        </StatCardsDiv>
      </div>
      <div className='flex-div margin-bottom-07 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{filteredGenderedPolicies.length}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Gender-sensitive policies for COVID-19 Response</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{filteredEnvironmentRelatedPolicies.length}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Environment relavant policies for COVID-19 Response</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{filteredCenderGreenNexusPolicies.length}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Gender-green nexus policies for COVID-19 Response</p>
        </StatCardsDiv>
      </div>
      <div className='flex-div margin-top-07 margin-bottom-07 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{allFilteredPolicies.filter((d) => d['Addresses VAWG'] === 'YES').length}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Policies addressing violence againt women</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{allFilteredPolicies.filter((d) => d['Directly supports unpaid care'] === 'YES').length}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Policies supporting unpaid care</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{allFilteredPolicies.filter((d) => d["Targets Women's Economic Security"] === 'YES').length}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Policies targeting women&apos;s economic security</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{filteredEnvironmentPositivePolicies.length}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Policies positive for environment</p>
        </StatCardsDiv>
      </div>
      <MapViz
        data={countrySummaryData}
      />
      <div className='margin-top-02'>
        <CountryTable
          data={countrySummaryData}
        />
      </div>
      <div className='margin-top-11'>
        <GenderResponseTable
          data={allFilteredPolicies}
        />
      </div>
    </div>
  );
};
