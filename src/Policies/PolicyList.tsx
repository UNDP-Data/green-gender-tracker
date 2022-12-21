import styled from 'styled-components';
import { useState } from 'react';
import { Modal } from 'antd';
import { PromisingPoliciesDataType } from '../Types';

import '../style/buttonStyle.css';
import '../style/modalStyle.css';

interface Props {
  searchText: string;
  data: PromisingPoliciesDataType[];
  showVAWG: boolean;
  showWEC: boolean;
  showUCW: boolean;
  selectedRegion: string;
  selectedCountry: string;
}

const CardEl = styled.div`
  width: calc(33.33% - 1.334rem);
  min-width: 20rem;
  flex-grow: 1;
  background-color: var(--gray-100);
  padding: var(--spacing-09);
  cursor: pointer;
  &:hover{
    background-color: var(--light-yellow);
  }
`;

export const PolicyList = (props: Props) => {
  const {
    data,
    showVAWG,
    showWEC,
    showUCW,
    selectedRegion,
    selectedCountry,
    searchText,
  } = props;
  const dataFilteredBySearch = searchText === '' || searchText === undefined ? data : data.filter((d) => d['Policy measure title'].toLowerCase().includes(searchText.toLowerCase()) || d['Policy measure description'].toLowerCase().includes(searchText.toLowerCase()));
  const dataFilteredByVAWG = showVAWG ? dataFilteredBySearch : dataFilteredBySearch.filter((d) => d['Gender-sensitive dimension'] !== 'Violence against women and girls');
  const dataFilteredByWEC = showWEC ? dataFilteredByVAWG : dataFilteredByVAWG.filter((d) => d['Gender-sensitive dimension'] !== "Women's economic security");
  const dataFilteredByUCW = showUCW ? dataFilteredByWEC : dataFilteredByWEC.filter((d) => d['Gender-sensitive dimension'] !== 'Unpaid care');
  const dataFilteredByRegion = selectedRegion === 'All' ? dataFilteredByUCW : dataFilteredByUCW.filter((d) => d.Region === selectedRegion);
  const dataFilteredByCountry = selectedCountry === 'All' ? dataFilteredByRegion : dataFilteredByRegion.filter((d) => d.Country === selectedCountry);
  const [selectedData, setSelectedData] = useState<PromisingPoliciesDataType | undefined>(undefined);
  return (
    <>
      <div style={{
        backgroundColor: 'var(--gray-300)',
        textAlign: 'center',
        padding: 'var(--spacing-07) var(--spacing-05)',
        width: '100%',
        borderRadius: '0.25rem',
      }}
      >
        <h5 className='bold undp-typography margin-bottom-00'>
          Showing
          {' '}
          {dataFilteredByCountry.length}
          {' '}
          promising policies for gender equality catalogue
        </h5>
      </div>
      <div className='flex-div flex-space-between margin-top-07 margin-bottom-05 flex-wrap' style={{ gap: '2rem' }}>
        {
          dataFilteredByCountry.map((d, i) => (
            <CardEl key={i} onClick={() => { setSelectedData(d); }}>
              <div
                className='margin-bottom-09 flex-div flex-wrap'
                style={{ gap: '0.5rem' }}
              >
                <div
                  className='undp-chip'
                  style={{
                    backgroundColor: d['Gender-sensitive dimension'] === 'Violence against women and girls'
                      ? '#C49FC4'
                      : d['Gender-sensitive dimension'] === 'Unpaid care'
                        ? '#85CDEB'
                        : '#C7D3A5',
                  }}
                >
                  {d['Gender-sensitive dimension']}
                </div>
                {
                  d['Policy measure sub-type'] !== 'Not specific' ? (
                    <div
                      className='undp-chip'
                      style={{
                        backgroundColor: d['Gender-sensitive dimension'] === 'Violence against women and girls'
                          ? '#C49FC4'
                          : d['Gender-sensitive dimension'] === 'Unpaid care'
                            ? '#85CDEB'
                            : '#C7D3A5',
                      }}
                    >
                      {d['Policy measure sub-type']}
                    </div>
                  ) : null
                }
              </div>
              <h5 className='undp-typography'>{d['Policy measure title']}</h5>
              <div className='undp-chip margin-bottom-07'>
                {d.Country}
              </div>
              <p className='undp-typography'>
                {
                  d['Policy measure description'].length > 500 ? `${d['Policy measure description'].substring(0, 500)}...` : d['Policy measure description']
                }
              </p>
              <button type='button' className='undp-button button-tertiary button-arrow margin-top-09' style={{ padding: 0 }}>Learn More</button>
            </CardEl>
          ))
        }
      </div>
      <Modal
        className='undp-modal'
        onCancel={() => { setSelectedData(undefined); }}
        onOk={() => { setSelectedData(undefined); }}
        title={selectedData ? selectedData['Policy measure title'] : null}
        open={selectedData !== undefined}
        width='80%'
        style={{ maxWidth: '60rem' }}
      >

        <div
          className='margin-bottom-09 flex-div flex-wrap'
          style={{ gap: '0.5rem' }}
        >
          <div
            className='undp-chip'
            style={{
              backgroundColor: selectedData?.['Gender-sensitive dimension'] === 'Violence against women and girls'
                ? '#C49FC4'
                : selectedData?.['Gender-sensitive dimension'] === 'Unpaid care'
                  ? '#85CDEB'
                  : '#C7D3A5',
            }}
          >
            {selectedData?.['Gender-sensitive dimension']}
          </div>
          {
            selectedData?.['Policy measure sub-type'] !== 'Not specific' ? (
              <div
                className='undp-chip'
                style={{
                  backgroundColor: selectedData?.['Gender-sensitive dimension'] === 'Violence against women and girls'
                    ? '#C49FC4'
                    : selectedData?.['Gender-sensitive dimension'] === 'Unpaid care'
                      ? '#85CDEB'
                      : '#C7D3A5',
                }}
              >
                {selectedData?.['Policy measure sub-type']}
              </div>
            ) : null
          }
        </div>
        {
          selectedData?.['Policy measure description'].split('~~').map((d, i) => <p className='undp-typography' key={i}>{d}</p>)
        }
        <h5 className='undp-typography margin-top-09'>
          Who is Implementing the Policy?
        </h5>
        <p className='undp-typography'>{selectedData?.Who}</p>
        <h5 className='undp-typography margin-top-09'>
          Why is it Promising?
        </h5>
        <ul style={{ paddingLeft: '1rem' }}>
          {
            selectedData?.['Why promising'].split('~~').map((d, i) => <li key={i}>{d}</li>)
          }
        </ul>
        <h5 className='undp-typography margin-top-09'>
          Potential Challenges
        </h5>
        <ul style={{ paddingLeft: '1rem' }}>
          {
            selectedData?.['Potential challenges'].split('~~').map((d, i) => <li key={i}>{d}</li>)
          }
        </ul>
        <h5 className='undp-typography margin-top-09'>
          Further Reading
        </h5>
        <ul style={{ paddingLeft: '1rem' }}>
          {
            selectedData?.['Further reading'].split('~~').map((d, i) => (
              <li key={i}>
                {
                  d.split('http').length === 1
                    ? d
                    : <a className='undp-style' href={`http${d.split('http')[1]}`} target='_blank' rel='noreferrer'>{d.split('http')[0]}</a>
                }
              </li>
            ))
          }
        </ul>
      </Modal>
    </>
  );
};
