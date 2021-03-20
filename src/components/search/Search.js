import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const Search = ({ searchText }) => {
  if (searchText) {
    return (
      <Input
        placeholder="Type to search..."
        style={{ marginBottom: 30 }}
        onChange={(elm) => searchText(elm)}
        allowClear="true"
      />
    );
  }
  return (
    <Input
      placeholder="Type to search..."
      style={{ marginBottom: 30 }}
      onChange={(elm) => searchText(elm)}
      allowClear="true"
    />
  );
 
};
export default Search;

Search.defaultProps = {
  searchText: () => {},
};

Search.propTypes = {
  searchText: PropTypes.func,
};
