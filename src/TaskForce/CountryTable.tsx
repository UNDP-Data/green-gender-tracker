import sortBy from 'lodash.sortby';
import { useContext } from 'react';
import styled from 'styled-components';
import { CountryTFSummaryDataType, CtxDataType } from '../Types';
import { GetFilteredCountryTFSummaryData } from '../utils/getFilteredData';
import Context from './Context/Context';

interface Props {
  data: CountryTFSummaryDataType[];
}

interface CellProps {
  width: string;
  cursor?: string;
}

const CellEl = styled.div<CellProps>`
  width: ${(props) => props.width};
  cursor: ${(props) => (props.cursor ? props.cursor : 'auto')};
`;

export const CountryTable = (props: Props) => {
  const {
    data,
  } = props;
  const {
    selectedRegion,
    selectedIncomeGroup,
    selectedFragilityGroup,
    selectedHDI,
    selectedDevelopmentGroup,
    updateSelectedRegion,
    updateSelectedIncomeGroup,
    updateSelectedFragilityGroup,
    updateSelectedHDI,
    updateSelectedDevelopmentGroup,
  } = useContext(Context) as CtxDataType;
  const filteredData = GetFilteredCountryTFSummaryData(data, selectedRegion, selectedIncomeGroup, selectedFragilityGroup, selectedHDI, selectedDevelopmentGroup);
  const dataSorted = sortBy(filteredData, 'countryName');
  return (
    <>
      <h5 className='bold margin-bottom-05 undp-typography'>
        Task force by country
      </h5>
      {
        selectedRegion === 'All' && selectedIncomeGroup === 'All' && selectedFragilityGroup === 'All' && selectedHDI === 'All' && selectedDevelopmentGroup === 'All' ? null
          : (
            <div className='flex-div flex-wrap margin-bottom-07 margin-top-00 flex-vert-align-center' style={{ gap: 'var(--spacing-05)' }}>
              <>
                <p className='undp-typography margin-bottom-00 bold'>Filters:</p>
                {
                  selectedRegion === 'All' ? null : <div className='undp-chip undp-chip-small'>{selectedRegion}</div>
                }
                {
                  selectedIncomeGroup === 'All' ? null : <div className='undp-chip undp-chip-small'>{selectedIncomeGroup}</div>
                }
                {
                  selectedFragilityGroup === 'All' ? null : <div className='undp-chip undp-chip-small'>{selectedFragilityGroup}</div>
                }
                {
                  selectedHDI === 'All' ? null : <div className='undp-chip undp-chip-small'>{selectedHDI}</div>
                }
                {
                  selectedDevelopmentGroup === 'All' ? null : <div className='undp-chip undp-chip-small'>{selectedDevelopmentGroup}</div>
                }
                <button
                  className='undp-chip undp-chip-blue undp-chip-small'
                  type='button'
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    updateSelectedRegion('All');
                    updateSelectedIncomeGroup('All');
                    updateSelectedFragilityGroup('All');
                    updateSelectedHDI('All');
                    updateSelectedDevelopmentGroup('All');
                  }}
                >
                  Reset Filters
                </button>
              </>
            </div>
          )
      }
      <div style={{ maxHeight: '40rem', borderBottom: '1px solid var(--gray-400)' }} className='undp-scrollbar'>
        <div style={{ width: '100%' }}>
          <div className='undp-table-head-small undp-table-head-sticky'>
            <CellEl width='30%' className='undp-table-head-cell undp-sticky-head-column' cursor='pointer'>
              Countries (
              {dataSorted.length}
              )
            </CellEl>
            <CellEl width='10%' className='undp-table-head-cell align-right' cursor='pointer'>
              # Task force
            </CellEl>
            <CellEl width='20%' className='undp-table-head-cell align-right' cursor='pointer'>
              # Task force with women leader or co-chair
            </CellEl>
            <CellEl width='20%' className='undp-table-head-cell align-right' cursor='pointer'>
              # Task force with gender parity or women majority
            </CellEl>
            <CellEl width='20%' className='undp-table-head-cell align-right' cursor='pointer'>
              Avg. Proportion of women member
            </CellEl>
          </div>
          {
            dataSorted.map((d, i) => (
              <div key={i} className='undp-table-row'>
                <CellEl width='30%' className='undp-table-row-cell'>
                  {d.countryName}
                </CellEl>
                <CellEl width='10%' className='undp-table-row-cell align-right'>
                  {d.noOfTF}
                </CellEl>
                <CellEl width='20%' className='undp-table-row-cell align-right'>
                  {d.noOfTFWithWomenLeader !== -1 ? d.noOfTFWithWomenLeader : 'NA'}
                </CellEl>
                <CellEl width='20%' className='undp-table-row-cell align-right'>
                  {d.noOfTFWithMajorityWomenOfGenderParity !== -1 ? d.noOfTFWithMajorityWomenOfGenderParity : 'NA'}
                </CellEl>
                <CellEl width='20%' className='undp-table-row-cell align-right'>
                  {
                    !d.percentOfTFMembersWomenNA ? `${d.percentOfTFMembersWomen.toFixed(1)}%` : 'NA'
                  }
                </CellEl>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};
