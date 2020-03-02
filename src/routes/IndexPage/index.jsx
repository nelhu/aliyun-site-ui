import React from 'react';
import { connect } from 'dva';
import { compose } from 'redux';

import styles from './style.css';

function Page() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>火花思维 Dva 脚手架</h1>
    </div>
  );
}

Page.propTypes = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({dispatch});

const enhances = compose(
  connect(mapStateToProps, mapDispatchToProps)
);

const Index = enhances(Page);

export default Index;
