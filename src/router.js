/* eslint-disable no-unused-vars */
import React from 'react';
import {Switch, Route, routerRedux} from 'dva/router';
import dynamic from 'dva/dynamic';

import PageNotFound from '@/routes/NotFoundPage';

const Router = routerRedux.ConnectedRouter;

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/"
          component={dynamic({
            component: () => import('@/routes/UploadPage')
          })}
          exact
        />
        <Route
          path="/upload"
          component={dynamic({
            component: () => import('@/routes/UploadPage')
          })}
          exact
        />

        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
