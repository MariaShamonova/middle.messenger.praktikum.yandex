import sinon from 'sinon';
import { expect } from 'chai';
import Router from './Router';
import { BlockConstructable } from './Route';

describe('Router', () => {
  const originalBack = global.window.history.back;
  const originalForward = global.window.history.forward;

  before(() => {
    global.window.history.back = () => {
      if (typeof window.onpopstate === 'function') {
        window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
      }
    };

    global.window.history.forward = () => {
      if (typeof window.onpopstate === 'function') {
        window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
      }
    };
  });

  after(() => {
    global.window.history.back = originalBack;
    global.window.history.forward = originalForward;
  });

  const getContentFake = sinon.fake.returns(document.createElement('div'));
  const callback = sinon.stub();

  const BlockMock = class {
    getContent = getContentFake;

    hide = callback;

    show = callback;
  } as unknown as BlockConstructable;

  const pathname = '/';

  it('method use return Router instance', () => {
    const result = Router.use(pathname, 'AnyPage', BlockMock);

    expect(result)
      .to
      .eq(Router);
  });

  it('method back redirect on previous page in History API', () => {
    Router.use(pathname, 'AnyPage', BlockMock)
      .start();

    Router.back();

    expect(getContentFake.callCount)
      .to
      .eq(1);
  });

  it('method getRoute should instanmce Route by pathname', () => {
    const router = Router.use(pathname, 'AnyPage', BlockMock);
    const route = router.routes[0];
    expect(Router.getRoute(pathname))
      .to
      .eq(route);
  });

  it('method go push route in History API', async () => {
    const spy = sinon.spy(window.history, 'pushState');
    Router.use(pathname, 'AnyPage', BlockMock);

    await Router.go(pathname);

    expect(spy.called).to.eq(true);
  });
});
