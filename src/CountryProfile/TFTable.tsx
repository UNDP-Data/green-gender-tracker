import styled from 'styled-components';
import { TFDataType, CountryDataType } from '../Types';

interface Props {
  data: TFDataType[];
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

export const TFTable = (props: Props) => {
  const {
    data,
    selectedCountry,
  } = props;

  return (
    <>
      <h5 className='bold margin-bottom-05'>
        All task Force Details for
        {' '}
        {selectedCountry.name}
      </h5>
      <div style={{ maxHeight: '40rem', borderBottom: '1px solid var(--gray-400)' }} className='undp-scrollbar'>
        <div style={{ width: '100%' }}>
          <div className='undp-table-head-small undp-table-head-sticky'>
            <CellEl width='40%' className='undp-table-head-cell'>
              Task force Name
            </CellEl>
            <CellEl width='60%' className='undp-table-head-cell'>
              Description
            </CellEl>
          </div>
          {
            data.map((d, i) => (
              <div key={i} className='undp-table-row'>
                <CellEl width='40%' className='undp-table-row-cell-small'>
                  {d['Task Force Name']}
                </CellEl>
                <CellEl width='60%' className='undp-table-row-cell-small'>
                  <div>
                    <div className='flex-div flex-vert-align-center flex-wrap margin-bottom-04' style={{ gap: '0.5rem' }}>
                      <div className='undp-chip undp-chip-blue undp-chip-small'>
                        {d.Type}
                      </div>
                      <div className='undp-chip undp-chip-blue undp-chip-small'>
                        {d.Sector}
                      </div>
                      {
                        d['Woman Leader'] === 'Yes' || d['Woman Leader'] === 'Co-Chair'
                          ? (
                            <div className='undp-chip undp-chip-blue undp-chip-small undp-chip-green'>
                              {d['Woman Leader'] === 'Yes' ? 'Women leadership' : 'Women Co-Chair'}
                            </div>
                          ) : d['Woman Leader'] === 'No'
                            ? (
                              <div className='undp-chip undp-chip-blue undp-chip-small undp-chip-yellow'>
                                Men leadership
                              </div>
                            ) : null
                      }
                      {
                        d['Composition Classification'] === 'Majority Women' || d['Composition Classification'] === 'Gender Parity'
                          ? (
                            <div className='undp-chip undp-chip-blue undp-chip-small undp-chip-green'>
                              {d['Composition Classification']}
                            </div>
                          ) : d['Composition Classification'] === 'Majority Men' ? (
                            <div className='undp-chip undp-chip-blue undp-chip-small undp-chip-yellow'>
                              {d['Composition Classification']}
                            </div>
                          ) : null
                      }
                    </div>
                    {d['Description of Task Force']}
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
