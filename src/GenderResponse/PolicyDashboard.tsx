import styled from 'styled-components';
import { useContext } from 'react';
import { format } from 'd3-format';
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
  min-width: 20rem;
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
  const allFilteredPolicies = GetFilteredData(allPolicies, selectedRegion, selectedIncomeGroup, selectedFragilityGroup, selectedHDI, selectedDevelopmentGroup, selectedPolicyMeasureCat);
  const filteredGenderedPolicies = GetFilteredData(genderRelatedPolicies, selectedRegion, selectedIncomeGroup, selectedFragilityGroup, selectedHDI, selectedDevelopmentGroup, selectedPolicyMeasureCat);

  return (
    <div className='margin-top-09'>
      <div className='flex-div margin-bottom-07 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(50% - 1rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(allFilteredPolicies.length)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Total COVID-19 response measures</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(50% - 1rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(filteredGenderedPolicies.length)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>COVID-19 response measures are gender-sensitive</p>
        </StatCardsDiv>
      </div>
      <div className='flex-div margin-top-07 margin-bottom-07 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(allFilteredPolicies.filter((d) => d['Addresses VAWG'] === 'YES').length)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Measures address violence against women</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(allFilteredPolicies.filter((d) => d['Directly supports unpaid care'] === 'YES').length)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Measures support unpaid care</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(allFilteredPolicies.filter((d) => d["Targets Women's Economic Security"] === 'YES').length)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Measures target women&apos;s economic security</p>
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
