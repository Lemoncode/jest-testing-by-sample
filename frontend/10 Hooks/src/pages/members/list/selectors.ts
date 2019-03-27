import { createSelector, Selector } from 'reselect';
import { State } from '../../reducers';
import * as model from '../../../rest-api/model';
import * as vm from './viewModel';
import { mapMemberListModelToVM } from './mappers';

export const getMembers = (state: State): model.Member[] => state.members;

export const getMembersVM = createSelector(
  getMembers,
  (members) => mapMemberListModelToVM(members)
);
