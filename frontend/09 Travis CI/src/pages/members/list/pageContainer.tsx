import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { fetchMembers } from './actions/fetchMembers';
import { Member } from './viewModel';
import { MemberListPage } from './page';
import { getMembersVM } from './selectors';

const mapStateToProps = (state: State) => ({
  members: getMembersVM(state),
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
