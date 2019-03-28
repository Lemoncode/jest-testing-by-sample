import * as React from 'react';
import { history } from '../../../../history';
import { Member } from '../viewModel';
const styles = require('./row.scss');

interface Props {
  member: Member;
}

const onNavigate = (props: Props) => () => {
  history.push(`/member/${props.member.name}`);
};

export const Row: React.StatelessComponent<Props> = props => (
  <tr className={styles.row} onClick={onNavigate(props)}>
    <td>
      <img src={props.member.avatarUrl} style={{ maxWidth: '10rem' }} />
    </td>
    <td>
      <span>{props.member.id}</span>
    </td>
    <td>
      <span>{props.member.name}</span>
    </td>
  </tr>
);
