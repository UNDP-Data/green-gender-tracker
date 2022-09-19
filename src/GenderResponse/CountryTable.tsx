import sortBy from 'lodash.sortby';
import { useState } from 'react';
import styled from 'styled-components';
import { CountrySummaryDataType } from '../Types';

interface Props {
  data: CountrySummaryDataType[];
  selectedRegion: string;
  selectedIncomeGroup: string;
}

interface SVGBarProps {
  value: number;
}

interface CellProps {
  width: string;
  cursor?: string;
}

const CellEl = styled.div<CellProps>`
  width: ${(props) => props.width};
  cursor: ${(props) => (props.cursor ? props.cursor : 'auto')};
`;

const SVGBar = (props: SVGBarProps) => {
  const { value } = props;
  const maxWidth = 168.8;
  const barHeight = 30;
  const maxValue = 80;
  return (
    <svg width='100%' height='100%' viewBox={`0 0 ${maxWidth} ${barHeight}`}>
      <rect
        x={0}
        y={0}
        height={barHeight}
        width={maxWidth}
        fill='#F7F7F7'
      />
      <rect
        x={0}
        y={0}
        height={barHeight}
        width={(maxWidth * value) / maxValue}
        fill='#006EB5'
      />
      <text
        x={(maxWidth * value) / maxValue}
        y={0}
        dx={(maxWidth * value) / maxValue > 40 ? -5 : 5}
        dy={barHeight / 2 + 6}
        fontSize={18}
        fontWeight='bold'
        fill={(maxWidth * value) / maxValue > 40 ? '#fff' : '#006EB5'}
        textAnchor={(maxWidth * value) / maxValue > 40 ? 'end' : 'start'}
      >
        {value}
      </text>
    </svg>
  );
};

export const CountryTable = (props: Props) => {
  const {
    data,
    selectedRegion,
    selectedIncomeGroup,
  } = props;
  const [sort, setSort] = useState(1);
  const dataFilterByIncome = selectedIncomeGroup === 'All' ? data : data.filter((d) => d.incomeGroup === selectedIncomeGroup);
  const dataFilteredByRegion = selectedRegion === 'All' ? dataFilterByIncome : dataFilterByIncome.filter((d) => d.region === selectedRegion);
  let sortKey = 'countryName';
  switch (sort) {
    case 1:
      sortKey = 'countryName';
      break;
    case 2:
      sortKey = 'noOfPolicies';
      break;
    case 3:
      sortKey = 'noOfGenderPolicies';
      break;
    case 4:
      sortKey = 'noOfGenderPolicies';
      break;
    case 5:
      sortKey = 'noOfPoliciesSupportingUnpaidCare';
      break;
    case 6:
      sortKey = 'noOfPoliciesTargetingWomenEcoSecuirty';
      break;
    default:
      sortKey = 'countryName';
      break;
  }
  const dataSorted = sortKey === 'countryName' ? sortBy(dataFilteredByRegion, sortKey) : sortBy(dataFilteredByRegion, sortKey).reverse();
  return (
    <>
      <h5 className='bold margin-bottom-05'>
        Number of measures by country
        {selectedRegion === 'All' ? null : ` in ${selectedRegion}`}
      </h5>
      <div style={{ maxHeight: '40rem', borderBottom: '1px solid var(--gray-400)' }} className='undp-scrollbar'>
        <div className='undp-table-head undp-table-head-sticky'>
          <CellEl width='20%' className='undp-table-head-cell' cursor='pointer' onClick={() => { setSort(1); }}>
            Countries (
            {dataSorted.length}
            )
            {' '}
            {sort === 1 ? '↓' : null}
          </CellEl>
          <CellEl width='16%' className='undp-table-head-cell' cursor='pointer' onClick={() => { setSort(2); }}>
            All
            {' '}
            {sort === 2 ? '↓' : null}
          </CellEl>
          <CellEl width='16%' className='undp-table-head-cell' cursor='pointer' onClick={() => { setSort(3); }}>
            Gender sensitive
            {' '}
            {sort === 3 ? '↓' : null}
          </CellEl>
          <CellEl width='16%' className='undp-table-head-cell' cursor='pointer' onClick={() => { setSort(4); }}>
            Voilence against women
            {' '}
            {sort === 4 ? '↓' : null}
          </CellEl>
          <CellEl width='16%' className='undp-table-head-cell' cursor='pointer' onClick={() => { setSort(5); }}>
            Unpaid care
            {' '}
            {sort === 5 ? '↓' : null}
          </CellEl>
          <CellEl width='16%' className='undp-table-head-cell' cursor='pointer' onClick={() => { setSort(6); }}>
            Women&apos;s economic security
            {' '}
            {sort === 6 ? '↓' : null}
          </CellEl>
        </div>
        {
          dataSorted.map((d, i) => (
            <div key={i} className='undp-table-row flex-vert-align-center'>
              <CellEl width='20%' className='undp-table-row-cell'>
                {d.countryName}
              </CellEl>
              <CellEl width='16%' className='undp-table-row-cell'>
                <SVGBar value={d.noOfPolicies} />
              </CellEl>
              <CellEl width='16%' className='undp-table-row-cell'>
                <SVGBar value={d.noOfGenderPolicies} />
              </CellEl>
              <CellEl width='16%' className='undp-table-row-cell'>
                <SVGBar value={d.noOfPoliciesAddressingVAWG} />
              </CellEl>
              <CellEl width='16%' className='undp-table-row-cell'>
                <SVGBar value={d.noOfPoliciesSupportingUnpaidCare} />
              </CellEl>
              <CellEl width='16%' className='undp-table-row-cell'>
                <SVGBar value={d.noOfPoliciesTargetingWomenEcoSecuirty} />
              </CellEl>
            </div>
          ))
        }
      </div>
    </>
  );
};
