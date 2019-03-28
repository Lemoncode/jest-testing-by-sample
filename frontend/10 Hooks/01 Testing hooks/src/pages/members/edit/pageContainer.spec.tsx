import * as React from 'react';
import { shallow, mount } from 'enzyme';
import * as memberAPI from '../../../rest-api/api/member';
import * as model from '../../../rest-api/model';
import * as vm from './viewModel';
import * as mappers from './mappers';
import { history } from '../../../history';
import { MemberEditPageContainer } from './pageContainer';

describe('pages/members/edit/pageContainer tests', () => {
  it('should render as expected feeding required properties', () => {
    // Arrange
    const props: any = {
      match: {
        params: {
          name: 'test user name',
        },
      },
    };

    // Act
    const component = shallow(<MemberEditPageContainer {...props} />);

    // Assert
    expect(component).toMatchSnapshot();
  });

  it('should call to fetchMember on mount', () => {
    // Arrange
    const props: any = {
      match: {
        params: {
          name: 'test user name',
        },
      },
    };

    const mockMember: model.Member = {
      id: 1,
      login: 'testLogin',
      avatar_url: 'testAvatarUrl',
    };
    const fetchMemberStub = jest
      .spyOn(memberAPI, 'fetchMember')
      .mockResolvedValue(mockMember);

    // Act
    const component = mount(<MemberEditPageContainer {...props} />);

    // Assert
    expect(fetchMemberStub).toHaveBeenCalledWith(props.match.params.name);
  });

  it('should call to mapMemberModelToVM on mount', done => {
    // Arrange
    const props: any = {
      match: {
        params: {
          name: 'test user name',
        },
      },
    };

    const mockMember: model.Member = {
      id: 1,
      login: 'testLogin',
      avatar_url: 'testAvatarUrl',
    };
    const fetchMemberStub = jest
      .spyOn(memberAPI, 'fetchMember')
      .mockResolvedValue(mockMember);

    const mockVmMember: vm.Member = {
      id: 1,
      name: 'testName',
      avatarUrl: 'testAvatarUrl',
    };
    const mapperStub = jest
      .spyOn(mappers, 'mapMemberModelToVM')
      .mockReturnValue(mockVmMember);

    // Act
    const component = mount(<MemberEditPageContainer {...props} />);

    // Assert
    setImmediate(() => {
      expect(mapperStub).toHaveBeenCalledWith(mockMember);
      done();
    });
  });

  it('should update member when fire onUpdateField', () => {
    // Arrange
    const props: any = {
      match: {
        params: {
          name: 'test user name',
        },
      },
    };

    // Act
    const component = shallow(<MemberEditPageContainer {...props} />);

    component.prop('onUpdateField')('name', 'updated name');

    // Assert
    expect(component).toMatchSnapshot();
  });

  it('should call to history goBack when fire onSave', () => {
    // Arrange
    const props: any = {
      match: {
        params: {
          name: 'test user name',
        },
      },
    };

    const goBackStub = jest.spyOn(history, 'goBack')
    .mockImplementation(() => {});

    // Act
    const component = shallow(<MemberEditPageContainer {...props} />);

    component.prop('onSave')();

    // Assert
    expect(goBackStub).toHaveBeenCalled();
  });
});
