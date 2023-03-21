import WSTransport, { WSTransportEvents } from '../utils/WSTransport';
import Store, { MessageResponseType } from '../store/Store';
import isArray from '../helpers/types/isArray';

class MessagesController {
  private sockets: Map<number, WSTransport> = new Map();

  async connect(id: number, token: string) {
    const { user } = Store.getState();
    if (!user.data) {
      throw new Error('Unauthorized user');
    }

    const transport = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${user.data.id}/${id}/${token}`,
    );
    await transport.connect();

    this.sockets.set(id, transport);
    this.subscribe(transport, id);
    this.fetchOldMessage(id);
  }

  sendMessage(id: number, message: string) {
    const transport = this.sockets.get(id);
    if (!transport) {
      throw new Error('Transport is undefined');
    }
    transport.send({ type: 'message', content: message });
  }

  fetchOldMessage(id: number) {
    const transport = this.sockets.get(id);
    if (!transport) {
      throw new Error('Transport is undefined');
    }
    transport.send({ content: '0', type: 'get old' });
  }

  closeAll() {
    Array.from(this.sockets.values()).forEach((socket: WSTransport) => socket.close());
  }

  private static onMessage(id: number, messages: MessageResponseType | MessageResponseType[]) {
    const key = `messages.${id}.data`;

    if (isArray(messages)) {
      Store.set(key, messages);
      return;
    }

    if ((messages as MessageResponseType).type === 'ping') return;

    const oldMessage = Store.getState().messages[id].data;

    if (!oldMessage) {
      Store.set(key, [messages]);
    } else {
      Store.set(key, [...oldMessage, messages]);
    }
  }

  onClose(id: number) {
    this.sockets.delete(id);
  }

  private subscribe(transport: WSTransport, id: number) {
    transport.on(
      WSTransportEvents.Message,
      (messages: MessageResponseType |
      MessageResponseType[]) => MessagesController.onMessage(id, messages),
    );

    transport.on(WSTransportEvents.Close, () => this.onClose(id));
  }
}

const controller = new MessagesController();
export default controller;
