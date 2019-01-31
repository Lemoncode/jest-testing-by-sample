import * as React from 'react';
import { shallow } from 'enzyme';
import { Button } from './button';

describe('common/components/form/button specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      label: 'test label',
      onClick: () => { },
    };

    // Act
    const component = shallow(
      <Button
        {...props}
      />
    );

    // Assert
    expect(component).toMatchSnapshot();
  });

  it('should render as expected when passing required and optional properties', () => {
    // Arrange
    const props = {
      label: 'test label',
      onClick: () => { },
      type: 'test type',
    };

    // Act
    const component = shallow(
      <Button
        {...props}
      />
    );

    // Assert
    expect(component).toMatchSnapshot();
  });

  it('should call onClick prop when simulate button click', () => {
    // Arrange
    const props = {
      label: 'test label',
      onClick: jest.fn(),
      type: 'test type',
    };

    // Act
    const component = shallow(
      <Button
        {...props}
      />
    );

    const preventDefaultSpy = jest.fn();
    component.simulate('click', {
      preventDefault: preventDefaultSpy,
    });

    // Assert
    expect(props.onClick).toHaveBeenCalled();
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
