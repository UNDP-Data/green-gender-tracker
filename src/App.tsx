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
import './style/tableStyle.css';
import { GenderResponse } from './GenderResponse';
import { TaskForce } from './TaskForce';

const App = () => (
  <>
    <div className='container'>
      <Tabs
        defaultActiveKey='2'
        className='undp-tabs'
      >
        <Tabs.TabPane className='undp-tab-content' tab='Gender Sensitive Policy' key='1'>
          <GenderResponse />
        </Tabs.TabPane>
        <Tabs.TabPane className='undp-tab-content' tab='COVID-19 Task Force' key='2'>
          <TaskForce />
        </Tabs.TabPane>
        <Tabs.TabPane className='undp-tab-content' tab='Policy and Task Force Details' key='3'>
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>
    </div>
  </>
);

export default App;
