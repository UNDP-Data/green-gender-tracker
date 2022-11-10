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
import { GreenLens } from './GreenLens';

const items = [
  {
    label: 'Gender-Green Lens',
    key: '1',
    children: <GreenLens />,
  },
  {
    label: 'Gender Response Tracker',
    key: '2',
    children: <GenderResponse />,
  },
  {
    label: 'COVID-19 Task Forces',
    key: '3',
    children: <TaskForce />,
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
