import * as React from 'react';
import { shallow } from 'enzyme';
import { Body } from './body';

describe('common/components/panel/body tests', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange

    // Act
    const component = shallow(
      <Body>
        <h1>Test children component</h1>
      </Body>
    );

    // Assert
    expect(component).toMatchSnapshot();
  });
});
