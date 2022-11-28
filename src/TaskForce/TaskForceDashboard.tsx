import styled from 'styled-components';
import sumBy from 'lodash.sumby';
import { useContext } from 'react';
import { TFDataType, CountryTFSummaryDataType, CtxDataType } from '../Types';
import { MapViz } from './MapViz';
import { CountryTable } from './CountryTable';
import { TFTable } from './TFTable';
import { GetFilteredTFData } from '../utils/getFilteredData';
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
  min-width: 20rem;
  flex-grow: 1;
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
  const tfsByRegionWomenLeader = filteredTFs.filter((d) => d['Leader Gender'] === 'Woman' || d['Leader Gender'] === 'Man and Woman (co-chairs)');
  const tfMemberAvgPercent = sumBy(tfCountryData.filter((el) => el.percentOfTFMembersWomen !== -1), (el) => el.percentOfTFMembersWomen) / tfCountryData.filter((el) => el.percentOfTFMembersWomen !== -1).length;
  return (
    <div className='margin-top-09'>
      <div className='flex-div margin-bottom-05 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(50% - 1rem)'>
          <h3 className='margin-bottom-00 undp-typography'>
            {Math.round(tfMemberAvgPercent)}
            %
          </h3>
          <p className='margin-top-05 margin-bottom-00 undp-typography'>Average share of women on COVID-19 task forces</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(50% - 1rem)'>
          <h3 className='margin-bottom-00 undp-typography'>
            {Math.round((tfsByRegionWomenLeader.length * 100) / filteredTFs.length)}
            %
          </h3>
          <p className='margin-top-05 margin-bottom-00 undp-typography'>COVID-19 task forces with women leads or co-leads</p>
        </StatCardsDiv>
      </div>
      <div className='flex-div margin-top-07 margin-bottom-07 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{filteredTFs.length}</h3>
          <p className='margin-top-05 margin-bottom-00 undp-typography'>COVID-19 task forces</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{filteredTFs.filter((d) => d['Composition Data'] === 'Yes').length}</h3>
          <p className='margin-top-05 margin-bottom-00 undp-typography'>COVID-19 task forces with membership data</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{filteredTFs.filter((d) => d['Leader Gender'] !== 'NA').length}</h3>
          <p className='margin-top-05 margin-bottom-00 undp-typography'>COVID-19 task forces with leadership data</p>
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
