import sinon from 'sinon';
import { expect } from 'chai';
import Router from './Router';
import { BlockConstructable } from './Route';

describe.only('Router', () => {
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

  beforeEach(() => {
    global.window.history.go(-(global.window.history.length - 1));
  });

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
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

  it('method getRoute should instance Route by pathname', () => {
    const router = Router.use(pathname, 'AnyPage', BlockMock);
    const route = router.routes[0];
    expect(Router.getRoute(pathname))
      .to
      .eq(route);
  });

  it('method go push route in History API', async () => {
    Router.use(pathname, 'AnyPage', BlockMock);
    await Router.go(pathname);

    expect(window.history.length)
      .to
      .eq(2);
  });
});
