import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { mapMemberListModelToVM } from './mappers';
import { fetchMembers } from './actions/fetchMembers';
import { Member } from './viewModel';
import { MemberListPage } from './page';

const mapStateToProps = (state: State) => ({
  members: mapMemberListModelToVM(state.members),
});

const mapDispatchToProps = (dispatch) => ({
  fetchMembers: () => dispatch(fetchMembers()),
});

interface Props {
  members: Member[];
  fetchMembers: () => void;
}

class PageContainer extends React.PureComponent<Props, {}> {
  componentDidMount() {
    this.props.fetchMembers();
  }

  render() {
    return (
      <MemberListPage
        members={this.props.members}
      />
    );
  }
}

export const MemberListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContainer);
