import * as React from 'react';
import { shallow } from 'enzyme';
import { Input } from './input';

describe('common/components/form/input specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      name: 'test name',
      label: 'test label',
      value: 'test value',
      onChange: () => { },
    };

    // Act
    const component = shallow(
      <Input
        {...props}
      />
    );

    // Assert
    expect(component).toMatchSnapshot();
  });

  it('should render as expected when passing required and optional properties', () => {
    // Arrange
    const props = {
      name: 'test name',
      label: 'test label',
      value: 'test value',
      onChange: () => { },
      onBlur: () => { },
      error: 'test error',
      type: 'test type',
    };

    // Act
    const component = shallow(
      <Input
        {...props}
      />
    );

    // Assert
    expect(component).toMatchSnapshot();
  });

  it('should call to onChange prop when simulate input onChange', () => {
    // Arrange
    const props = {
      name: 'test name',
      label: 'test label',
      value: 'test value',
      onChange: jest.fn(),
      onBlur: () => { },
      error: 'test error',
      type: 'test type',
    };

    // Act
    const component = shallow(
      <Input
        {...props}
      />
    );

    component.find('input').simulate('change', {
      target: {
        name: 'test name',
        value: 'updated value',
      },
    });

    // Assert
    expect(props.onChange).toHaveBeenCalledWith('test name', 'updated value');
  });

  it('should call to onBlur prop when simulate input onBlur', () => {
    // Arrange
    const props = {
      name: 'test name',
      label: 'test label',
      value: 'test value',
      onChange: jest.fn(),
      onBlur: jest.fn(),
      error: 'test error',
      type: 'test type',
    };

    // Act
    const component = shallow(
      <Input
        {...props}
      />
    );

    component.find('input').simulate('blur');

    // Assert
    expect(props.onBlur).toHaveBeenCalled();
  });
});
