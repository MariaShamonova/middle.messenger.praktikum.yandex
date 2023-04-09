import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { expect } from 'chai';
import type BaseBlock from './Block';

const eventBusMock = {
  on: sinon.stub(),
  emit: sinon.stub(),
};

const { default: Block } = proxyquire('./Block', {
  './EventBus': {
    default: class {
      emit = eventBusMock.emit;

      on = eventBusMock.on;
    },
  },
}) as { default: typeof BaseBlock };

describe('Block', () => {
  beforeEach(() => {
    eventBusMock.emit.reset();
    eventBusMock.on.reset();
  });

  it('should fire init event on initialization', () => {
    class ComponentMock extends Block {
    }

    // eslint-disable-next-line no-new
    new ComponentMock({}, 'div');

    expect(eventBusMock.emit.calledWith('init'))
      .to
      .eq(true);
  });

  it('should fire componentDidMount on component-did-mount dispatch', () => {
    // let isCalled = false;

    class ComponentMock extends Block {
    }

    const component = new ComponentMock({}, 'div');
    component.dispatchComponentDidMount();

    expect(eventBusMock.emit.calledWith('flow:component-did-mount'))
      .to
      .eq(true);
  });

  describe('method setProps', () => {
    it('should assign newProps', () => {
      const props = {
        name: 'Maria',
      };

      class ComponentMock extends Block {
      }

      const component = new ComponentMock(props, 'div');
      component.setProps({ name: 'Daria' });

      expect(component.props.name)
        .to
        .eq('Daria');
    });
  });
});
