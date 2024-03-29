import styled from 'styled-components';
import { useState } from 'react';
import { Modal } from 'antd';
import domtoimage from 'dom-to-image';
import { PromisingPoliciesDataType } from '../Types';
import { UCWIcon, VAWGIcon, WESIcon } from './Icons';

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
  width: calc(33.33% - 7.334rem);
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
  const dataFilteredByVAWG = showVAWG ? dataFilteredBySearch : dataFilteredBySearch.filter((d) => d['Gender-sensitive dimension'] !== 'Violence against women');
  const dataFilteredByWEC = showWEC ? dataFilteredByVAWG : dataFilteredByVAWG.filter((d) => d['Gender-sensitive dimension'] !== "Women's economic security");
  const dataFilteredByUCW = showUCW ? dataFilteredByWEC : dataFilteredByWEC.filter((d) => d['Gender-sensitive dimension'] !== 'Unpaid care work');
  const dataFilteredByRegion = selectedRegion === 'All' ? dataFilteredByUCW : dataFilteredByUCW.filter((d) => d.Region === selectedRegion);
  const dataFilteredByCountry = selectedCountry === 'All' ? dataFilteredByRegion : dataFilteredByRegion.filter((d) => d.Country === selectedCountry);
  const [selectedData, setSelectedData] = useState<PromisingPoliciesDataType | undefined>(undefined);
  return (
    <>
      <div style={{
        backgroundColor: 'var(--gray-300)',
        textAlign: 'center',
        padding: 'var(--spacing-07) var(--spacing-05)',
        borderRadius: '0.25rem',
      }}
      >
        <h5 className='bold undp-typography margin-bottom-00'>
          Showing
          {' '}
          {dataFilteredByCountry.length}
          {' '}
          promising policies for gender equality
        </h5>
      </div>
      <div className='flex-div flex-space-between margin-top-05 margin-bottom-05 flex-wrap' style={{ gap: '2rem' }}>
        {
          dataFilteredByCountry.map((d, i) => (
            <CardEl key={i} onClick={() => { setSelectedData(d); }}>
              <div className='flex-div flex-vert-align-center margin-bottom-05 margint-top-00' style={{ gap: '0.5rem' }}>
                {
                  d['Gender-sensitive dimension'] === 'Violence against women'
                    ? <VAWGIcon size={64} />
                    : d['Gender-sensitive dimension'] === 'Unpaid care work'
                      ? <UCWIcon size={64} />
                      : <WESIcon size={64} />
                }
                <h6
                  className='undp-typography margin-bottom-00'
                  style={{
                    color: d['Gender-sensitive dimension'] === 'Violence against women'
                      ? '#590F6B'
                      : d['Gender-sensitive dimension'] === 'Unpaid care work'
                        ? '#0C9CD8'
                        : '#8CA645',
                  }}
                >
                  {d['Gender-sensitive dimension']}
                </h6>
              </div>
              <h5 className='undp-typography'>{d['Policy measure title']}</h5>
              <div className='undp-chip margin-bottom-05' style={{ borderRadius: '5rem' }}>
                <div className='flex-div flex-vert-align-center' style={{ gap: '0.5rem', margin: '0.5rem' }}>
                  <img src={d['Flag link']} alt={`${d.Country} flag icon`} style={{ height: '24px' }} />
                  {d.Country}
                </div>
              </div>
              <hr className='undp-style' style={{ opacity: 0.15 }} />
              <h6 className='undp-typography margin-top-07 margin-bottom-02'>Problem addressed</h6>
              <p className='undp-typography large-font'>
                {d['Problem addressed']}
              </p>
              <button type='button' className='undp-button button-tertiary button-arrow margin-top-07' style={{ padding: 0 }}>Learn More</button>
            </CardEl>
          ))
        }
      </div>
      <Modal
        className='undp-modal'
        onCancel={() => { setSelectedData(undefined); }}
        onOk={() => { setSelectedData(undefined); }}
        title={null}
        open={selectedData !== undefined}
        width='80%'
        style={{ maxWidth: '60rem' }}
      >
        <div id='policy-node' style={{ backgroundColor: 'var(--white)', padding: 'var(--spacing-07) var(--spacing-05)' }}>
          <h4 className='undp-typography'>
            {selectedData?.['Policy measure title']}
          </h4>
          <div className='flex-div flex-vert-align-center margin-bottom-05 margint-top-00 gap-07'>
            <div className='flex-div flex-vert-align-center margin-bottom-00 margint-top-00' style={{ gap: '0' }}>
              {
                selectedData?.['Gender-sensitive dimension'] === 'Violence against women'
                  ? <VAWGIcon size={64} />
                  : selectedData?.['Gender-sensitive dimension'] === 'Unpaid care work'
                    ? <UCWIcon size={64} />
                    : <WESIcon size={64} />
              }
              <h6
                className='undp-typography margin-bottom-00'
                style={{
                  color: selectedData?.['Gender-sensitive dimension'] === 'Violence against women'
                    ? '#590F6B'
                    : selectedData?.['Gender-sensitive dimension'] === 'Unpaid care work'
                      ? '#0C9CD8'
                      : '#8CA645',
                }}
              >
                {selectedData?.['Gender-sensitive dimension']}
              </h6>
            </div>
            <div className='undp-chip margin-bottom-00' style={{ borderRadius: '5rem' }}>
              <div className='flex-div flex-vert-align-center' style={{ gap: '0.5rem', margin: '0.5rem' }}>
                {selectedData?.Country}
              </div>
            </div>
          </div>
          <hr className='undp-style' style={{ opacity: 0.25 }} />
          <h5 className='undp-typography margin-top-09'>
            Description
          </h5>
          {
          selectedData?.['Policy measure description'].split('~').map((d, i) => <p className='undp-typography' key={i}>{d}</p>)
        }
          <h5 className='undp-typography margin-top-09'>
            Problem addressed
          </h5>
          <p className='undp-typography'>{selectedData?.['Problem addressed']}</p>
          <h5 className='undp-typography margin-top-09'>
            Who is implementing the policy?
          </h5>
          <p className='undp-typography'>{selectedData?.Who}</p>
          <h5 className='undp-typography margin-top-09'>
            Why is it promising?
          </h5>
          <ul style={{ listStyle: 'outside', paddingLeft: '1rem' }}>
            {
            selectedData?.['Why promising'].split('~').map((d, i) => <li key={i} style={{ marginBottom: 0, paddingLeft: 0 }}>{d}</li>)
          }
          </ul>
          <h5 className='undp-typography margin-top-09'>
            Potential challenges
          </h5>
          <ul style={{ listStyle: 'outside', paddingLeft: '1rem' }}>
            {
            selectedData?.['Potential challenges'].split('~').map((d, i) => <li key={i} style={{ marginBottom: 0, paddingLeft: 0 }}>{d}</li>)
          }
          </ul>
          <h5 className='undp-typography margin-top-09'>
            Learn more
          </h5>
          <ul style={{ listStyle: 'outside', paddingLeft: '1rem' }}>
            {
            selectedData?.['Further reading'].split('~').map((d, i) => (
              <li key={i} style={{ marginBottom: 0, paddingLeft: 0 }}>
                {
                  d.split('http').length === 1
                    ? d
                    : <a style={{ fontSize: '1rem' }} className='undp-style' href={`http${d.split('http')[1]}`} target='_blank' rel='noreferrer'>{d.split('http')[0]}</a>
                }
              </li>
            ))
          }
          </ul>
        </div>
        <div className='margin-top-07'>
          <button
            type='button'
            className='undp-button button-secondary button-arrow'
            onClick={() => {
              const node = document.getElementById('policy-node') as HTMLElement;
              domtoimage
                .toJpeg(node, { height: node.scrollHeight })
                .then((dataUrl: any) => {
                  const link = document.createElement('a');
                  link.download = 'policy.jpg';
                  link.href = dataUrl;
                  link.click();
                });
            }}
          >
            Download Policy
          </button>
        </div>
      </Modal>
    </>
  );
};
