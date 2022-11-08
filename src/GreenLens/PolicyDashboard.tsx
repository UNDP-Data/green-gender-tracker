import styled from 'styled-components';
import uniqBy from 'lodash.uniqby';
import { useContext } from 'react';
import { format } from 'd3-format';
import { MapViz } from './MapViz';
import { CountryGreenLenseSummaryDataType, CtxDataType, PolicyGreenLenseDataWithCountryData } from '../Types';
import { CountryTable } from './CountryTable';
import { GenderResponseTable } from './GenderResponseTable';
import { GetFilteredGreenLenseData } from '../utils/getFilteredData';
import Context from './Context/Context';

interface Props {
  allPolicies: PolicyGreenLenseDataWithCountryData[];
  countrySummaryData: CountryGreenLenseSummaryDataType[];
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
    selectedPolicyMeasureCat,
  } = useContext(Context) as CtxDataType;
  const genderRelatedPolicies = allPolicies.filter((d) => d['Addresses VAWG'] === 'YES' || d['Directly supports unpaid care'] === 'YES' || d["Targets Women's Economic Security"] === 'YES');
  const environmentPositivePolicies = allPolicies.filter((d) => d['Positive for environment'] === 'YES');
  const genderGreenNexusPolicies = allPolicies.filter((d) => d['Gender-Green Nexus'] === 'YES');
  const allFilteredPolicies = GetFilteredGreenLenseData(allPolicies, selectedRegion, selectedIncomeGroup, selectedFragilityGroup, selectedHDI, selectedDevelopmentGroup, selectedPolicyMeasureCat);
  const filteredGenderedPolicies = GetFilteredGreenLenseData(genderRelatedPolicies, selectedRegion, selectedIncomeGroup, selectedFragilityGroup, selectedHDI, selectedDevelopmentGroup, selectedPolicyMeasureCat);
  const filteredEnvironmentPositivePolicies = GetFilteredGreenLenseData(environmentPositivePolicies, selectedRegion, selectedIncomeGroup, selectedFragilityGroup, selectedHDI, selectedDevelopmentGroup, selectedPolicyMeasureCat);
  const filteredCenderGreenNexusPolicies = GetFilteredGreenLenseData(genderGreenNexusPolicies, selectedRegion, selectedIncomeGroup, selectedFragilityGroup, selectedHDI, selectedDevelopmentGroup, selectedPolicyMeasureCat);
  const allCountriesLength = uniqBy(allFilteredPolicies, 'Country Code').length;
  const countryWithGenderPoliciesLength = uniqBy(filteredGenderedPolicies, 'Country Code').length;
  const countryWithEnvPoliciesLength = uniqBy(filteredEnvironmentPositivePolicies, 'Country Code').length;
  const countryWithNexusPoliciesLength = uniqBy(filteredCenderGreenNexusPolicies, 'Country Code').length;

  return (
    <div className='margin-top-09'>
      <div className='flex-div margin-bottom-07 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(allFilteredPolicies.length)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Policies for COVID-19 response</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(filteredGenderedPolicies.length)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Gender-sensitive policies for COVID-19 Response</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(filteredEnvironmentPositivePolicies.length)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Policies positive for environment</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(filteredCenderGreenNexusPolicies.length)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Policies with gender-green nexus</p>
        </StatCardsDiv>
      </div>
      <div className='flex-div margin-bottom-07 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
          <h3 className='undp-typography margin-bottom-00'>{format(',')(allCountriesLength)}</h3>
          <p className='margin-top-05 margin-bottom-00'>Countries/territories with COVID-19 response policies</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(countryWithGenderPoliciesLength)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Countries/territories with gender-sensitive COVID-19 response policies</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(countryWithEnvPoliciesLength)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Countries/territories with environmentally postive COVID-19 response policies</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(countryWithNexusPoliciesLength)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Countries/territories with policies with gender-green nexus</p>
        </StatCardsDiv>
      </div>
      <div className='flex-div margin-top-07 margin-bottom-07 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(allFilteredPolicies.filter((d) => d['Addresses VAWG'] === 'YES').length)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Policies addressing violence against women</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(allFilteredPolicies.filter((d) => d['Directly supports unpaid care'] === 'YES').length)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Policies supporting unpaid care</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(allFilteredPolicies.filter((d) => d["Targets Women's Economic Security"] === 'YES').length)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Policies targeting women&apos;s economic security</p>
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
