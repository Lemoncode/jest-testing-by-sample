import * as deepFreeze from 'deep-freeze';
import { actionIds } from '../actions/actionIds';
import { membersReducer, MembersState } from './members';

describe('members/list/reducers/membersReducer tests', () => {
  it('should return initial state when passing undefined state and some action type', () => {
    // Arrange
    const state = undefined;
    const action = { type: 'some type' };

    // Act
    const nextState = membersReducer(state, action);

    // Assert
    expect(nextState).toEqual([]);
  });

  it('should return same state without mutate it when passing state and some action type', () => {
    // Arrange
    const state: MembersState = [
      { id: 1, name: 'test name', avatarUrl: 'test avatarUrl' },
    ];
    const action = { type: 'some type' };
    deepFreeze(state);

    // Act
    const nextState = membersReducer(state, action);

    // Assert
    expect(nextState).toEqual([
      { id: 1, name: 'test name', avatarUrl: 'test avatarUrl' },
    ]);
  });

  it(`should return updated state without mutate it
  when passing state, actionIds.UPDATE_MEMBERS action type and members payload`, () => {
      // Arrange
      const state: MembersState = [
        { id: 1, name: 'test name', avatarUrl: 'test avatarUrl' },
      ];

      const payload = [
        { id: 2, name: 'test name 2', avatarUrl: 'test avatarUrl 2' },
        { id: 3, name: 'test name 3', avatarUrl: 'test avatarUrl 3' },
      ];

      const action = {
        type: actionIds.UPDATE_MEMBERS,
        payload,
      };
      deepFreeze(state);

      // Act
      const nextState = membersReducer(state, action);

      // Assert
      expect(nextState).toEqual(payload);
    });
});
