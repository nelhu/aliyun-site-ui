import React from 'react';
import {connect} from 'react-redux';
import API from '@/services';

import('./style.postcss');

class NotFoundPage extends React.Component {
  state = {};

  onSubmit = () => {
    API.getUser({
      pwd: 'xxx',
      name: 'xxx'
    });
  };

  render() {
    return (
      <div className="page page-404">
        <Loading message="页面未找到" />
      </div>
    );
  }
}

export default connect(state => state, {})(NotFoundPage);
