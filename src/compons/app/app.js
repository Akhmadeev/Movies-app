import React, { Component } from 'react';
import { Row, Col, Input, Spin, Alert, Tabs, Pagination } from 'antd';
import { debounce } from 'lodash';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Items from '../items/item';
import Search from '../Search/search'

export default class App extends Component {

  state = { 
    searchData: null,
    page: 1
  }
  
  

  searchText = (value) => {
    const text = value.target.value;
    this.setState({
      searchData: text
    })
  }


  pageFunc = (value) => {
    this.setState({
      page: value
    })
  }

  render() {
    const { searchData, page } = this.state;
    const { TabPane } = Tabs;
    const debouncFunc = debounce(this.searchText, 800);

    return (
      <div>
        <Row justify="center">
          <Col md={{ span: 22 }} lg={{ span: 18 }}>
            <Tabs defaultActiveKey="1" centered onTabScroll='top'>
              <TabPane tab="Search" key="1">
                <Search searchText={debouncFunc}/>
                <Items pageProps={page} searchData={searchData}/>
                <Pagination defaultCurrent={1} onChange={el => this.pageFunc(el)} total={50}/>
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
    );
  }
}