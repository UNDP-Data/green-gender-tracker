import {
  Tabs,
} from 'antd';
import './style/antd.css';
import './style/style.css';
import './style/buttonStyle.css';
import './style/statCardStyle.css';
import './style/tabStyle.css';
import './style/checkboxStyle.css';
import './style/radioStyle.css';
import './style/selectStyle.css';
import './style/inputStyle.css';
import './style/modalStyle.css';
import './style/tableStyle.css';
import './style/chipStyle.css';
import { GenderResponse } from './GenderResponse';
import { TaskForce } from './TaskForce';
import { CountryProfile } from './CountryProfile';

const items = [
  {
    label: 'Gender Sensitive Policies',
    key: '1',
    children: <GenderResponse />,
  },
  {
    label: 'COVID-19 Task Forces',
    key: '2',
    children: <TaskForce />,
  },
  {
    label: 'Country Profile',
    key: '3',
    children: <CountryProfile />,
  },
];

const App = () => (
  <>
    <div className='container margin-top-07 undp-container'>
      <Tabs
        defaultActiveKey='1'
        className='undp-tabs'
        items={items}
      />
    </div>
  </>
);

export default App;
