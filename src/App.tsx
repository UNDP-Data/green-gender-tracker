import {
  Tabs,
} from 'antd';
import { GenderResponse } from './GenderResponse';
import { TaskForce } from './TaskForce';
import { GreenLens } from './GreenLens';
import { Policies } from './Policies';

const items = [
  {
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ color: 'var(--blue-600)', marginRight: '0.5rem' }}>
          Gender Response Tracker
        </div>
        <div
          className='undp-chip-small undp-chip-blue'
          style={{
            fontWeight: 'normal', padding: '0.25rem 0.75rem', backgroundColor: 'var(--blue-100)', border: '1px solid var(--blue-600)', borderRadius: '2rem',
          }}
        >
          Primary
        </div>
      </div>
    ),
    key: '1',
    class: 'tab-primary',
    children: <GenderResponse />,
  },
  {
    label: (
      <div style={{ padding: '0.25rem 0' }}>
        Promising Policies for Gender Equality Catalogue
      </div>
    ),
    key: '4',
    children: <Policies />,
  },
  {
    label: (
      <div style={{ padding: '0.25rem 0' }}>
        Gender-Green Lens
      </div>
    ),
    key: '2',
    children: <GreenLens />,
  },
  {
    label: (
      <div style={{ padding: '0.25rem 0' }}>
        COVID-19 Task Forces
      </div>
    ),
    key: '3',
    children: <TaskForce />,
  },
];

const App = () => (
  <>
    <div className='margin-top-07 undp-container max-width'>
      <Tabs
        defaultActiveKey='1'
        className='undp-tabs'
        items={items}
      />
    </div>
  </>
);

export default App;
