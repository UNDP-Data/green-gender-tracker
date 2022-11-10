import sortBy from 'lodash.sortby';
import { useContext, useState } from 'react';
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
  const [sort, setSort] = useState(1);
  const filteredData = GetFilteredCountryTFSummaryData(data, selectedRegion, selectedIncomeGroup, selectedFragilityGroup, selectedHDI, selectedDevelopmentGroup);
  let sortKey = 'countryName';
  switch (sort) {
    case 1:
      sortKey = 'countryName';
      break;
    case 2:
      sortKey = 'noOfTF';
      break;
    case 3:
      sortKey = 'noOfTFWithMembershipData';
      break;
    case 4:
      sortKey = 'noOfTFWithLeadershipData';
      break;
    case 5:
      sortKey = 'percentOfTFMembersWomen';
      break;
    case 6:
      sortKey = 'noOfTFWithMajorityWomenOfGenderParity';
      break;
    case 7:
      sortKey = 'noOfTFWithWomenLeader';
      break;
    default:
      sortKey = 'countryName';
      break;
  }
  const dataSorted = sortKey === 'countryName' ? sortBy(filteredData, sortKey) : sortBy(filteredData, sortKey).reverse();
  return (
    <>
      <h5 className='bold margin-bottom-05 undp-typography'>
        COVID-19 task forces, by country/territory
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
                  className='undp-chip undp-chip-red undp-chip-small'
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
            <CellEl width='20%' className='undp-table-head-cell undp-sticky-head-column' cursor='pointer' onClick={() => { setSort(1); }}>
              Countries/territories (
              {dataSorted.length}
              )
              {' '}
              {sort === 1 ? '↓' : null}
            </CellEl>
            <CellEl width='10%' className='undp-table-head-cell align-right' cursor='pointer' onClick={() => { setSort(2); }}>
              Total task forces
              {' '}
              {sort === 2 ? '↓' : null}
            </CellEl>
            <CellEl width='10%' className='undp-table-head-cell align-right' cursor='pointer' onClick={() => { setSort(3); }}>
              Task forces with membership data
              {' '}
              {sort === 3 ? '↓' : null}
            </CellEl>
            <CellEl width='10%' className='undp-table-head-cell align-right' cursor='pointer' onClick={() => { setSort(4); }}>
              Task forces with leadership data
              {' '}
              {sort === 4 ? '↓' : null}
            </CellEl>
            <CellEl width='15%' className='undp-table-head-cell align-right' cursor='pointer' onClick={() => { setSort(5); }}>
              Average share of women members
              {' '}
              {sort === 5 ? '↓' : null}
            </CellEl>
            <CellEl width='20%' className='undp-table-head-cell align-right' cursor='pointer' onClick={() => { setSort(6); }}>
              Task forces with gender parity or majority women members
              {' '}
              {sort === 6 ? '↓' : null}
            </CellEl>
            <CellEl width='15%' className='undp-table-head-cell align-right' cursor='pointer' onClick={() => { setSort(7); }}>
              Task forces with women lead or co-lead
              {' '}
              {sort === 1 ? '↓' : null}
            </CellEl>
          </div>
          {
            dataSorted.map((d, i) => (
              <div key={i} className='undp-table-row'>
                <CellEl width='20%' className='undp-table-row-cell'>
                  {d.countryName}
                </CellEl>
                <CellEl width='10%' className='undp-table-row-cell align-right'>
                  {d.noOfTF}
                </CellEl>
                <CellEl width='10%' className='undp-table-row-cell align-right'>
                  {d.noOfTFWithMembershipData}
                </CellEl>
                <CellEl width='10%' className='undp-table-row-cell align-right'>
                  {d.noOfTFWithLeadershipData}
                </CellEl>
                <CellEl width='15%' className='undp-table-row-cell align-right'>
                  {
                    !d.percentOfTFMembersWomenNA ? `${Math.round(d.percentOfTFMembersWomen)}%` : 'NA'
                  }
                </CellEl>
                <CellEl width='20%' className='undp-table-row-cell align-right'>
                  {d.noOfTFWithMajorityWomenOfGenderParity !== -1 ? d.noOfTFWithMajorityWomenOfGenderParity : 'NA'}
                </CellEl>
                <CellEl width='15%' className='undp-table-row-cell align-right'>
                  {d.noOfTFWithWomenLeader !== -1 ? d.noOfTFWithWomenLeader : 'NA'}
                </CellEl>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};
