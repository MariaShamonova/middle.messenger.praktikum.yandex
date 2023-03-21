import { v4 as makeUUID } from 'uuid';
import EventBus, { ListenerType } from '../../event-bus';

export type ChildrenPropsType = Record<string, Block | Block[]>;

export interface PropsType {
  [key: string]: unknown;
}

interface ElementListenerType {
  eventName: string;
  fn: (evn: Event) => void;
}

export interface EventType {
  events: ListenerType;
}

function extractStub(child: Block, content: DocumentFragment): void {
  const stub = content.querySelector(`[data-id="${child.id}"]`);

  if (stub) {
    stub.replaceWith(child.getContent());
  }
}

export default abstract class Block<P extends Record<string, any> = any> {
  private readonly _meta: { props: {}, tagName: string; };

  private readonly listeners: ElementListenerType[];

  public eventBus: () => EventBus;

  private readonly _id: string;

  private _element: HTMLElement;

  public props: P;

  public children: ChildrenPropsType;

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  /** JSDoc
   * @param {string} tagName
   * @param {Object} propsAndChildren
   *
   * @returns {void}
   */
  protected constructor(propsAndChildren: P, tagName: string) {
    const eventBus = new EventBus();
    this._element = document.createElement('div');
    this._id = makeUUID();

    const { children, props } = this._getChildren(propsAndChildren);

    this._meta = {
      tagName,
      props,
    };

    this.children = this._makePropsProxy(children) as ChildrenPropsType;
    this.props = this._makePropsProxy({ ...props, __id: this._id }) as P;

    this.listeners = [];

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.dispatchComponentDidMount = this.dispatchComponentDidMount.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  private _getChildren(propsAndChildren: P): { props: P, children: ChildrenPropsType } {
    const children: Record<string, Block | Block[]> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props: props as P };
  }

  protected _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  protected _createResources() {
    const { tagName } = this._meta;

    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected _componentDidUpdate<T>(oldProps: T, newProps: T): void {
    this.componentDidUpdate(oldProps, newProps);
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate<T>(oldProps: T, newProps: T): boolean {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    return oldProps !== newProps;
  }

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  setProps = (nextProps: unknown) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    return this._element;
  }

  get id(): string {
    return this._id;
  }

  compile(template: (context: any) => string, props: any) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = [];
        child.forEach((element: Block) => {
          propsAndStubs[key].push(`<div data-id="${element.id}"></div>`);
        });
      } else if (child) {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
      }
    });
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child: Block | Block[]) => {
      if (Array.isArray(child)) {
        child.forEach((element) => {
          extractStub(element, fragment.content);
        });
      } else if (child) {
        extractStub(child, fragment.content);
      }
    });

    return fragment.content;
  }

  private _render() {
    this._removeEvents();

    const fragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
  }

  protected _removeEvents() {
    this.listeners.forEach(({ eventName, fn }: {
      eventName: string,
      fn: (evn: Event) => void
    }) => {
      if (eventName === 'blur' || eventName === 'focus' || eventName === 'input') {
        const input = this.element.querySelector('input')!;
        input.removeEventListener(eventName, fn);
      } else {
        this._element.removeEventListener(eventName, fn);
      }
    });
  }

  protected _addEvents() {
    const events = this.props.events as EventType;

    if (events) {
      Object.entries(events).forEach(([eventName, event]) => {
        if (eventName === 'blur' || eventName === 'focus' || eventName === 'input') {
          const input = this.element.querySelector('input')!;
          input.addEventListener(eventName, event);
        } else {
          this._element.addEventListener(eventName, event);
          this.listeners.push({ eventName, fn: event });
        }
      });
    }
  }

  protected render(): DocumentFragment {
    return document.createDocumentFragment();
  }

  public getContent(): HTMLElement {
    return this.element;
  }

  protected _makePropsProxy(props: P | ChildrenPropsType) {
    const self = this;
    const proxyData = new Proxy(props, {
      get(target: ChildrenPropsType | PropsType, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value: unknown) {
        if (Array.from(prop)[0] === '_') {
          throw new Error('Нет доступа');
        }

        const oldValue = target[prop] ? target[prop] : '';
        const param = target;
        param[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, value);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
    return proxyData;
  }

  protected _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
    return element;
  }

  show() {
    this._element.style.display = '';
  }

  hide() {
    this._element.style.display = 'none';
  }
}

export type BlockType = Block;
