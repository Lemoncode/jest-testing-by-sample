# 08 Reselect

In this sample we are going to testing selectors.

We will start from sample _07 Code Coverage_.

Summary steps:
 - Install `reselect`.
 - Create memoized selector for `members`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

Let's start adding `reselect` to our `package.json`:

```bash
npm install -S reselect
```

TypeScript definitions are included inside `reselect` so we don't need to install extra package from DefinitelyTyped (`@types`).

First of all we'll identify what selectors does really need `reselect`. Let's have a look at our containers:

- `pages/login/pageContainer.tsx` is using selectors directly. We could apply `reselect` but we don't gain anything from that since `mapStateToProps` is getting directly pointers to those objects from state.
- `pages/members/pageContainer.tsx` on the other hand is using a mapper to transform members list on every state change. It is a good candidate for a memoized selector because if there are multiple mounted containers requesting same mapped list the list could be computed once and be served by as many containers as needed.

Let's implement the required selector that gets member list from state:

#### `src/pages/members/list/selectors.ts`

```ts
import { State } from '../../reducers';
import * as model from '../../../rest-api/model';

export const getMembers = (state: State): model.Member[] => state.members;
```

Next we'll create the memoized selector using `createSelector` method from `reselect`:

#### `src/pages/members/list/selectors.ts`

```diff
+ import { createSelector, Selector } from 'reselect';
  import { State } from '../../reducers';
  import * as model from '../../../rest-api/model';
+ import * as vm from './viewModel';
+ import { mapMemberListModelToVM } from './mappers';

  export const getMembers = (state: State): model.Member[] => state.members;

+ export const getMembersVM = createSelector(
+   getMembers,
+   (members) => mapMemberListModelToVM(members),
+ );
```

Let's change the member's list container to implement this `getMembersVM` selector:

#### `src/pages/members/list/selectors.ts`

```diff
  ...
  import { State } from '../../reducers';
- import { mapMemberListModelToVM } from './mappers';
  import { fetchMembers } from './actions/fetchMembers';
  import { Member } from './viewModel';
  import { MemberListPage } from './page';
+ import { getMembersVM } from './selectors';

  const mapStateToProps = (state: State) => ({
-   members: mapMemberListModelToVM(state.members),
+   members: getMembersVM(state),
  });
  ...
```

It's time for unit testing this selector:

#### `src/pages/members/list/selectors.spec.ts`

```ts
import { getMembers, getMembersVM } from './selectors';
import { State } from '../../reducers';

describe('pages/members/list/selectors specs', () => {

});
```

Let's add tests for `getMembers` selector:

```diff
  describe('pages/members/list/selectors specs', () => {
+   describe('getMembers', () => {
+     it('should return members from state', () => {
+       // Arrange
+       const state = {
+         members: [
+           {
+             id: 1,
+             login: 'login member 1',
+             avatar_url: 'avatar member 1',
+           },
+         ],
+       } as State;
+
+       // Act
+       const result = getMembers(state);
+
+       // Assert
+       expect(result).toEqual(state.members);
+     });
+   });
  });
```

Only a test is enough since `state` will be provided by `connect` from Redux. Let's implement a test for our memoized selector:

```diff
    });
+   describe('getMembersVM', () => {
+     it('should return the expected mapped member list', () => {
+       // Arrange
+       const state = {
+         members: [
+           {
+             id: 1,
+             login: 'login member 1',
+             avatar_url: 'avatar member 1',
+           },
+           {
+             id: 2,
+             login: 'login member 2',
+             avatar_url: 'avatar member 2',
+           },
+           {
+             id: 3,
+             login: 'login member 3',
+             avatar_url: 'avatar member 3',
+           },
+         ],
+       } as State;
+       const expectedMappedMemberList: vm.Member[] = [
+         {
+           id: 1,
+           name: 'login member 1',
+           avatarUrl: 'avatar member 1',
+         },
+         {
+           id: 2,
+           name: 'login member 2',
+           avatarUrl: 'avatar member 2',
+         },
+         {
+           id: 3,
+           name: 'login member 3',
+           avatarUrl: 'avatar member 3',
+         },
+       ];
+
+       const mapMemberListModelToVMStub = jest.spyOn(mappers, 'mapMemberListModelToVM')
+         .mockReturnValue(expectedMappedMemberList);
+
+       // Act
+       const result = getMembersVM(state);
+
+       // Assert
+       expect(mapMemberListModelToVMStub).toHaveBeenCalledWith(state.members);
+       expect(result).toEqual(expectedMappedMemberList);
+     });
+   });
  });
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
