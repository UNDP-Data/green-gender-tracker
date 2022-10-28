import styled from 'styled-components';
import { PolicyDataType, CountryDataType } from '../Types';

interface Props {
  data: PolicyDataType[];
  selectedCountry: CountryDataType;
}

interface CellProps {
  width: string;
  cursor?: string;
}

const CellEl = styled.div<CellProps>`
  width: ${(props) => props.width};
  cursor: ${(props) => (props.cursor ? props.cursor : 'auto')};
`;

export const GenderResponseTable = (props: Props) => {
  const {
    data,
    selectedCountry,
  } = props;
  return (
    <>
      <h5 className='bold margin-bottom-05 undp-typography'>
        All gender response details for
        {' '}
        {selectedCountry.name}
      </h5>
      <div style={{ maxHeight: '40rem', borderBottom: '1px solid var(--gray-400)' }} className='undp-scrollbar'>
        <div style={{ width: '100%' }}>
          <div className='undp-table-head-small undp-table-head-sticky'>
            <CellEl width='25%' className='undp-table-head-cell'>
              Policy category
            </CellEl>
            <CellEl width='75%' className='undp-table-head-cell'>
              Description
            </CellEl>
          </div>
          {
            data.map((d, i) => (
              <div key={i} className='undp-table-row'>
                <CellEl width='25%' className='undp-table-row-cell-small'>
                  {d['Policy Measure Category']}
                </CellEl>
                <CellEl width='75%' className='undp-table-row-cell-small'>
                  <div>
                    {
                      d['Addresses VAWG'] === 'YES' || d['Directly supports unpaid care'] === 'YES' || d['Targets Women\'s Economic Security'] === 'YES'
                        ? (
                          <div className='flex-div flex-vert-align-center flex-wrap margin-bottom-04' style={{ gap: '0.5rem' }}>
                            {
                              d['Addresses VAWG'] === 'YES' || d['Directly supports unpaid care'] === 'YES' || d['Targets Women\'s Economic Security'] === 'YES'
                                ? (
                                  <div className='undp-chip undp-chip-small undp-chip-green'>
                                    Gender-sensitive
                                  </div>
                                ) : null
                            }
                            {
                              d['Addresses VAWG'] === 'YES'
                                ? (
                                  <div className='undp-chip undp-chip-small undp-chip-blue'>
                                    Violence against women
                                  </div>
                                ) : null
                            }
                            {
                              d['Directly supports unpaid care'] === 'YES'
                                ? (
                                  <div className='undp-chip undp-chip-small undp-chip-blue'>
                                    Unpaid care work
                                  </div>
                                ) : null
                            }
                            {
                              d['Targets Women\'s Economic Security'] === 'YES'
                                ? (
                                  <div className='undp-chip undp-chip-small undp-chip-blue'>
                                    Women&apos;s economic security
                                  </div>
                                ) : null
                            }
                          </div>
                        ) : null
                      }
                    {d['Policy Measure Description']}
                  </div>
                </CellEl>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};
