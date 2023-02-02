import styled from 'styled-components';
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
  min-width: 15rem;
  flex-grow: 1;
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
  return (
    <div>
      <div className='stat-card-container margin-top-05 margin-bottom-05 flex-space-between'>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 4.667rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(filteredGenderedPolicies.length)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>COVID-19 measures are gender sensitive</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 4.667rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(filteredEnvironmentPositivePolicies.length)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>COVID-19 measures are green</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 4.667rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(filteredCenderGreenNexusPolicies.length)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>COVID-19 measures are both green and gender-sensitive</p>
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
