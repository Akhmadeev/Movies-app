import React from 'react';
import { Row, Col, Input, Spin, Alert, Tabs } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Items from '../items/item';
import Search from '../Search/search'

const { TabPane } = Tabs;

function search() {
  return "Harry"
};

const App = () => (

    <div>
    <Row justify="center">
      <Col md={{ span: 22 }} lg={{ span: 18 }}>
        <Tabs defaultActiveKey="1" centered onTabScroll='top'>
          <TabPane tab="Search" key="1">
            <Search/>
            <Items value={search}/> 
          </TabPane>
          <TabPane tab="Rated" key="2">
            <Input placeholder="Type to search..." style={{ marginBottom: 30 }}/>
            <Spin size="large" tip="В разработке...">
              <Alert
                message="Пока не знаю, что здесь должно быть"
                description="Further details about the context of this alert."
                type="info"/>
          </Spin>
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  </div>
  
)

export default App;