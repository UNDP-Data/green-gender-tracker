import styled from 'styled-components';
import { useState } from 'react';
import { GenderResponse } from './GenderResponse';
import { TaskForce } from './TaskForce';
import { GreenLens } from './GreenLens';
import { Policies } from './Policies';

const ContainerEl = styled.div`
  display: flex;
  align-items: stretch;
  border: 1px solid var(--gray-300);
  @media (max-width: 960px) {
    display: inline;
  }  
`;

const El = styled.div`
  width: 20rem;
  height: 90vh;
  min-height: 46.25rem;
  overflow: auto;
  background-color: var(--gray-300);
  @media (max-width: 960px) {
    width: calc(100% - 4rem);
    max-width: 960px;
    border-right: 0px solid var(--gray-400);
    border-bottom: 1px solid var(--gray-400);
    padding-bottom: 0;
    height: auto;
    min-height: 0;
  }  
`;

const GarphEl = styled.div`
  width: calc(100% - 20rem);
  flex-grow: 1;
  overflow: auto;
  @media (min-width: 961px) {
    height: 90vh;
    min-height: 46.25rem;
  }
  @media (max-width: 960px) {
    width: 100%;
  }
`;

const NavButton = styled.button`
  margin: 0;
  border: 0;    
  text-align: left;
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
  background-color: var(--gray-200);
  cursor: pointer;
  &:hover{
    background-color: var(--white) !important;
    color: var(--blue-600) !important;
  }
`;

const App = () => {
  const [selectedTab, setSelectedTab] = useState<'GenderResponse' | 'Policies' | 'GreenLens' | 'TaskForce'>('GenderResponse');
  return (
    <>
      <div className='margin-top-07 undp-container'>
        <ContainerEl>
          <El>
            <NavButton
              className='undp-typography margin-bottom-00 margin-top-00'
              style={{
                padding: 'var(--spacing-05)', color: selectedTab === 'GenderResponse' ? 'var(--blue-600)' : 'var(--gray-700)', backgroundColor: selectedTab === 'GenderResponse' ? 'var(--white)' : 'var(--gray-300)', fontSize: '1.25rem', fontWeight: 700,
              }}
              onClick={() => { setSelectedTab('GenderResponse'); }}
            >
              Gender Response Tracker
            </NavButton>
            <NavButton className='undp-typography margin-bottom-00 margin-top-00' style={{ padding: 'var(--spacing-05) var(--spacing-05) var(--spacing-05) var(--spacing-08)', color: selectedTab === 'Policies' ? 'var(--blue-600)' : 'var(--gray-700)', backgroundColor: selectedTab === 'Policies' ? 'var(--white)' : 'var(--gray-300)' }} onClick={() => { setSelectedTab('Policies'); }}>
              Promising Policies for Gender Equality Catalogue
            </NavButton>
            <NavButton className='undp-typography margin-bottom-00 margin-top-00' style={{ padding: 'var(--spacing-05) var(--spacing-05) var(--spacing-05) var(--spacing-08)', color: selectedTab === 'GreenLens' ? 'var(--blue-600)' : 'var(--gray-700)', backgroundColor: selectedTab === 'GreenLens' ? 'var(--white)' : 'var(--gray-300)' }} onClick={() => { setSelectedTab('GreenLens'); }}>
              Gender-Green Lens
            </NavButton>
            <NavButton className='undp-typography margin-bottom-00 margin-top-00' style={{ padding: 'var(--spacing-05) var(--spacing-05) var(--spacing-05) var(--spacing-08)', color: selectedTab === 'TaskForce' ? 'var(--blue-600)' : 'var(--gray-700)', backgroundColor: selectedTab === 'TaskForce' ? 'var(--white)' : 'var(--gray-300)' }} onClick={() => { setSelectedTab('TaskForce'); }}>
              COVID-19 Task Forces
            </NavButton>
          </El>
          <GarphEl className='undp-scrollbar'>
            <div style={{ padding: '0 var(--spacing-07)' }}>
              {
                selectedTab === 'GenderResponse'
                  ? <GenderResponse />
                  : selectedTab === 'GreenLens'
                    ? <GreenLens />
                    : selectedTab === 'Policies'
                      ? <Policies />
                      : <TaskForce />
              }
            </div>
          </GarphEl>
        </ContainerEl>
      </div>
    </>
  );
};

export default App;
