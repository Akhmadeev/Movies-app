import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

export default class Search extends Component {

  
    componentDidMount() {
    }

    render() {

    const {searchText} = this.props;

    return (
        <Input placeholder="Type to search..."  style={{ marginBottom: 30 }} onChange={elm => searchText(elm)} allowClear='true' />
    )
}
}
Search.defaultProps = {
    searchText: () => {}
  }
  
  Search.propTypes = {
    searchText: PropTypes.func
  }