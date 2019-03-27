import * as React from 'react';
import { Input, Button } from '../../../../common/components/form';
import { Member } from '../viewModel';

interface Props {
  member: Member;
  onUpdateField: (field: string, value: any) => void;
  onSave: () => void;
}

export const Form: React.StatelessComponent<Props> = props => (
  <form role="form">
    <fieldset>
      <Input
        name="name"
        label="Name"
        onChange={props.onUpdateField}
        placeholder="Name"
        value={props.member.name}
      />
      <Input
        name="avatarUrl"
        label="Avatar"
        onChange={props.onUpdateField}
        placeholder="Avatar"
        value={props.member.avatarUrl}
      />
      <Button onClick={props.onSave} label="Save" />
    </fieldset>
  </form>
);
