import styled from 'styled-components';
import sumBy from 'lodash.sumby';
import { CountryDataType, TFDataType } from '../Types';
import { TFTable } from './TFTable';

interface Props {
  allTFs: TFDataType[];
  selectedCountry: CountryDataType;
}

interface WidthProps {
  width: string;
}

const StatCardsDiv = styled.div<WidthProps>`
  width: ${(props) => props.width};
`;

const InfoBoxEl = styled.div`
  width: 100%;
  background-color: var(--light-red);
  padding: var(--spacing-07);
  text-transform: uppercase;
  margin-top: var(--spacing-07);
  text-align: center;
  font-weight: bold;
`;

export const CountryTFDashboard = (props: Props) => {
  const { selectedCountry, allTFs } = props;

  const allTFsByCountry = allTFs.filter((d) => d['Country Code'] === selectedCountry.code);
  const countryTFsByRegionWomenMajority = allTFsByCountry.filter((el) => el['Composition Classification'] === 'Majority Women' || el['Composition Classification'] === 'Gender Parity');
  const countryTFsByRegionWomenLeader = allTFsByCountry.filter((el) => el['Leader Gender'] === 'Woman' || el['Leader Gender'] === 'Man and Woman (co-chairs)');
  const womenPercentAvg = allTFsByCountry.filter((el) => el['%Women'] !== undefined).length > 0 ? sumBy(allTFsByCountry.filter((el) => el['%Women'] !== undefined), (el) => (el['%Women'] ? el['%Women'] : 0)) / allTFsByCountry.filter((el) => el['%Women'] !== undefined).length : -1;
  const data = {
    countryName: selectedCountry.name,
    countryCode: selectedCountry.code,
    noOfTF: allTFsByCountry.length,
    noOfTFWithMajorityWomenOfGenderParity: allTFsByCountry.filter((el) => el['Composition Classification'] !== 'NA').length > 0 ? countryTFsByRegionWomenMajority.length : -1,
    percentOfTFWithMajorityWomenOfGenderParity: allTFsByCountry.filter((el) => el['Composition Classification'] !== 'NA').length > 0 ? (countryTFsByRegionWomenMajority.length * 100) / allTFsByCountry.filter((el) => el['Composition Classification'] !== 'NA').length : -1,
    noOfTFWithWomenLeader: allTFsByCountry.filter((el) => el['Leader Gender'] !== 'NA').length > 0 ? countryTFsByRegionWomenLeader.length : -1,
    percentOfTFWithWomenLeader: allTFsByCountry.filter((el) => el['Leader Gender'] !== 'NA').length > 0 ? (countryTFsByRegionWomenLeader.length * 100) / allTFsByCountry.filter((el) => el['Leader Gender'] !== 'NA').length : -1,
    percentOfTFMembersWomen: womenPercentAvg,
    percentOfTFMembersWomenNA: !(allTFsByCountry.filter((el) => el['%Women']).length > 0),
  };
  const tfMemberTotalDecisionMaking = sumBy(allTFsByCountry.filter((d) => d.Type === 'Decision-Making' && d['Composition Data'] === 'Yes'), (d) => {
    const men = d['#Men'] ? d['#Men'] : 0;
    const women = d['#Women'] ? d['#Women'] : 0;
    return men + women;
  });
  const tfMemberWomenDecisionMaking = sumBy(allTFsByCountry.filter((d) => d.Type === 'Decision-Making' && d['Composition Data'] === 'Yes'), (d) => (d['#Women'] ? d['#Women'] : 0));

  const tfMemberTotalExpert = sumBy(allTFsByCountry.filter((d) => d.Type === 'Expert' && d['Composition Data'] === 'Yes'), (d) => {
    const men = d['#Men'] ? d['#Men'] : 0;
    const women = d['#Women'] ? d['#Women'] : 0;
    return men + women;
  });
  const tfMemberWomenExpert = sumBy(allTFsByCountry.filter((d) => d.Type === 'Expert' && d['Composition Data'] === 'Yes'), (d) => (d['#Women'] ? d['#Women'] : 0));

  const tfMemberTotalMultiSectoral = sumBy(allTFsByCountry.filter((d) => d['Sector 2'] === 'Multi-Sectoral' && d['Composition Data'] === 'Yes'), (d) => {
    const men = d['#Men'] ? d['#Men'] : 0;
    const women = d['#Women'] ? d['#Women'] : 0;
    return men + women;
  });
  const tfMemberWomenMultiSectoral = sumBy(allTFsByCountry.filter((d) => d['Sector 2'] === 'Multi-Sectoral' && d['Composition Data'] === 'Yes'), (d) => (d['#Women'] ? d['#Women'] : 0));

  const tfMemberTotalPublicHealth = sumBy(allTFsByCountry.filter((d) => d['Sector 2'] === 'Public Health' && d['Composition Data'] === 'Yes'), (d) => {
    const men = d['#Men'] ? d['#Men'] : 0;
    const women = d['#Women'] ? d['#Women'] : 0;
    return men + women;
  });
  const tfMemberWomenPublicHealth = sumBy(allTFsByCountry.filter((d) => d['Sector 2'] === 'Public Health' && d['Composition Data'] === 'Yes'), (d) => (d['#Women'] ? d['#Women'] : 0));

  return (
    <div className='margin-top-09' style={{ width: '100%' }}>
      <h5 className='bold margin-bottom-05 undp-typography'>
        Task forces detail for
        {' '}
        {selectedCountry.name}
      </h5>
      {
        allTFsByCountry.length > 0
          ? (
            <div>
              <div className='flex-div margin-bottom-05 flex-space-between flex-wrap'>
                <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
                  <h2 className='margin-bottom-00 undp-typography'>{data.noOfTF}</h2>
                  <p className='margin-top-05 margin-bottom-00 undp-typography'>No. of task forces</p>
                </StatCardsDiv>
                <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
                  <h2 className='margin-bottom-00 undp-typography'>{data.noOfTFWithWomenLeader === -1 ? 'NA' : data.noOfTFWithWomenLeader}</h2>
                  <p className='margin-top-05 margin-bottom-00 undp-typography'>No. of task force with women leader or co-chair</p>
                </StatCardsDiv>
                <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
                  <h2 className='margin-bottom-00 undp-typography'>{data.noOfTFWithMajorityWomenOfGenderParity === -1 ? 'NA' : data.noOfTFWithMajorityWomenOfGenderParity}</h2>
                  <p className='margin-top-05 margin-bottom-00 undp-typography'>No. of task forces that are majority women or have gender parity</p>
                </StatCardsDiv>
                <StatCardsDiv className='stat-card' width='calc(25% - 1.5rem)'>
                  <h2 className='margin-bottom-00 undp-typography'>
                    {data.percentOfTFMembersWomen === -1 ? 'NA' : data.percentOfTFMembersWomen }
                  </h2>
                  <p className='margin-top-05 margin-bottom-00 undp-typography'>Percent of women task force member</p>
                </StatCardsDiv>
              </div>
              <div className='flex-div margin-top-07 margin-bottom-07 flex-space-between flex-wrap'>
                <StatCardsDiv className='stat-card' width='calc(50% - 1rem)'>
                  <h6 className='undp-typography'>Proportion of women member by task force type</h6>
                  <div className='flex-div flex-space-between'>
                    <StatCardsDiv width='calc(50% - 1rem)'>
                      <h3 className='margin-bottom-00'>
                        {tfMemberTotalDecisionMaking ? `${((tfMemberWomenDecisionMaking * 100) / tfMemberTotalDecisionMaking).toFixed(1)}%` : 'NA'}
                      </h3>
                      <p className='margin-top-05 margin-bottom-00 undp-typography'>Decision making</p>
                    </StatCardsDiv>
                    <StatCardsDiv width='calc(50% - 1rem)'>
                      <h3 className='margin-bottom-00'>
                        {tfMemberTotalExpert ? `${((tfMemberWomenExpert * 100) / tfMemberTotalExpert).toFixed(1)}%` : 'NA'}
                      </h3>
                      <p className='margin-top-05 margin-bottom-00 undp-typography'>Experts</p>
                    </StatCardsDiv>
                  </div>
                </StatCardsDiv>
                <StatCardsDiv className='stat-card' width='calc(50% - 1rem)'>
                  <h6 className='undp-typography'>Proportion of women member by sectoral focus</h6>
                  <div className='flex-div flex-space-between'>
                    <StatCardsDiv width='calc(50% - 1rem)'>
                      <h3 className='margin-bottom-00 undp-typography'>
                        {tfMemberTotalMultiSectoral ? `${((tfMemberWomenMultiSectoral * 100) / tfMemberTotalMultiSectoral).toFixed(1)}%` : 'NA'}
                      </h3>
                      <p className='margin-top-05 margin-bottom-00 undp-typography'>Multi sectoral</p>
                    </StatCardsDiv>
                    <StatCardsDiv width='calc(50% - 1rem)'>
                      <h3 className='margin-bottom-00 undp-typography'>
                        {tfMemberTotalPublicHealth ? `${((tfMemberWomenPublicHealth * 100) / tfMemberTotalPublicHealth).toFixed(1)}%` : 'NA'}
                      </h3>
                      <p className='margin-top-05 margin-bottom-00 undp-typography'>Public health</p>
                    </StatCardsDiv>
                  </div>
                </StatCardsDiv>
              </div>
              <div className='margin-top-09'>
                <TFTable
                  data={allTFsByCountry}
                  selectedCountry={selectedCountry}
                />
              </div>
            </div>
          ) : <InfoBoxEl>No task force data available</InfoBoxEl>
      }
    </div>
  );
};
