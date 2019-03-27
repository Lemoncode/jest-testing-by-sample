import * as React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { State } from '../../reducers';
import * as mappers from './mappers';
import * as fetchMemberActions from './actions/fetchMembers';
import { MemberListPageContainer } from './pageContainer';

const getMockStore = configureStore();

describe('pages/members/list/pageContainer tests', () => {
  it('should render as expected passing state', () => {
    // Arrange
    const state = {
      members: [
        {
          id: 1,
          login: 'test login',
          avatar_url: 'test avatar_url',
        },
      ],
    } as State;

    const store = getMockStore(state);

    // Act
    const component = shallow(
      <MemberListPageContainer
      />,
      {
        context: { store },
      }
    );

    // Assert
    expect(component).toMatchSnapshot();
  });

  it('should call to mapMemberListModelToVM when render component', () => {
    // Arrange
    const state = {
      members: [
        {
          id: 1,
          login: 'test login',
          avatar_url: 'test avatar_url',
        },
      ],
    } as State;

    const store = getMockStore(state);

    const mapMemberListModelToVMStub = jest.spyOn(mappers, 'mapMemberListModelToVM')
      .mockReturnValue([
        { id: 1, name: 'test login', avatarUrl: 'tes avatar_url' },
      ]);

    // Act
    const component = shallow(
      <MemberListPageContainer
      />,
      {
        context: { store },
      }
    );

    // Assert
    expect(mapMemberListModelToVMStub).toHaveBeenCalledWith(state.members);
  });

  it('should call to fetchMembers action creator when render component', () => {
    // Arrange
    const state = {
      members: [
        {
          id: 1,
          login: 'test login',
          avatar_url: 'test avatar_url',
        },
      ],
    } as State;

    const store = getMockStore(state);

    const fetchMembersStub = jest.spyOn(fetchMemberActions, 'fetchMembers')
      .mockImplementation(() => ({
        type: 'test action type',
      }));

    // Act
    const component = mount(
      <MemberListPageContainer
      />,
      {
        context: { store },
      }
    );

    // Assert
    expect(fetchMembersStub).toHaveBeenCalled();
  });
});
