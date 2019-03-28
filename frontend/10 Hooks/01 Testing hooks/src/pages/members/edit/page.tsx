import * as React from 'react';
import { Form } from './components';
import { Member } from './viewModel';

interface Props {
  member: Member;
  onUpdateField: (field: string, value: any) => void;
  onSave: () => void;
}

export const MemberEditPage: React.StatelessComponent<Props> = ({
  member,
  onUpdateField,
  onSave,
}) => <Form member={member} onUpdateField={onUpdateField} onSave={onSave} />;
