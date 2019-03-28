import * as React from 'react';
import { shallow } from 'enzyme';
import { Header } from './header';

describe('common/components/panel/header tests', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      title: 'test title',
    };

    // Act
    const component = shallow(
      <Header
        {...props}
      />
    );

    // Assert
    expect(component).toMatchSnapshot();
  });
});
