import React from 'react';
import { render } from 'react-dom';
import { Row, Col, Input, Tabs } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Item from './compons/items/item';

const { TabPane } = Tabs;

const App = () => (
  <div>
    <Row>
      <Col span={3} />
      <Col span={18}>
        <Tabs defaultActiveKey="1" centered onTabScroll='top'>
          <TabPane tab="Search" key="1">
            <Input placeholder="Type to search..."/>
            <Item /> 
          </TabPane>
          <TabPane tab="Rated" key="2">
            <Input placeholder="Type to search..."/>
            <Item /> 
          </TabPane>
        </Tabs>
      </Col>
      <Col span={3} />
    </Row>
  </div>
)

render(<App/>, document.getElementById('root'));