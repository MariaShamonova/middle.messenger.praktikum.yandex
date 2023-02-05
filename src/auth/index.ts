const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

interface DataType {
  [key: string]: unknown;
}

function queryStringify(data: DataType) {
  return `?${Object.entries(data).map(([key, value]) => {
    console.log(key, value);
    return `${key}=${value}`;
  }).join('&')}`;
}

interface HeadersType {
  [key: string]: string;
}

interface OptionsType {
  method: string,
  headers: HeadersType
  data: DataType
  timeout: number
}

export default class HTTPTransport {
  get = (url: string, options: OptionsType) => this.request(url, {
    ...options,
    method: METHODS.GET,
  }, options.timeout);

  put = (url: string, options: OptionsType) => this.request(url, {
    ...options,
    method: METHODS.PUT,
  }, options.timeout);

  post = (url: string, options: OptionsType) => this.request(url, {
    ...options,
    method: METHODS.POST,
  }, options.timeout);

  delete = (url: string, options: OptionsType) => this.request(url, {
    ...options,
    method: METHODS.DELETE,
  }, options.timeout);

  // PUT, POST, DELETE

  request = (url: string, options: OptionsType, timeout: number = 5000) => {
    const {
      method,
      headers = {},
      data = {},
    }: {
      method: string,
      headers: HeadersType,
      data: DataType
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = timeout;

      if (method === METHODS.GET && Object.keys(data).length !== 0) {
        xhr.open(method, url + queryStringify(data));
      } else {
        xhr.open(method, url);
      }

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, String(value));
        });
      }
      const handleLoad = () => {
        resolve(xhr);
      };

      const handleError = () => {
        throw new Error('Ошибка загрузки!');
      };

      const handleTimeout = () => {
        reject();
      };

      xhr.onabort = handleError;
      xhr.onerror = handleError;
      xhr.ontimeout = handleTimeout;
      xhr.onload = handleLoad;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
