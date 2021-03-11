import React, { useState } from 'react';
import { Row, Col, Tabs } from 'antd';
import { debounce } from 'lodash';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import ItemList from '../itemList/itemList';
import Search from '../Search/search';
import Rated from '../Rated/Rated';

const App = () => {
  const [searchData, setSearchData] = useState('man');
  const [active, setActive] = useState(true);

  const activeTab = (key) => {
    if (key === 'Rated1') setActive(true);
  };

  const searchText = (value) => {
    const text = value.target.value;
    setSearchData(text);
  };

  const { TabPane } = Tabs;
  const debouncFunc = debounce(searchText, 800);

  return (
    <div>
      <Row justify="center">
        <Col md={{ span: 22 }} lg={{ span: 18 }}>
          <Tabs
            defaultActiveKey="1"
            centered
            onTabScroll="top"
            onTabClick={(key) => activeTab(key)}
            className="tab_main"
          >
            <TabPane tab="Search" key="Search">
              <Search searchText={debouncFunc} />
              <ItemList searchData={searchData} />
            </TabPane>
            <TabPane tab="Rated" key="Rated1">
              <Rated setActive={setActive} active={active} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};
export default App;
