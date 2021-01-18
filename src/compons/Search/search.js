import React, { Component } from 'react';

import { Input } from 'antd';

export default class Search extends Component {

    

    onSearch() {
        
    }

render() {

    return (
        <Input placeholder="Type to search..."  style={{ marginBottom: 30 }} onChange={this.onSearch} allowClear='true' />
    )
}
}
