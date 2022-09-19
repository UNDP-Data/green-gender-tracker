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

export const CountryTFDashboard = (props: Props) => {
  const { selectedCountry, allTFs } = props;

  const allTFsByCountry = allTFs.filter((d) => d['Country Code'] === selectedCountry.code);
  const tfsByCountryWomenMajority = allTFsByCountry.filter((d) => d['Composition Classification'] === 'Majority Women' || d['Composition Classification'] === 'Gender Parity');
  const tfsByCountryWomenLeader = allTFsByCountry.filter((d) => d['Leader Gender'] === 'Woman' || d['Leader Gender'] === 'Man and Woman (co-chairs)');

  const tfMemberTotal = sumBy(allTFsByCountry, (d) => {
    const men = d['#Men'] ? d['#Men'] : 0;
    const women = d['#Women'] ? d['#Women'] : 0;
    return men + women;
  });
  const tfMemberWomen = sumBy(allTFsByCountry, (d) => (d['#Women'] ? d['#Women'] : 0));

  const tfMemberTotalDecisionMaking = sumBy(allTFsByCountry.filter((d) => d.Type === 'Decision-Making'), (d) => {
    const men = d['#Men'] ? d['#Men'] : 0;
    const women = d['#Women'] ? d['#Women'] : 0;
    return men + women;
  });
  const tfMemberWomenDecisionMaking = sumBy(allTFsByCountry.filter((d) => d.Type === 'Decision-Making'), (d) => (d['#Women'] ? d['#Women'] : 0));

  const tfMemberTotalExpert = sumBy(allTFsByCountry.filter((d) => d.Type === 'Expert'), (d) => {
    const men = d['#Men'] ? d['#Men'] : 0;
    const women = d['#Women'] ? d['#Women'] : 0;
    return men + women;
  });
  const tfMemberWomenExpert = sumBy(allTFsByCountry.filter((d) => d.Type === 'Expert'), (d) => (d['#Women'] ? d['#Women'] : 0));

  const tfMemberTotalMultiSectoral = sumBy(allTFsByCountry.filter((d) => d['Sector 2'] === 'Multi-Sectoral'), (d) => {
    const men = d['#Men'] ? d['#Men'] : 0;
    const women = d['#Women'] ? d['#Women'] : 0;
    return men + women;
  });
  const tfMemberWomenMultiSectoral = sumBy(allTFsByCountry.filter((d) => d['Sector 2'] === 'Multi-Sectoral'), (d) => (d['#Women'] ? d['#Women'] : 0));

  const tfMemberTotalPublicHealth = sumBy(allTFsByCountry.filter((d) => d['Sector 2'] === 'Public Health'), (d) => {
    const men = d['#Men'] ? d['#Men'] : 0;
    const women = d['#Women'] ? d['#Women'] : 0;
    return men + women;
  });
  const tfMemberWomenPublicHealth = sumBy(allTFsByCountry.filter((d) => d['Sector 2'] === 'Public Health'), (d) => (d['#Women'] ? d['#Women'] : 0));

  return (
    <div className='margin-top-09'>
      <h5 className='bold margin-bottom-05'>
        Task Force details for
        {' '}
        {selectedCountry.name}
      </h5>
      {
        allTFsByCountry.length > 0
          ? (
            <div>
              <div className='flex-div margin-bottom-05 flex-space-between flex-wrap'>
                <StatCardsDiv className='stat-card' width='calc(33.33% - 0.666rem)'>
                  <h2 className='margin-bottom-00'>{allTFsByCountry.length}</h2>
                  <p className='margin-top-05 margin-bottom-00'>No. of Task Forces</p>
                </StatCardsDiv>
                <StatCardsDiv className='stat-card' width='calc(33.33% - 0.666rem)'>
                  <h2 className='margin-bottom-00'>{tfsByCountryWomenMajority.length}</h2>
                  <p className='margin-top-05 margin-bottom-00'>No. of task forces that are majority women or have gender parity</p>
                </StatCardsDiv>
                <StatCardsDiv className='stat-card' width='calc(33.33% - 0.666rem)'>
                  <h2 className='margin-bottom-00'>{tfsByCountryWomenLeader.length}</h2>
                  <p className='margin-top-05 margin-bottom-00'>No. of task force with women leader or co-chair</p>
                </StatCardsDiv>
              </div>
              <div className='flex-div margin-top-05 flex-space-between flex-wrap'>
                <StatCardsDiv className='stat-card' width='calc(33.33% - 0.666rem)'>
                  <h2 className='margin-bottom-00'>{tfMemberTotal || 'NA'}</h2>
                  <p className='margin-top-05 margin-bottom-00'>Total no. of task force members</p>
                </StatCardsDiv>
                <StatCardsDiv className='stat-card' width='calc(33.33% - 0.666rem)'>
                  <h2 className='margin-bottom-00'>{tfMemberTotal ? tfMemberWomen : 'NA'}</h2>
                  <p className='margin-top-05 margin-bottom-00'>No. of women task force member</p>
                </StatCardsDiv>
                <StatCardsDiv className='stat-card' width='calc(33.33% - 0.666rem)'>
                  <h2 className='margin-bottom-00'>
                    {tfMemberTotal ? `${((tfMemberWomen * 100) / tfMemberTotal).toFixed(1)}%` : 'NA'}
                  </h2>
                  <p className='margin-top-05 margin-bottom-00'>Percent of women task force member</p>
                </StatCardsDiv>
              </div>
              <div className='flex-div margin-top-05 margin-bottom-07 flex-space-between flex-wrap'>
                <StatCardsDiv className='stat-card' width='calc(50% - 0.5rem)'>
                  <h6>Proportion of women member by task force type</h6>
                  <div className='flex-div flex-space-between'>
                    <StatCardsDiv width='calc(50% - 0.5rem)'>
                      <h3 className='margin-bottom-00'>
                        {tfMemberTotalDecisionMaking ? `${((tfMemberWomenDecisionMaking * 100) / tfMemberTotalDecisionMaking).toFixed(1)}%` : 'NA'}
                      </h3>
                      <p className='margin-top-05 margin-bottom-00'>Decision making</p>
                    </StatCardsDiv>
                    <StatCardsDiv width='calc(50% - 0.5rem)'>
                      <h3 className='margin-bottom-00'>
                        {tfMemberTotalExpert ? `${((tfMemberWomenExpert * 100) / tfMemberTotalExpert).toFixed(1)}%` : 'NA'}
                      </h3>
                      <p className='margin-top-05 margin-bottom-00'>Experts</p>
                    </StatCardsDiv>
                  </div>
                </StatCardsDiv>
                <StatCardsDiv className='stat-card' width='calc(50% - 0.5rem)'>
                  <h6>Proportion of women member by sectoral focus</h6>
                  <div className='flex-div flex-space-between'>
                    <StatCardsDiv width='calc(50% - 0.5rem)'>
                      <h3 className='margin-bottom-00'>
                        {tfMemberTotalMultiSectoral ? `${((tfMemberWomenMultiSectoral * 100) / tfMemberTotalMultiSectoral).toFixed(1)}%` : 'NA'}
                      </h3>
                      <p className='margin-top-05 margin-bottom-00'>Multi sectoral</p>
                    </StatCardsDiv>
                    <StatCardsDiv width='calc(50% - 0.5rem)'>
                      <h3 className='margin-bottom-00'>
                        {tfMemberTotalPublicHealth ? `${((tfMemberWomenPublicHealth * 100) / tfMemberTotalPublicHealth).toFixed(1)}%` : 'NA'}
                      </h3>
                      <p className='margin-top-05 margin-bottom-00'>Public health</p>
                    </StatCardsDiv>
                  </div>
                </StatCardsDiv>
              </div>
              <div className='margin-top-12'>
                <TFTable
                  data={allTFsByCountry}
                  selectedCountry={selectedCountry}
                />
              </div>
            </div>
          ) : <StatCardsDiv className='stat-card' width='100%'><p>No task force data available</p></StatCardsDiv>
      }
    </div>
  );
};
