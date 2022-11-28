import sortBy from 'lodash.sortby';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { format } from 'd3-format';
import { CountryGreenLenseSummaryDataType, CtxDataType } from '../Types';
import { GetFilteredCountryGreenLensSummaryData } from '../utils/getFilteredData';

import '../style/chipStyle.css';
import Context from './Context/Context';

interface Props {
  data: CountryGreenLenseSummaryDataType[];
}

interface SVGBarProps {
  value: number;
  bgBar?: boolean;
}

interface CellProps {
  width: string;
  cursor?: string;
}

interface WidthProps {
  width: string;
}

const StatCardsDiv = styled.div<WidthProps>`
  width: ${(props) => props.width};
  min-width: 20rem;
  flex-grow: 1;
  cursor: auto;
`;

const CellEl = styled.div<CellProps>`
  width: ${(props) => props.width};
  cursor: ${(props) => (props.cursor ? props.cursor : 'auto')};
`;

const SVGBar = (props: SVGBarProps) => {
  const { value, bgBar } = props;
  const maxWidth = 115.8;
  const barHeight = 30;
  const maxValue = 80;
  return (
    <svg width='100%' height='100%' viewBox={`0 0 ${maxWidth} ${barHeight}`}>
      {
        bgBar ? (
          <rect
            x={0}
            y={0}
            height={barHeight}
            width={maxWidth}
            fill='#F7F7F7'
          />
        ) : null
      }
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
  } = props;
  const {
    selectedRegion,
    selectedIncomeGroup,
    selectedFragilityGroup,
    selectedHDI,
    selectedDevelopmentGroup,
    selectedPolicyMeasureCat,
    updateSelectedRegion,
    updateSelectedIncomeGroup,
    updateSelectedFragilityGroup,
    updateSelectedHDI,
    updateSelectedDevelopmentGroup,
    updateSelectedPolicyMeasureCat,
  } = useContext(Context) as CtxDataType;
  const [sort, setSort] = useState(1);
  const filteredData: CountryGreenLenseSummaryDataType[] = GetFilteredCountryGreenLensSummaryData(data, selectedRegion, selectedIncomeGroup, selectedFragilityGroup, selectedHDI, selectedDevelopmentGroup);
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
      sortKey = 'noOfPoliciesAddressingVAWG';
      break;
    case 5:
      sortKey = 'noOfPoliciesSupportingUnpaidCare';
      break;
    case 6:
      sortKey = 'noOfPoliciesTargetingWomenEcoSecurity';
      break;
    case 7:
      sortKey = 'noOfPoliciesThatAreEnvironmentalRelevance';
      break;
    case 8:
      sortKey = 'noOfPoliciesGenderGreenNexus';
      break;
    default:
      sortKey = 'countryName';
      break;
  }
  const dataSorted = sortKey === 'countryName' ? sortBy(filteredData, sortKey) : sortBy(filteredData, sortKey).reverse();
  return (
    <>
      <h5 className='bold margin-bottom-05 undp-typography'>
        Measures by country/territory
      </h5>
      {
        selectedRegion === 'All' && selectedIncomeGroup === 'All' && selectedFragilityGroup === 'All' && selectedHDI === 'All' && selectedDevelopmentGroup === 'All' && selectedPolicyMeasureCat === 'All' ? null
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
                {
                  selectedPolicyMeasureCat === 'All' ? null : <div className='undp-chip undp-chip-small'>{selectedPolicyMeasureCat}</div>
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
                    updateSelectedPolicyMeasureCat('All');
                  }}
                >
                  Reset Filters
                </button>
              </>
            </div>
          )
      }
      <div className='flex-div margin-bottom-07 margin-top-07 flex-space-between flex-wrap'>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(filteredData.filter((d) => d.noOfGenderPolicies > 0).length)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Countries/territories with gender-sensitive COVID-19 response measures</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(filteredData.filter((d) => d.noOfPoliciesPositiveForEnvironment > 0).length)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Countries/territories with green COVID-19 response measures</p>
        </StatCardsDiv>
        <StatCardsDiv className='stat-card' width='calc(33.33% - 1.334rem)'>
          <h3 className='margin-bottom-00 undp-typography'>{format(',')(filteredData.filter((d) => d.noOfPoliciesGenderGreenNexus > 0).length)}</h3>
          <p className='undp-typography margin-top-05 margin-bottom-00'>Countries/territories with green and gender-sensitive COVID-19 response measures</p>
        </StatCardsDiv>
      </div>
      <div style={{ maxHeight: '40rem', borderBottom: '1px solid var(--gray-400)' }} className='undp-scrollbar'>
        <div className='undp-table-head-small undp-table-head-sticky' style={{ minWidth: '67.5rem' }}>
          <CellEl width='16%' className='undp-table-head-cell' cursor='pointer' onClick={() => { setSort(1); }}>
            Country/territory (
            {dataSorted.length}
            )
            {' '}
            {sort === 1 ? '↓' : null}
          </CellEl>
          <CellEl width='12%' className='undp-table-head-cell' cursor='pointer' onClick={() => { setSort(2); }}>
            Total
            {' '}
            {sort === 2 ? '↓' : null}
          </CellEl>
          <CellEl width='12%' className='undp-table-head-cell' cursor='pointer' onClick={() => { setSort(3); }}>
            Gender-sensitive
            {' '}
            {sort === 3 ? '↓' : null}
          </CellEl>
          <CellEl width='12%' className='undp-table-head-cell' cursor='pointer' onClick={() => { setSort(7); }}>
            Green
            {' '}
            {sort === 7 ? '↓' : null}
          </CellEl>
          <CellEl width='12%' className='undp-table-head-cell' cursor='pointer' onClick={() => { setSort(8); }}>
            Green and gender-sensitive
            {' '}
            {sort === 8 ? '↓' : null}
          </CellEl>
          <CellEl width='12%' className='undp-table-head-cell' cursor='pointer' onClick={() => { setSort(4); }}>
            Green policies for violence against women
            {' '}
            {sort === 4 ? '↓' : null}
          </CellEl>
          <CellEl width='12%' className='undp-table-head-cell' cursor='pointer' onClick={() => { setSort(5); }}>
            Green policies for unpaid care
            {' '}
            {sort === 5 ? '↓' : null}
          </CellEl>
          <CellEl width='12%' className='undp-table-head-cell' cursor='pointer' onClick={() => { setSort(6); }}>
            Green policies for women&apos;s economic security
            {' '}
            {sort === 6 ? '↓' : null}
          </CellEl>
        </div>
        {
          dataSorted.map((d, i) => (
            <div key={i} className='undp-table-row' style={{ minWidth: '67.5rem' }}>
              <CellEl width='16%' className='undp-table-row-cell'>
                {d.countryName}
              </CellEl>
              <CellEl width='12%' style={{ backgroundColor: 'var(--light-azure)' }} className='undp-table-row-cell'>
                <SVGBar value={d.noOfPolicies} />
              </CellEl>
              <CellEl width='12%' style={{ backgroundColor: '#E4D4E8' }} className='undp-table-row-cell'>
                <SVGBar value={d.noOfGenderPolicies} />
              </CellEl>
              <CellEl width='12%' style={{ backgroundColor: 'var(--light-green)' }} className='undp-table-row-cell'>
                <SVGBar value={d.noOfPoliciesPositiveForEnvironment} />
              </CellEl>
              <CellEl width='12%' className='undp-table-row-cell'>
                <SVGBar bgBar value={d.noOfPoliciesGenderGreenNexus} />
              </CellEl>
              <CellEl width='12%' className='undp-table-row-cell'>
                <SVGBar bgBar value={d.noOfEnvironmetallyPositivePoliciesAddressingVAWG} />
              </CellEl>
              <CellEl width='12%' className='undp-table-row-cell'>
                <SVGBar bgBar value={d.noOfEnvironmetallyPositivePoliciesSupportingUnpaidCare} />
              </CellEl>
              <CellEl width='12%' className='undp-table-row-cell'>
                <SVGBar bgBar value={d.noOfEnvironmetallyPositivePoliciesTargetingWomenEcoSecurity} />
              </CellEl>
            </div>
          ))
        }
      </div>
    </>
  );
};
