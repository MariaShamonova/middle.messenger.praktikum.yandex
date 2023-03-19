import HTTP from '../utils/HTTPTransport';
import BaseAPI from './BaseAPI';

const chatMessagesAPIInstance = new HTTP('api/v1/messages');

class MessagesAPI extends BaseAPI {
  request({ id }) {
    return chatMessagesAPIInstance.get(`/${id}`);
  }
}
