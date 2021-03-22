import React, { useState } from 'react';
import { Row, Col, Tabs } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import ItemList from '../itemList/ItemList';
import Search from '../search/Search';
import Rated from '../rated/Rated';

const App = () => {
  const [searchData, setSearchData] = useState('man');
  const [active, setActive] = useState('search');

  const activeTab = (key) => {
    if (key === 'Rated') setActive('Rated');
  };

  const searchText = (value) => {
    const text = value.target.value;
    setSearchData(text);
  };

  const md = { span: 22 };
  const lg = {span: 18}

  const { TabPane } = Tabs;

  const debounce = (fn, debouncTime) => {
    let timeout;
    return function () {
      const fnCall = () => {
        fn.apply(this, arguments)
      }
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, debouncTime)
    }
  }

  return (
    <div>
      <Row justify="center">
        <Col md={md} lg={lg}>
          <Tabs
            defaultActiveKey="1"
            centered
            onTabScroll="top"
            onTabClick={(key) => activeTab(key)}
            className="tab_main"
          >
            <TabPane tab="Search" key="Search">
              <Search searchText={debounc(searchText, 800)} />
              <ItemList searchData={searchData} />
            </TabPane>
            <TabPane tab="Rated" key="Rated">
              <Rated setActive={setActive} active={active} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};
export default App;
