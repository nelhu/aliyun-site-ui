import React from 'react';
import {Route, Switch, routerRedux} from 'dva/router';
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
            component: () => import(/* index */ '@/routes/IndexPage')
          })}
          exact
        />

        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
