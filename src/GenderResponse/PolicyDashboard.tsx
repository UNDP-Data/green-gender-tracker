import styled from 'styled-components';
import uniqBy from 'lodash.uniqby';
import { PolicyDataType } from '../Types';

interface Props {
  allPolicies: PolicyDataType[];
  selectedRegion: string;
}

interface WidthProps {
  width: string;
}

const StatCardsDiv = styled.div<WidthProps>`
  width: ${(props) => props.width};
`;

export const PolicyDashboard = (props: Props) => {
  const { selectedRegion, allPolicies } = props;
  const genderRelatedPolicies = allPolicies.filter((d) => d['Addresses VAWG'] === 'YES' || d['Directly supports unpaid care'] === 'YES' || d["Targets Women's Economic Security"] === 'YES');

  const allPoliciesByRegion = selectedRegion !== 'All' ? allPolicies.filter((d) => d.Region === selectedRegion) : allPolicies;
  const genderRelatedPoliciesByRegion = selectedRegion !== 'All' ? genderRelatedPolicies.filter((d) => d.Region === selectedRegion) : genderRelatedPolicies;

  const allCountriesLength = uniqBy(allPoliciesByRegion, 'Country Name').length;
  const countryWithGenderPoliciesLength = uniqBy(genderRelatedPoliciesByRegion, 'Country Name').length;

  return (
    <div className='margin-top-09'>
      <h4 className='bold'>Policy Tracker</h4>
      <div className='flex-div margin-bottom-05 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(50% - 0.5rem)'>
          <h2 className='margin-bottom-00'>{allCountriesLength}</h2>
          <p className='margin-top-05 margin-bottom-00'>Countries with COVID response policies</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(50% - 0.5rem)'>
          <h2 className='margin-bottom-00'>{countryWithGenderPoliciesLength}</h2>
          <p className='margin-top-05 margin-bottom-00'>Countries with gender related COVID response policies</p>
        </StatCardsDiv>
      </div>
      <div className='flex-div margin-bottom-05 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(50% - 0.5rem)'>
          <h2 className='margin-bottom-00'>{allPoliciesByRegion.length}</h2>
          <p className='margin-top-05 margin-bottom-00'>Policies for COVID response</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(50% - 0.5rem)'>
          <h2 className='margin-bottom-00'>{genderRelatedPoliciesByRegion.length}</h2>
          <p className='margin-top-05 margin-bottom-00'>Gender related policies for COVID Response</p>
        </StatCardsDiv>
      </div>
      <div className='flex-div margin-top-05 margin-bottom-07 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 0.666rem)'>
          <h2 className='margin-bottom-00'>{allPoliciesByRegion.filter((d) => d['Addresses VAWG'] === 'YES').length}</h2>
          <p className='margin-top-05 margin-bottom-00'>Policies adressing voilence againt women</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 0.666rem)'>
          <h2 className='margin-bottom-00'>{allPoliciesByRegion.filter((d) => d['Directly supports unpaid care'] === 'YES').length}</h2>
          <p className='margin-top-05 margin-bottom-00'>Policies supporting unpaid care</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 0.666rem)'>
          <h2 className='margin-bottom-00'>{allPoliciesByRegion.filter((d) => d["Targets Women's Economic Security"] === 'YES').length}</h2>
          <p className='margin-top-05 margin-bottom-00'>Policies targetting women&apos;s economic security</p>
        </StatCardsDiv>
      </div>
    </div>
  );
};
