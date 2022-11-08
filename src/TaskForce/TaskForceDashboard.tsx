import styled from 'styled-components';
import sumBy from 'lodash.sumby';
import { useContext } from 'react';
import { TFDataType, CountryTFSummaryDataType, CtxDataType } from '../Types';
import { MapViz } from './MapViz';
import { CountryTable } from './CountryTable';
import { TFTable } from './TFTable';
import { GetFilteredCountryTFSummaryData, GetFilteredTFData } from '../utils/getFilteredData';
import Context from './Context/Context';

interface Props {
  allTFs: TFDataType[];
  tfCountryData: CountryTFSummaryDataType[];
}

interface WidthProps {
  width: string;
}

const StatCardsDiv = styled.div<WidthProps>`
  width: ${(props) => props.width};
`;

export const TaskForceDashboard = (props: Props) => {
  const { allTFs, tfCountryData } = props;
  const {
    selectedRegion,
    selectedIncomeGroup,
    selectedFragilityGroup,
    selectedHDI,
    selectedDevelopmentGroup,
  } = useContext(Context) as CtxDataType;
  const filteredTFs = GetFilteredTFData(allTFs, selectedRegion, selectedIncomeGroup, selectedFragilityGroup, selectedHDI, selectedDevelopmentGroup);
  const filteredCountryData = GetFilteredCountryTFSummaryData(tfCountryData, selectedRegion, selectedIncomeGroup, selectedFragilityGroup, selectedHDI, selectedDevelopmentGroup);
  const tfsByRegionWomenLeader = filteredTFs.filter((d) => d['Leader Gender'] === 'Woman' || d['Leader Gender'] === 'Man and Woman (co-chairs)');
  const tfMemberAvgPercent = sumBy(tfCountryData.filter((el) => el.percentOfTFMembersWomen !== -1), (el) => el.percentOfTFMembersWomen) / tfCountryData.filter((el) => el.percentOfTFMembersWomen !== -1).length;

  const tfMemberTotalDecisionMaking = sumBy(filteredTFs.filter((d) => d.Type === 'Decision-Making' && d['Composition Data'] === 'Yes'), (d) => {
    const men = d['#Men'] ? d['#Men'] : 0;
    const women = d['#Women'] ? d['#Women'] : 0;
    return men + women;
  });
  const tfMemberWomenDecisionMaking = sumBy(filteredTFs.filter((d) => d.Type === 'Decision-Making' && d['Composition Data'] === 'Yes'), (d) => (d['#Women'] ? d['#Women'] : 0));

  const tfMemberTotalExpert = sumBy(filteredTFs.filter((d) => d.Type === 'Expert' && d['Composition Data'] === 'Yes'), (d) => {
    const men = d['#Men'] ? d['#Men'] : 0;
    const women = d['#Women'] ? d['#Women'] : 0;
    return men + women;
  });
  const tfMemberWomenExpert = sumBy(filteredTFs.filter((d) => d.Type === 'Expert' && d['Composition Data'] === 'Yes'), (d) => (d['#Women'] ? d['#Women'] : 0));

  const tfMemberTotalMultiSectoral = sumBy(filteredTFs.filter((d) => d.Sector === 'Multi-Sectoral' && d['Composition Data'] === 'Yes'), (d) => {
    const men = d['#Men'] ? d['#Men'] : 0;
    const women = d['#Women'] ? d['#Women'] : 0;
    return men + women;
  });
  const tfMemberWomenMultiSectoral = sumBy(filteredTFs.filter((d) => d.Sector === 'Multi-Sectoral' && d['Composition Data'] === 'Yes'), (d) => (d['#Women'] ? d['#Women'] : 0));

  const tfMemberTotalPublicHealth = sumBy(filteredTFs.filter((d) => d.Sector === 'Public Health' && d['Composition Data'] === 'Yes'), (d) => {
    const men = d['#Men'] ? d['#Men'] : 0;
    const women = d['#Women'] ? d['#Women'] : 0;
    return men + women;
  });
  const tfMemberWomenPublicHealth = sumBy(filteredTFs.filter((d) => d.Sector === 'Public Health' && d['Composition Data'] === 'Yes'), (d) => (d['#Women'] ? d['#Women'] : 0));

  const tfMemberTotalEconomic = sumBy(filteredTFs.filter((d) => d.Sector === 'Economic' && d['Composition Data'] === 'Yes'), (d) => {
    const men = d['#Men'] ? d['#Men'] : 0;
    const women = d['#Women'] ? d['#Women'] : 0;
    return men + women;
  });
  const tfMemberWomenEconomic = sumBy(filteredTFs.filter((d) => d.Sector === 'Economic' && d['Composition Data'] === 'Yes'), (d) => (d['#Women'] ? d['#Women'] : 0));

  return (
    <div className='margin-top-09'>
      <div className='flex-div margin-bottom-05 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{filteredTFs.length}</h3>
          <p className='margin-top-05 margin-bottom-00 undp-typography'>COVID-19 task forces</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>
            {Math.round(tfMemberAvgPercent)}
            %
          </h3>
          <p className='margin-top-05 margin-bottom-00 undp-typography'>Average share of women on COVID-19 task forces</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>
            {Math.round((tfsByRegionWomenLeader.length * 100) / filteredTFs.length)}
            %
          </h3>
          <p className='margin-top-05 margin-bottom-00 undp-typography'>Task forces with women leads or co-leads</p>
        </StatCardsDiv>
      </div>
      <div className='flex-div margin-top-07 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(50% - 1rem)'>
          <h6 className='undp-typography'>Proportion of women members by task force type</h6>
          <div className='flex-div flex-space-between'>
            <StatCardsDiv width='calc(50% - 1rem)'>
              <h3 className='margin-bottom-00 undp-typography'>
                {Math.round((tfMemberWomenDecisionMaking * 100) / tfMemberTotalDecisionMaking)}
                %
              </h3>
              <p className='margin-top-05 margin-bottom-00 undp-typography'>Decision making</p>
            </StatCardsDiv>
            <StatCardsDiv width='calc(50% - 1rem)'>
              <h3 className='margin-bottom-00 undp-typography'>
                {Math.round((tfMemberWomenExpert * 100) / tfMemberTotalExpert)}
                %
              </h3>
              <p className='margin-top-05 margin-bottom-00 undp-typography'>Experts</p>
            </StatCardsDiv>
          </div>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(50% - 1rem)'>
          <h6 className='undp-typography'>Proportion of women members by sectoral focus of task force</h6>
          <div className='flex-div flex-space-between'>
            <StatCardsDiv width='calc(33.33% - 1.334rem)'>
              <h3 className='margin-bottom-00 undp-typography'>
                {Math.round((tfMemberWomenMultiSectoral * 100) / tfMemberTotalMultiSectoral)}
                %
              </h3>
              <p className='margin-top-05 margin-bottom-00 undp-typography'>Multi sectoral</p>
            </StatCardsDiv>
            <StatCardsDiv width='calc(33.33% - 1.334rem)'>
              <h3 className='margin-bottom-00 undp-typography'>
                {Math.round((tfMemberWomenPublicHealth * 100) / tfMemberTotalPublicHealth)}
                %
              </h3>
              <p className='margin-top-05 margin-bottom-00 undp-typography'>Public health</p>
            </StatCardsDiv>
            <StatCardsDiv width='calc(33.33% - 1.334rem)'>
              <h3 className='margin-bottom-00 undp-typography'>
                {Math.round((tfMemberWomenEconomic * 100) / tfMemberTotalEconomic)}
                %
              </h3>
              <p className='margin-top-05 margin-bottom-00 undp-typography'>Economic</p>
            </StatCardsDiv>
          </div>
        </StatCardsDiv>
      </div>
      <div className='flex-div margin-top-07 margin-bottom-07 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{filteredCountryData.length}</h3>
          <p className='margin-top-05 margin-bottom-00 undp-typography'>Countries/territories with task force data</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{filteredTFs.filter((d) => d['Composition Data'] === 'Yes').length}</h3>
          <p className='margin-top-05 margin-bottom-00 undp-typography'>Task forces with membership data</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{filteredTFs.filter((d) => d['Leader Gender'] !== 'NA').length}</h3>
          <p className='margin-top-05 margin-bottom-00 undp-typography'>Task forces with leadership data</p>
        </StatCardsDiv>
      </div>
      <MapViz
        data={tfCountryData}
      />
      <div className='margin-top-02'>
        <CountryTable
          data={tfCountryData}
        />
      </div>
      <div className='margin-top-11'>
        <TFTable
          data={filteredTFs}
        />
      </div>
    </div>
  );
};
