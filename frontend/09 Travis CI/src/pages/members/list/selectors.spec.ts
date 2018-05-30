import { getMembers, getMembersVM } from './selectors';
import { State } from '../../reducers';
import * as mappers from './mappers';
import * as vm from './viewModel';

describe('pages/members/list/selectors specs', () => {
  describe('getMembers', () => {
    it('should return members from state', () => {
      // Arrange
      const state = {
        members: [
          {
            id: 1,
            login: 'login member 1',
            avatar_url: 'avatar member 1',
          },
        ],
      } as State;

      // Act
      const result = getMembers(state);

      // Assert
      expect(result).toEqual(state.members);
    });
  });

  describe('getMembersVM', () => {
    it('should return the expected mapped member list', () => {
      // Arrange
      const state = {
        members: [
          {
            id: 1,
            login: 'login member 1',
            avatar_url: 'avatar member 1',
          },
          {
            id: 2,
            login: 'login member 2',
            avatar_url: 'avatar member 2',
          },
          {
            id: 3,
            login: 'login member 3',
            avatar_url: 'avatar member 3',
          },
        ],
      } as State;
      const expectedMappedMemberList: vm.Member[] = [
        {
          id: 1,
          name: 'login member 1',
          avatarUrl: 'avatar member 1',
        },
        {
          id: 2,
          name: 'login member 2',
          avatarUrl: 'avatar member 2',
        },
        {
          id: 3,
          name: 'login member 3',
          avatarUrl: 'avatar member 3',
        },
      ];

      const mapMemberListModelToVMStub = jest.spyOn(mappers, 'mapMemberListModelToVM')
        .mockReturnValue(expectedMappedMemberList);

      // Act
      const result = getMembersVM(state);

      // Assert
      expect(mapMemberListModelToVMStub).toHaveBeenCalledWith(state.members);
      expect(result).toEqual(expectedMappedMemberList);
    });
  });
});
