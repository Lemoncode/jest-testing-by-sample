import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { fetchMember } from '../../../rest-api/api/member';
import { history } from '../../../history';
import { mapMemberModelToVM } from './mappers';
import { createEmptyMember } from './viewModel';
import { MemberEditPage } from './page';

const useLoadMember = (name: string) => {
  const [member, setMember] = React.useState(createEmptyMember());

  React.useEffect(() => {
    fetchMember(name).then(modelMember => {
      setMember(mapMemberModelToVM(modelMember));
    });
  }, [name]);

  return { member, setMember };
};

interface Params {
  name: string;
}

export const MemberEditPageContainer: React.StatelessComponent<
  RouteComponentProps<Params>
> = props => {
  const { member, setMember } = useLoadMember(props.match.params.name);
  return (
    <MemberEditPage
      member={member}
      onUpdateField={(field, value) => {
        setMember({ ...member, [field]: value });
      }}
      onSave={() => {
        history.goBack();
      }}
    />
  );
};
