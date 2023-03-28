import EventBus from '../../event-bus';

export enum WSTransportEvents {
  Connected = 'connected',
  Error = 'error',
  Message = 'message',
  Close = 'close',
}

export default class WSTransport extends EventBus {
  private socket: WebSocket | null = null;

  private pingInterval: number = 100000;

  constructor(private url: string) {
    super();
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }
    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    return new Promise<void>((resolve) => {
      this.socket?.addEventListener('open', () => {
        this.emit(WSTransportEvents.Connected);
        this.setupPing();
        return resolve();
      });
    });
  }

  public close() {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.close();
  }

  public setupPing() {
    const ping = setInterval(() => {
      this.send({ type: 'ping' });
    }, this.pingInterval);

    this.on(WSTransportEvents.Close, () => {
      clearInterval(ping);
    });
  }

  public subscribe(socket: WebSocket) {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }
    socket.addEventListener('message', (message) => {
      let data;
      try {
        data = JSON.parse(message.data);
      } catch {
        data = message.data;
      }

      this.emit(WSTransportEvents.Message, data);
    });
  }
}
