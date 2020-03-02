export const serializeArray = (name, valueArr) => {
  const newName = `${name}=`;
  const res = [];
  for (let i = 0; i < valueArr.length; i++) {
    if (valueArr[i] !== '') {
      res.push(newName + encodeURIComponent(valueArr[i]));
    }
  }
  return res.join('&');
};

export const serializeQuery = param => {
  const p = [];
  Object.keys(param).forEach(k => {
    const v = param[k];
    if (v !== '') {
      p.push(v instanceof Array ? serializeArray(k, v) : `${k}=${encodeURIComponent(v)}`);
    }
  });
  return p.join('&');
};

const curryMethod = type => {
  return (url, loading, options) => {
    return {
      url: url,
      method: type,
      options: options,
      loading: loading || false
    };
  };
};

export const POST = curryMethod('POST');
export const GET = curryMethod('GET');
export const PUT = curryMethod('PUT');
export const DELETE = curryMethod('DELETE');
