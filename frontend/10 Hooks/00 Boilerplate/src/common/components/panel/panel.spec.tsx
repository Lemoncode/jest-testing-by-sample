import * as React from 'react';
import { shallow } from 'enzyme';
import { Panel } from './panel';

describe('commom/components/panel tests', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      title: 'test title',
    };

    // Act
    const component = shallow(
      <Panel {...props}>
        <h1>Test children component</h1>
      </Panel>
    );

    // Assert
    expect(component).toMatchSnapshot();
  });
});
