import {
  Tabs,
} from 'antd';
import 'antd/dist/antd.css';
import './style/style.css';
import './style/buttonStyle.css';
import './style/statCardStyle.css';
import './style/tabStyle.css';
import './style/checkboxStyle.css';
import './style/radioStyle.css';
import './style/selectStyle.css';
import './style/inputStyle.css';
import './style/modalStyle.css';
import { GenderResponse } from './GenderResponse';

const App = () => (
  <>
    <div className='container'>
      <Tabs
        defaultActiveKey='1'
        className='undp-tabs'
      >
        <Tabs.TabPane className='undp-tab-content' tab='COVID-19 Global Gender Response Tracker' key='1'>
          <GenderResponse />
        </Tabs.TabPane>
        <Tabs.TabPane className='undp-tab-content' tab='Country Profiles' key='2'>
          Content of Tab Pane 2
        </Tabs.TabPane>
        <Tabs.TabPane className='undp-tab-content' tab='Policy and Task Force Details' key='3'>
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>
    </div>
  </>
);

export default App;
