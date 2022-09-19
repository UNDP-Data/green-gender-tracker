import sortBy from 'lodash.sortby';
import { useState } from 'react';
import styled from 'styled-components';
import { CountryTFSummaryDataType } from '../Types';

interface Props {
  data: CountryTFSummaryDataType[];
  selectedRegion: string;
  selectedIncomeGroup: string;
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
    selectedRegion,
    selectedIncomeGroup,
  } = props;
  const [sort, setSort] = useState(1);
  const dataFilteredByIncomeGroup = selectedIncomeGroup === 'All' ? data : data.filter((d) => d.incomeGroup === selectedIncomeGroup);
  const dataFilteredByRegion = selectedRegion === 'All' ? dataFilteredByIncomeGroup : dataFilteredByIncomeGroup.filter((d) => d.region === selectedRegion);
  let sortKey = 'countryName';
  switch (sort) {
    case 1:
      sortKey = 'countryName';
      break;
    case 2:
      sortKey = 'noOfTF';
      break;
    case 3:
      sortKey = 'noOfTFWithWomenLeader';
      break;
    case 4:
      sortKey = 'noOfTFWithMajorityWomenOfGenderParity';
      break;
    case 5:
      sortKey = 'noOfTFMembers';
      break;
    case 6:
      sortKey = 'noOfTFMembersWomen';
      break;
    case 7:
      sortKey = 'percentOfTFMembersWomen';
      break;
    default:
      sortKey = 'countryName';
      break;
  }
  const dataSorted = sortKey === 'countryName' ? sortBy(dataFilteredByRegion, sortKey) : sortBy(dataFilteredByRegion, sortKey).reverse();
  return (
    <>
      <h5 className='bold margin-bottom-05'>
        Task force by country
        {selectedRegion === 'All' ? null : ` for ${selectedRegion}`}
      </h5>
      <div style={{ maxHeight: '40rem', borderBottom: '1px solid var(--gray-400)' }} className='undp-scrollbar'>
        <div style={{ width: '100%' }}>
          <div className='undp-table-head-small undp-table-head-sticky'>
            <CellEl width='20%' className='undp-table-head-cell undp-sticky-head-column' cursor='pointer' onClick={() => { setSort(1); }}>
              Countries (
              {dataSorted.length}
              )
              {' '}
              {sort === 1 ? '↓' : null}
            </CellEl>
            <CellEl width='10%' className='undp-table-head-cell align-right' cursor='pointer' onClick={() => { setSort(2); }}>
              # Task force
              {' '}
              {sort === 2 ? '↓' : null}
            </CellEl>
            <CellEl width='15%' className='undp-table-head-cell align-right' cursor='pointer' onClick={() => { setSort(3); }}>
              # Task force with women leader or co-chair
              {' '}
              {sort === 3 ? '↓' : null}
            </CellEl>
            <CellEl width='15%' className='undp-table-head-cell align-right' cursor='pointer' onClick={() => { setSort(4); }}>
              # Task force with gender parity or women majority
              {' '}
              {sort === 4 ? '↓' : null}
            </CellEl>
            <CellEl width='13%' className='undp-table-head-cell align-right' cursor='pointer' onClick={() => { setSort(5); }}>
              # Task force member
              {' '}
              {sort === 5 ? '↓' : null}
            </CellEl>
            <CellEl width='13%' className='undp-table-head-cell align-right' cursor='pointer' onClick={() => { setSort(6); }}>
              # Women member
              {' '}
              {sort === 6 ? '↓' : null}
            </CellEl>
            <CellEl width='14%' className='undp-table-head-cell align-right' cursor='pointer' onClick={() => { setSort(7); }}>
              Proportion of women member
              {' '}
              {sort === 7 ? '↓' : null}
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
                <CellEl width='15%' className='undp-table-row-cell align-right'>
                  {d.noOfTFWithWomenLeader}
                </CellEl>
                <CellEl width='15%' className='undp-table-row-cell align-right'>
                  {d.noOfTFWithMajorityWomenOfGenderParity}
                </CellEl>
                <CellEl width='13%' className='undp-table-row-cell align-right'>
                  {d.noOfTFMembers !== -1 ? d.noOfTFMembers : 'NA'}
                </CellEl>
                <CellEl width='13%' className='undp-table-row-cell align-right'>
                  {d.noOfTFMembersWomen !== -1 ? d.noOfTFMembersWomen : 'NA'}
                </CellEl>
                <CellEl width='14%' className='undp-table-row-cell align-right'>
                  {
                    d.percentOfTFMembersWomen !== -1 ? `${d.percentOfTFMembersWomen.toFixed(1)}%` : 'NA'
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
