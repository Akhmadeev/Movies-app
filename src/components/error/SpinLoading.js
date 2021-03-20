import React from 'react';
import {  Spin, Alert } from 'antd';

const SpinLoading = () => (
  <Spin tip="Loading..." size="large">
    <Alert message="one secons please" description="Further details about the context of this alert." type="info" />
  </Spin>
);

export default SpinLoading;
