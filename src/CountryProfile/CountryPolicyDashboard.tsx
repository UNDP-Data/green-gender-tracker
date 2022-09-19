import styled from 'styled-components';
import { CountryDataType, PolicyDataType } from '../Types';
import { GenderResponseTable } from './GenderResponseTable';

interface Props {
  allPolicies: PolicyDataType[];
  selectedCountry: CountryDataType;
}

interface WidthProps {
  width: string;
}

const StatCardsDiv = styled.div<WidthProps>`
  width: ${(props) => props.width};
`;

export const CountryPolicyDashboard = (props: Props) => {
  const { selectedCountry, allPolicies } = props;
  const genderRelatedPolicies = allPolicies.filter((d) => d['Addresses VAWG'] === 'YES' || d['Directly supports unpaid care'] === 'YES' || d["Targets Women's Economic Security"] === 'YES');

  const countryPoliciesList = allPolicies.filter((d) => d['Country Code'] === selectedCountry.code);
  const genderRelatedPoliciesByCountry = genderRelatedPolicies.filter((d) => d['Country Code'] === selectedCountry.code);

  return (
    <div>
      <h5 className='bold margin-bottom-05'>
        Policy data for
        {' '}
        {selectedCountry.name}
      </h5>
      <div className='flex-div margin-bottom-02 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(50% - 0.5rem)'>
          <h2 className='margin-bottom-00'>{countryPoliciesList.length}</h2>
          <p className='margin-top-05 margin-bottom-00'>Policies for COVID response</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(50% - 0.5rem)'>
          <h2 className='margin-bottom-00'>{genderRelatedPoliciesByCountry.length}</h2>
          <p className='margin-top-05 margin-bottom-00'>Gender related policies for COVID Response</p>
        </StatCardsDiv>
      </div>
      <div className='flex-div margin-top-05 margin-bottom-07 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 0.666rem)'>
          <h2 className='margin-bottom-00'>{countryPoliciesList.filter((d) => d['Addresses VAWG'] === 'YES').length}</h2>
          <p className='margin-top-05 margin-bottom-00'>Policies adressing voilence againt women</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 0.666rem)'>
          <h2 className='margin-bottom-00'>{countryPoliciesList.filter((d) => d['Directly supports unpaid care'] === 'YES').length}</h2>
          <p className='margin-top-05 margin-bottom-00'>Policies supporting unpaid care</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 0.666rem)'>
          <h2 className='margin-bottom-00'>{countryPoliciesList.filter((d) => d["Targets Women's Economic Security"] === 'YES').length}</h2>
          <p className='margin-top-05 margin-bottom-00'>Policies targetting women&apos;s economic security</p>
        </StatCardsDiv>
      </div>
      <div className='margin-top-12'>
        <GenderResponseTable
          data={countryPoliciesList}
          selectedCountry={selectedCountry}
        />
      </div>
    </div>
  );
};
