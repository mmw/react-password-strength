import React from 'react';
import {
  createRenderer,
  findRenderedDOMComponentWithClass,
  renderIntoDocument,
  Simulate,
} from 'react-addons-test-utils';

import PassStrength from '../src/index';

describe('ReactPasswordStrength', () => {
  const renderer = createRenderer();

  it('is rendered', () => {
    renderer.render(<PassStrength />);
    const result = renderer.getRenderOutput();
    const { children } = result.props;

    expect(result.type).toBe('div');

    expect(children[0].type).toBe('input');
    expect(children[1].props.className).toBe('ReactPasswordStrength-strength-bar');
    expect(children[2].props.className).toBe('ReactPasswordStrength-strength-desc');
  });

  it('passes inputProps to input elem', () => {
    const inputProps = {
      className: 'test',
      value: 'value-test', // should be rejected
    };

    renderer.render(<PassStrength inputProps={inputProps} />);
    const result = renderer.getRenderOutput();
    const { children } = result.props;

    expect(children[0].props.className).toBe('test');
    expect(children[0].props.value).not.toBe('value-test');
  });
});

describe('ReactPasswordStrength Events', () => {
  it('handle basic input', () => {
    const result = renderIntoDocument(<PassStrength />);
    let input = findRenderedDOMComponentWithClass(result, 'ReactPasswordStrength-input');

    input.value = '123';

    Simulate.change(input);

    expect(result.state.password).toBe('123');
    expect(result.state.score).toBe(0);
    expect(result.state.isValid).toBe(false);
  });

  it('handle strong passwords', () => {
    const scoreWords = ['not ok', 'not ok', 'not ok', 'not ok', 'ok'];
    const result = renderIntoDocument(<PassStrength scoreWords={scoreWords} />);
    const scoreDesc = findRenderedDOMComponentWithClass(result, 'ReactPasswordStrength-strength-desc');
    let input = findRenderedDOMComponentWithClass(result, 'ReactPasswordStrength-input');

    input.value = 'abcd1234ABCDxymv123';

    Simulate.change(input);

    expect(result.state.password).toBe('abcd1234ABCDxymv123');
    expect(result.state.score).toBe(4);
    expect(result.state.isValid).toBe(true);

    expect(scoreDesc.textContent).toBe('ok');
  });

  it('call changeCallback', () => {
    const callBack = jasmine.createSpy('spy');
    const result = renderIntoDocument(<PassStrength changeCallback={callBack} />);
    let input = findRenderedDOMComponentWithClass(result, 'ReactPasswordStrength-input');

    input.value = '123';

    Simulate.change(input);

    expect(callBack).toHaveBeenCalledWith({
      score: 0,
      isValid: false,
      password: '123',
    });
  });

  it('reset state on clear', () => {
    const result = renderIntoDocument(<PassStrength />);
    let input = findRenderedDOMComponentWithClass(result, 'ReactPasswordStrength-input');

    input.value = 'abcd1234ABCDxymv123';

    Simulate.change(input);

    expect(result.state.password).toBe('abcd1234ABCDxymv123');
    expect(result.state.score).toBe(4);
    expect(result.state.isValid).toBe(true);

    result.clear();

    expect(result.state.password).toBe('');
    expect(result.state.score).toBe(0);
    expect(result.state.isValid).toBe(false);
  });

  it('validate based on minScore and minLength', () => {
    const result = renderIntoDocument(<PassStrength minScore={0} minLength={3} />);
    let input = findRenderedDOMComponentWithClass(result, 'ReactPasswordStrength-input');

    input.value = '123';

    Simulate.change(input);

    expect(result.state.password).toBe('123');
    expect(result.state.score).toBe(0);
    expect(result.state.isValid).toBe(true);
  })
});
