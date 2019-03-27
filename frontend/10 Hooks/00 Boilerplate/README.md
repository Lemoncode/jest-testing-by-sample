# 10 Hooks

In this sample we are going to create components with hooks.

We will start from sample _09 Travis CI_.

Summary steps:
 - Implement members edit page.
 - Add tests to hooks components.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- First we need the basic structure to render `member edit page`:

### ./src/pages/members/edit/page.tsx

```javascript
import * as React from 'react';

export const MemberEditPage = () => <div>Member edit page</div>;


```

- Create container:

### ./src/pages/members/edit/pageContainer.tsx

```javascript
import * as React from 'react';
import { MemberEditPage } from './page';

export const MemberEditPageContainer = () => <MemberEditPage />;

```

- And the `barrel` files:

### ./src/pages/members/edit/index.ts

```javascript
export * from './pageContainer';

```

### ./src/pages/members/index.ts

```diff
export * from './list';
+ export * from './edit';

```

- Now we could add to routes and check if it works:

### ./src/common/constants/routes/index.tsx

```diff
export const routes = {
  default: '/',
  members: '/members',
+ member: '/member/:name',
};

```

### ./src/routes.tsx

```diff
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { routes } from './common/constants/routes';
import { App } from './app';
- import { LoginPageContainer, MemberListPageContainer } from './pages';
+ import { LoginPageContainer, MemberListPageContainer, MemberEditPageContainer } from './pages';

export const Routes = () => (
  <App>
    <Switch>
      <Route
        exact={true}
        path={routes.default}
        component={LoginPageContainer}
      />
      <Route path={routes.members} component={MemberListPageContainer} />
+     <Route path={routes.member} component={MemberEditPageContainer} />
    </Switch>
  </App>
);

```

- Add navigation from `member list`:

### ./src/pages/members/list/components/row.scss

```css
.row {
  &:hover {
    cursor: pointer;
  }
}

```

### ./src/pages/members/list/components/row.tsx

```diff
import * as React from 'react';
+ import { history } from '../../../../history';
import { Member } from '../viewModel';
+ const styles = require('./row.scss');

interface Props {
  member: Member;
}

+ const onNavigate = (props: Props) => () => {
+   history.push(`/member/${props.member.name}`);
+ };

export const Row: React.StatelessComponent<Props> = (props) => (
- <tr>
+ <tr className={styles.row} onClick={onNavigate(props)}>
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

```

- Request member data from api:

```diff
import { Member } from '../model/member';

- const baseUrl = 'https://api.github.com/orgs/lemoncode/members';
+ const fetchMemberListUrl = 'https://api.github.com/orgs/lemoncode/members';
+ const fetchMemberUrl = 'https://api.github.com/users/';

export const fetchMembers = (): Promise<Member[]> => (
- fetch(baseUrl)
+ fetch(fetchMemberListUrl)
    .then(extractPayload)
);

+ export const fetchMember = (name: string): Promise<Member> =>
+   fetch(`${fetchMemberUrl}${name}`).then(extractPayload);
...

```

- Adding viewModel:

### ./src/pages/members/edit/viewModel.ts

```javascript
export interface Member {
  id: number;
  name: string;
  avatarUrl: string;
}

export const createEmptyMember = (): Member => ({
  id: -1,
  name: '',
  avatarUrl: '',
});

```

- Adding mappers:

### ./src/pages/members/edit/mappers.ts

```javascript
import * as model from '../../../rest-api/model';
import * as vm from './viewModel';

export const mapMemberModelToVM = (member: model.Member): vm.Member => ({
  id: member.id,
  name: member.login,
  avatarUrl: member.avatar_url,
});

```

- Adding stateless components:

### ./src/pages/members/edit/components/form.tsx

```javascript
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

```

### ./src/pages/members/edit/components/index.ts

```javascript
export * from './form'

```

- Update page:

### ./src/pages/members/edit/page.tsx

```diff
import * as React from 'react';
+ import { Form } from './components';
+ import { Member } from './viewModel';

+ interface Props {
+   member: Member;
+   onUpdateField: (field: string, value: any) => void;
+   onSave: () => void;
+ }

- export const MemberEditPage = () => <div>Member edit page</div>;
+ export const MemberEditPage: React.StatelessComponent<Props> = ({
+   member,
+   onUpdateField,
+   onSave,
+ }) => <Form member={member} onUpdateField={onUpdateField} onSave={onSave} />;

```

- Finally, we need to update `page container`:

### ./src/pages/members/edit/pageContainer.tsx

```diff
import * as React from 'react';
+ import { RouteComponentProps } from 'react-router';
+ import { fetchMember } from '../../../rest-api/api/member';
+ import { history } from '../../../history';
+ import { mapMemberModelToVM } from './mappers';
+ import { createEmptyMember } from './viewModel';
import { MemberEditPage } from './page';

+ const useLoadMember = (name: string) => {
+   const [member, setMember] = React.useState(createEmptyMember());

+   React.useEffect(() => {
+     fetchMember(name).then(member => {
+       setMember(mapMemberModelToVM(member));
+     });
+   }, [name]);

+   return { member, setMember };
+ };

+ interface Params {
+   name: string;
+ }

- export const MemberEditPageContainer = () => <MemberEditPage />;
+ export const MemberEditPageContainer: React.StatelessComponent<
+   RouteComponentProps<Params>> = props => {
+   const { member, setMember } = useLoadMember(props.match.params.name);
+   return (
+     <MemberEditPage
+       member={member}
+       onUpdateField={(field, value) => {
+         setMember({ ...member, [field]: value });
+       }}
+       onSave={() => {
+         history.goBack();
+       }}
+     />
+   );
+ };

```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
