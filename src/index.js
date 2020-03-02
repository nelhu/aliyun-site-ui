import dva from 'dva';
import {createBrowserHistory} from 'history';
import createLoading from 'dva-loading';

// relative imports
import './assets/style/index.less';

import * as models from './models';
import router from './router';

export const browserHistory = createBrowserHistory();

// 1. Initialize
export const app = dva({
  history: browserHistory,
  initialState: {}
});

window.g_history = browserHistory;
window.g_app = app;

// 2. Plugins
app.use(createLoading());

// 3. Model
for (const i in models) {
  if (i in models) {
    const model = models[i];
    app.model(model);
  }
}

// 4. Router
app.router(router);

// 5. Start
app.start('#root');

// 6. Things to be done after app start
// 持久化store

// 7.high definition

// 8. react perf
if (process.env.NODE_ENV === 'development') {
  // do some perf thing
}
