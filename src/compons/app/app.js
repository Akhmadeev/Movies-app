import React, { useState } from 'react';
import { Row, Col, Tabs, Pagination } from 'antd';
import { debounce } from 'lodash';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Item from '../items/item';
import Search from '../Search/search';
import Rated from '../Rated/Rated';

const App = () => {


  const [searchData, setSearchData] = useState('man');
  const [page, setPage] = useState(1);
  

  const searchText = (value) => {
    const text = value.target.value;
    setSearchData(text)
  }

  const pageFunc = (value) => {
    setPage(value)
  }

    const { TabPane } = Tabs;
    const debouncFunc = debounce(searchText, 800);

    return (
      <div>
        <Row justify="center">
          <Col md={{ span: 22 }} lg={{ span: 18 }}>
            <Tabs defaultActiveKey="1" centered onTabScroll="top">
              <TabPane tab="Search" key="1">
                <Search searchText={debouncFunc} />
                <Item pageProps={page} searchData={searchData} />
                <Pagination defaultCurrent={1} onChange={(el) => pageFunc(el)} total={50} />
              </TabPane>
              <TabPane tab="Rated" key="2">
                <Rated />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
}
export default App;