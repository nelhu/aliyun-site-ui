import React from 'react';
import {connect} from 'dva';
import {compose} from 'redux';
import {Button} from 'antd';

import styles from './style.css';

function Page() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>main page</h1>
      <Button type="primary" ghost>
        start
      </Button>
    </div>
  );
}

Page.propTypes = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({dispatch});

const enhances = compose(connect(mapStateToProps, mapDispatchToProps));

const Index = enhances(Page);

export default Index;
