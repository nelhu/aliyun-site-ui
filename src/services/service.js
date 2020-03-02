import xFetch from 'superagent';
/**
 * API path prefix
 * TODO: restore before publish!!!
 * @constant
 * @type {string}
 * @default "/api"
 */
// const server = process.env.API_SERVER || '/api';

function resolveUrl(path) {
  const url = `/api${path}`;
  return url;
}

function handleError(res) {
  let data;
  let error = null;

  if (!res || !res.body) {
    return new Error('网络异常，请检查您的网络设置');
  }

  if (typeof res.body === 'object') {
    data = res.body;
  } else {
    try {
      data = JSON.parse(res.body);
    } catch (ex) {
      return new Error(res.statusCode === 500 ? '服务器异常，请稍后再试' : '网络异常，请稍后再试');
    }
  }

  error = new Error(data.message || '服务器异常，请稍后再试!');
  error.code = data.code;
  error.data = data.data;

  return error;
}

function api(fn) {
  return function(params) {
    let req = fn(params);

    let token = localStorage.getItem('token');

    if (token && token !== 'undefined') {
      req.set('user-token', token).query({
        _v: Date.now()
      });
    }

    return new Promise((res, rej) => {
      req.end((err, result) => {
        if (err || !result.body.success) {
          rej(handleError(result));
        } else {
          res(result.body.data);
        }
      });
    });
  };
}

export function request(method, url, data, options) {
  // eslint-disable-line max-params
  let req = xFetch(method, resolveUrl(url));

  if (options && typeof options === 'object') {
    for (let key in options) {
      if (key in options) {
        req.set(key, options[key]);
      }
    }
  }

  if (data) {
    if (method === 'GET') {
      req.query(data);
    } else {
      if (options && options.needQuery) {
        req.query(data);
      } else {
        req.send(data);
      }
    }
  }

  return req;
}

export default api(({method, url, data, options}) => {
  return request(method, url, data, options);
});
