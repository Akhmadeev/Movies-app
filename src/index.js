import React from 'react';
import { render } from 'react-dom';
import { Row, Col, Input, Tabs } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Items from './compons/items/item';

const { TabPane } = Tabs;


const App = () => (
  <div>
    <Row gutter={[25, 25]}>
      <Col md={{ span: 1 }} lg={{ span: 3 }} />
      <Col md={{ span: 22 }} lg={{ span: 18 }}>
        <Tabs defaultActiveKey="1" centered onTabScroll='top'>
          <TabPane tab="Search" key="1">
            <Input placeholder="Type to search..."  style={{ marginBottom: 30 }} onChange={() => console.log()} allowClear='true'/>
            <Items /> 
          </TabPane>
          <TabPane tab="Rated" key="2">
            <Input placeholder="Type to search..." style={{ marginBottom: 30 }}/>
         
          </TabPane>
        </Tabs>
      </Col>
      <Col md={{ span: 1 }} lg={{ span: 3 }} />
    </Row>
  </div>
)

render(<App/>, document.getElementById('root'));