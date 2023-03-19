import HTTPTransport from '../http';

export default abstract class BaseAPI {
  public http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  public abstract create?(data?: unknown): Promise<unknown>;

  public abstract request?(data?: unknown): Promise<unknown>;

  public abstract update?(data: unknown): Promise<unknown>;

  public abstract delete?(data?: unknown): Promise<unknown>;
}
