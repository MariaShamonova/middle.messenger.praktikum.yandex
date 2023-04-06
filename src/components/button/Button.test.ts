import Button from './Button';
import sinon from 'sinon';
import { assert } from 'chai';

describe('Button Component', () => {
  it('should render', () => {
    new Button({});
  });

  it('should callback on click button', () => {
    const callback = sinon.fake();
    const button = new Button({
      text: 'Click on me',
      events: { click: callback },
    });

    button.element.click();

    assert(callback.called);
  });
});
