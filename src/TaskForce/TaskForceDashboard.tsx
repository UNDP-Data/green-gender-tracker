import styled from 'styled-components';
import sumBy from 'lodash.sumby';
import uniqBy from 'lodash.uniqby';
import { TFDataType, CountryTFSummaryDataType } from '../Types';
import { MapViz } from './MapViz';
import { CountryTable } from './CountryTable';
import { TFTable } from './TFTable';

interface Props {
  allTFs: TFDataType[];
  selectedRegion: string;
}

interface WidthProps {
  width: string;
}

const StatCardsDiv = styled.div<WidthProps>`
  width: ${(props) => props.width};
`;

export const TaskForceDashboard = (props: Props) => {
  const { selectedRegion, allTFs } = props;

  const allTFsByRegion = selectedRegion !== 'All' ? allTFs.filter((d) => d['SDG Region'] === selectedRegion) : allTFs;
  const tfsByRegionWomenMajority = allTFsByRegion.filter((d) => d['Composition Classification'] === 'Majority Women' || d['Composition Classification'] === 'Gender Parity');
  const tfsByRegionWomenLeader = allTFsByRegion.filter((d) => d['Leader Gender'] === 'Woman' || d['Leader Gender'] === 'Man and Woman (co-chairs)');

  const tfMemberTotal = sumBy(allTFsByRegion, (d) => {
    const men = d['#Men'] ? d['#Men'] : 0;
    const women = d['#Women'] ? d['#Women'] : 0;
    return men + women;
  });
  const tfMemberWomen = sumBy(allTFsByRegion, (d) => (d['#Women'] ? d['#Women'] : 0));

  const countryData: CountryTFSummaryDataType[] = uniqBy(allTFs, 'Country Code').map((d) => {
    const countryTFList = allTFs.filter((el) => el['Country Code'] === d['Country Code']);
    const countryTFsByRegionWomenMajority = countryTFList.filter((el) => el['Composition Classification'] === 'Majority Women' || el['Composition Classification'] === 'Gender Parity');
    const countryTFsByRegionWomenLeader = countryTFList.filter((el) => el['Leader Gender'] === 'Woman' || el['Leader Gender'] === 'Man and Woman (co-chairs)');

    const countryTFMemberTotal = sumBy(countryTFList, (el) => {
      const men = el['#Men'] ? el['#Men'] : 0;
      const women = el['#Women'] ? el['#Women'] : 0;
      return men + women;
    });
    const countryTFMemberWomen = sumBy(countryTFList, (el) => (el['#Women'] ? el['#Women'] : 0)); return {
      countryName: d.Country,
      countryCode: d['Country Code'],
      region: d['SDG Region'],
      noOfTF: countryTFList.length,
      noOfTFWithMajorityWomenOfGenderParity: countryTFsByRegionWomenMajority.length,
      percentOfTFWithMajorityWomenOfGenderParity: (countryTFsByRegionWomenMajority.length * 100) / countryTFList.length,
      noOfTFWithWomenLeader: countryTFsByRegionWomenLeader.length,
      percentOfTFWithWomenLeader: (countryTFsByRegionWomenLeader.length * 100) / countryTFList.length,
      noOfTFMembers: countryTFMemberTotal || -1,
      noOfTFMembersWomen: countryTFMemberTotal ? countryTFMemberWomen : -1,
      percentOfTFMembersWomen: countryTFMemberTotal ? (countryTFMemberWomen * 100) / countryTFMemberTotal : -1,
    };
  });

  const tfMemberTotalDecisionMaking = sumBy(allTFsByRegion.filter((d) => d.Type === 'Decision-Making'), (d) => {
    const men = d['#Men'] ? d['#Men'] : 0;
    const women = d['#Women'] ? d['#Women'] : 0;
    return men + women;
  });
  const tfMemberWomenDecisionMaking = sumBy(allTFsByRegion.filter((d) => d.Type === 'Decision-Making'), (d) => (d['#Women'] ? d['#Women'] : 0));

  const tfMemberTotalExpert = sumBy(allTFsByRegion.filter((d) => d.Type === 'Expert'), (d) => {
    const men = d['#Men'] ? d['#Men'] : 0;
    const women = d['#Women'] ? d['#Women'] : 0;
    return men + women;
  });
  const tfMemberWomenExpert = sumBy(allTFsByRegion.filter((d) => d.Type === 'Expert'), (d) => (d['#Women'] ? d['#Women'] : 0));

  const tfMemberTotalMultiSectoral = sumBy(allTFsByRegion.filter((d) => d['Sector 2'] === 'Multi-Sectoral'), (d) => {
    const men = d['#Men'] ? d['#Men'] : 0;
    const women = d['#Women'] ? d['#Women'] : 0;
    return men + women;
  });
  const tfMemberWomenMultiSectoral = sumBy(allTFsByRegion.filter((d) => d['Sector 2'] === 'Multi-Sectoral'), (d) => (d['#Women'] ? d['#Women'] : 0));

  const tfMemberTotalPublicHealth = sumBy(allTFsByRegion.filter((d) => d['Sector 2'] === 'Public Health'), (d) => {
    const men = d['#Men'] ? d['#Men'] : 0;
    const women = d['#Women'] ? d['#Women'] : 0;
    return men + women;
  });
  const tfMemberWomenPublicHealth = sumBy(allTFsByRegion.filter((d) => d['Sector 2'] === 'Public Health'), (d) => (d['#Women'] ? d['#Women'] : 0));

  return (
    <div className='margin-top-09'>
      <div className='flex-div margin-bottom-05 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 0.666rem)'>
          <h2 className='margin-bottom-00'>{allTFsByRegion.length}</h2>
          <p className='margin-top-05 margin-bottom-00'>No. of Task Forces</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 0.666rem)'>
          <h2 className='margin-bottom-00'>{tfsByRegionWomenMajority.length}</h2>
          <p className='margin-top-05 margin-bottom-00'>No. of task forces that are majority women or have gender parity</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 0.666rem)'>
          <h2 className='margin-bottom-00'>{tfsByRegionWomenLeader.length}</h2>
          <p className='margin-top-05 margin-bottom-00'>No. of task force with women leader or co-chair</p>
        </StatCardsDiv>
      </div>
      <div className='flex-div margin-top-05 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 0.666rem)'>
          <h2 className='margin-bottom-00'>{tfMemberTotal}</h2>
          <p className='margin-top-05 margin-bottom-00'>Total no. of task force members</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 0.666rem)'>
          <h2 className='margin-bottom-00'>{tfMemberWomen}</h2>
          <p className='margin-top-05 margin-bottom-00'>No. of women task force member</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 0.666rem)'>
          <h2 className='margin-bottom-00'>
            {((tfMemberWomen * 100) / tfMemberTotal).toFixed(1)}
            %
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
                {((tfMemberWomenDecisionMaking * 100) / tfMemberTotalDecisionMaking).toFixed(1)}
                %
              </h3>
              <p className='margin-top-05 margin-bottom-00'>Decision making</p>
            </StatCardsDiv>
            <StatCardsDiv width='calc(50% - 0.5rem)'>
              <h3 className='margin-bottom-00'>
                {((tfMemberWomenExpert * 100) / tfMemberTotalExpert).toFixed(1)}
                %
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
                {((tfMemberWomenMultiSectoral * 100) / tfMemberTotalMultiSectoral).toFixed(1)}
                %
              </h3>
              <p className='margin-top-05 margin-bottom-00'>Multi sectoral</p>
            </StatCardsDiv>
            <StatCardsDiv width='calc(50% - 0.5rem)'>
              <h3 className='margin-bottom-00'>
                {((tfMemberWomenPublicHealth * 100) / tfMemberTotalPublicHealth).toFixed(1)}
                %
              </h3>
              <p className='margin-top-05 margin-bottom-00'>Public health</p>
            </StatCardsDiv>
          </div>
        </StatCardsDiv>
      </div>
      <MapViz
        data={countryData}
        selectedRegion={selectedRegion}
      />
      <div className='margin-top-02'>
        <CountryTable
          data={countryData}
          selectedRegion={selectedRegion}
        />
      </div>
      <div className='margin-top-11'>
        <TFTable
          data={allTFsByRegion}
          selectedRegion={selectedRegion}
        />
      </div>
    </div>
  );
};
