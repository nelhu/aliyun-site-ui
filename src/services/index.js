import {compile} from 'path-to-regexp';

import apis from '@/apis';
import xFetch from './service';

let apiCollection = {};

function pathRgxToUrl(path, data) {
  if (!data) return path;
  const toPath = compile(path);
  return toPath(data);
}

for (const key in apis) {
  if ({}.hasOwnProperty.call(apis, key)) {
    apiCollection[key] = data => {
      const api = apis[key];

      const params = {
        url: pathRgxToUrl(api.url, data),
        method: api.method,
        options: api.options,
        data
      };

      return xFetch(params);
    };
  }
}

export default apiCollection;
