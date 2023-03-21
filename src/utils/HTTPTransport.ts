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
  return `?${Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&')}`;
}

interface HeadersType {
  [key: string]: string;
}

interface OptionsType {
  method?: string,
  headers?: HeadersType
  data?: Record<string, any>
  timeout?: number
}

const API_URL = 'https://ya-praktikum.tech/api/v2';
export default class HTTPTransport {
  public endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = API_URL + endpoint;
  }

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
      method = '',
      headers = {},
      data = {},
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = timeout;
      xhr.withCredentials = true;

      if (method === METHODS.GET && Object.keys(data).length !== 0) {
        xhr.open(method, this.endpoint + url + queryStringify(data));
      } else {
        xhr.open(method, this.endpoint + url);
      }

      if (headers) {
        xhr.setRequestHeader('credentials', 'same-origin');
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, String(value));
        });
      }
      const handleLoad = () => {
        if (xhr.status === 401) {
          reject(new Error('Unauthorized user'));
        } else if (xhr.status === 200) {
          try {
            resolve(JSON.parse(xhr.response));
          } catch {
            resolve(xhr.response);
          }
        } else {
          reject(new Error(xhr.response));
        }
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
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
