import sinon from 'sinon';
import { expect } from 'chai';
import HTTPTransport from './HTTPTransport';

describe('HTTPTransport class', () => {
  let requests: sinon.SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    const XHR = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = XHR;

    XHR.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });

  afterEach(() => {
    requests = [];
  });

  describe('get method', () => {
    it('should make GET request', () => {
      const transport = new HTTPTransport('/');
      transport.get('', {});

      const request = requests[0];
      expect(request.method.toUpperCase())
        .to
        .eq('GET');
    });

  });

  describe('put method', () => {
    it('should make PUT request', () => {
      const transport = new HTTPTransport('/');
      transport.put('', {});

      const request = requests[0];
      expect(request.method.toUpperCase())
        .to
        .eq('PUT');
    });
  });

  describe('delete method', () => {
    it('should make DELETE request', () => {
      const transport = new HTTPTransport('/');
      transport.delete('', {});

      const request = requests[0];
      expect(request.method.toUpperCase())
        .to
        .eq('DELETE');
    });
  });

  describe('post method', () => {
    it('should make POST request', () => {
      const transport = new HTTPTransport('/');
      transport.post('', {});

      const request = requests[0];
      expect(request.method.toUpperCase())
        .to
        .eq('POST');
    });

  });

  describe('request method', () => {
    const data = { title: 'any string' };

    it('should call GET request without params', () => {
      const transport = new HTTPTransport('/');
      transport.get('', { data });

      const request = requests[0];

      expect(request.requestBody)
        .to
        .eq(undefined);
    });

    it('should call method with body', () => {

      const transport = new HTTPTransport('/');
      transport.post('', { data });

      const request = requests[0];

      expect(request.requestBody)
        .to
        .eq(JSON.stringify(data));
    });

    it('should call method with Form data', () => {
      const formData = new FormData();
      const transport = new HTTPTransport('/');
      transport.post('', { data: formData });

      const request = requests[0];

      expect(request.requestBody)
        .to
        .eq(formData);
    });
  });

  // Проверить, что отправляются нужные данные
  // Проверить, что отправляются запросы POST, PUT , DELETE
});
