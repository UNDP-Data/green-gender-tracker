import styled from 'styled-components';
import { CountryDataType, PolicyGreenLenseDataType } from '../Types';
import { GenderResponseTable } from './GenderResponseTable';

interface Props {
  allPolicies: PolicyGreenLenseDataType[];
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
  const environmentRelatedPolicies = allPolicies.filter((d) => d['Environmental relevance'] === 'YES');
  const genderGreenNexusPolicies = allPolicies.filter((d) => d['Gender-Green Nexus'] === 'YES');

  const countryPoliciesList = allPolicies.filter((d) => d['Country Code'] === selectedCountry.code);
  const genderRelatedPoliciesByCountry = genderRelatedPolicies.filter((d) => d['Country Code'] === selectedCountry.code);
  const environmentRelatedPoliciesByCountry = environmentRelatedPolicies.filter((d) => d['Country Code'] === selectedCountry.code);
  const genderGreenNexusPoliciesByCountry = genderGreenNexusPolicies.filter((d) => d['Country Code'] === selectedCountry.code);

  return (
    <div>
      <h5 className='bold margin-bottom-05 undp-typography'>
        Policy data for
        {' '}
        {selectedCountry.name}
      </h5>
      <div className='stat-card-container margin-bottom-02 flex-space-between'>
        <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
          <h2 className='margin-bottom-00 undp-typography'>{countryPoliciesList.length}</h2>
          <p className='margin-top-05 margin-bottom-00 undp-typography'>Policies for COVID-19 response</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
          <h2 className='margin-bottom-00 undp-typography'>{genderRelatedPoliciesByCountry.length}</h2>
          <p className='margin-top-05 margin-bottom-00 undp-typography'>Gender-sensitive policies for COVID-19 Response</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
          <h2 className='margin-bottom-00 undp-typography'>{environmentRelatedPoliciesByCountry.length}</h2>
          <p className='margin-top-05 margin-bottom-00 undp-typography'>Environment relavant policies for COVID-19 Response</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
          <h2 className='margin-bottom-00 undp-typography'>{genderGreenNexusPoliciesByCountry.length}</h2>
          <p className='margin-top-05 margin-bottom-00 undp-typography'>Gender-green nexus policies for COVID-19 Response</p>
        </StatCardsDiv>
      </div>
      <div className='flex-div margin-top-07 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h2 className='margin-bottom-00 undp-typography'>{countryPoliciesList.filter((d) => d['Addresses VAWG'] === 'YES').length}</h2>
          <p className='margin-top-05 margin-bottom-00 undp-typography'>Policies addressing violence against women</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h2 className='margin-bottom-00 undp-typography'>{countryPoliciesList.filter((d) => d['Directly supports unpaid care'] === 'YES').length}</h2>
          <p className='margin-top-05 margin-bottom-00 undp-typography'>Policies supporting unpaid care</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h2 className='margin-bottom-00 undp-typography'>{countryPoliciesList.filter((d) => d["Targets Women's Economic Security"] === 'YES').length}</h2>
          <p className='margin-top-05 margin-bottom-00 undp-typography'>Policies targeting women&apos;s economic security</p>
        </StatCardsDiv>
      </div>
      <div className='margin-top-09'>
        <GenderResponseTable
          data={countryPoliciesList}
          selectedCountry={selectedCountry}
        />
      </div>
    </div>
  );
};
