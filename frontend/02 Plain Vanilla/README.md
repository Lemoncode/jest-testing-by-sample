# 02 Plain Vanilla

In this sample we are going to testing Plain Vanilla JavaScript files.

We will start from sample _01 Add config_.

Summary steps:
 - Remove sample spec.
 - Add login mappers specs.
 - Add login validations specs.
 - Add member list mappers specs.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install

```

- Exec tests in watch mode:

```bash
npm run test:watch

```

- Remove sample spec created on previous sample:

### ./src/sample.spec.ts
```diff
- describe('Sample tests', () => {
-   it('should pass spec', () => {
-     // Arrange

-     // Act

-     // Assert
-     expect(true).toBeTruthy();
-   });

-   it('should fail spec', () => {
-     // Arrange

-     // Act

-     // Assert
-     expect(false).toBeTruthy();
-   });
- });

```

- Add `login mappers` specs:

### ./src/pages/login/mappers.spec.ts
```javascript
import { mapLoginEntityVMToModel } from './mappers';

describe('pages/login/mappers specs', () => {
  describe('mapLoginEntityVMToModel', () => {

  });
});

```

- Add spec passing `undefined` value:

### ./src/pages/login/mappers.spec.ts
```diff
+ import * as model from '../../rest-api/model';
import { mapLoginEntityVMToModel } from './mappers';

describe('pages/login/mappers specs', () => {
  describe('mapLoginEntityVMToModel', () => {
+   it('should return null when passing loginEntity equals undefined', () => {
+     // Arrange
+     const loginEntity: vm.LoginEntity = undefined;

+     // Act
+     const result = mapLoginEntityVMToModel(loginEntity);

+     // Assert
+     expect(result).toBeNull();
+   });
  });
});

```

- Previous spec fail because we are not protecting against undefined value, so we have to refactor the implementation:

### ./src/pages/login/mappers.ts
```diff
import * as model from '../../rest-api/model';
import * as vm from './viewModel';

- export const mapLoginEntityVMToModel = (loginEntity: vm.LoginEntity): model.LoginEntity => ({
+ export const mapLoginEntityVMToModel = (loginEntity: vm.LoginEntity): model.LoginEntity => (
+   Boolean(loginEntity) ?
+     {
        ...loginEntity,
+     } :
+     null
- });
+ );

```

- Add spec passing `null` value:

### ./src/pages/login/mappers.spec.ts
```diff
...

+   it('should return null when passing loginEntity equals null', () => {
+     // Arrange
+     const loginEntity: vm.LoginEntity = null;

+     // Act
+     const result = mapLoginEntityVMToModel(loginEntity);

+     // Assert
+     expect(result).toBeNull();
+   });
  });
});

```

- Add spec passing `empty` values:

### ./src/pages/login/mappers.spec.ts
```diff
...

+   it('should return same values when passing loginEntity equals empty values', () => {
+     // Arrange
+     const loginEntity: vm.LoginEntity = {
+       login: '',
+       password: '',
+     };

+     // Act
+     const result = mapLoginEntityVMToModel(loginEntity);

+     // Assert
+     expect(result).toEqual({
+       login: '',
+       password: '',
+     });
+   });
  });
});

```

- Add spec passing `values`:

### ./src/pages/login/mappers.spec.ts
```diff
...

+   it('should return same values when passing loginEntity with values', () => {
+     // Arrange
+     const loginEntity: vm.LoginEntity = {
+       login: 'test login',
+       password: 'test password',
+     };

+     // Act
+     const result = mapLoginEntityVMToModel(loginEntity);

+     // Assert
+     expect(result).toEqual({
+       login: loginEntity.login,
+       password: loginEntity.password,
+     });
+   });
  });
});

```

- It looks like that we finish with this mapper. Looking throught the app, we found `members mappers`:

### ./src/pages/members/list/mappers.spec.ts
```javascript
import { mapMemberListModelToVM } from './mappers';

describe('pages/members/list/mappers specs', () => {
  describe('mapMemberListModelToVM', () => {

  });
});

```

- Add spec passing `undefined` value:

### ./src/pages/members/list/mappers.spec.ts
```diff
+ import * as model from '../../../rest-api/model';
import { mapMemberListModelToVM } from './mappers';

describe('pages/members/list/mappers specs', () => {
  describe('mapMemberListModelToVM', () => {
+   it('should return empty array when passing members equals undefined', () => {
+     // Arrange
+     const members: model.Member[] = undefined;

+     // Act
+     const result = mapMemberListModelToVM(members);

+     // Assert
+     expect(result).toEqual([]);
+   });
  });
});

```

- Previous spec fail because we are not protecting against undefined value, so we have to refactor the implementation:

### ./src/pages/members/list/mappers.ts
```diff
import * as model from '../../../rest-api/model';
import * as vm from './viewModel';

export const mapMemberListModelToVM = (members: model.Member[]): vm.Member[] => (
+ Array.isArray(members) ?
    members.map(mapMemberModelToVM) :
+   []
);

const mapMemberModelToVM = (member: model.Member): vm.Member => ({
  id: member.id,
  name: member.login,
  avatarUrl: member.avatar_url,
});

```

- Add spec passing `null` value:

### ./src/pages/members/list/mappers.spec.ts
```diff
...
+   it('should return empty array when passing members equals null', () => {
+     // Arrange
+     const members: model.Member[] = null;

+     // Act
+     const result = mapMemberListModelToVM(members);

+     // Assert
+     expect(result).toEqual([]);
+   });
  });
});

```

- Add spec passing `empty array` value:

### ./src/pages/members/list/mappers.spec.ts
```diff
...
+   it('should return empty array when passing members equals emtpy array', () => {
+     // Arrange
+     const members: model.Member[] = [];

+     // Act
+     const result = mapMemberListModelToVM(members);

+     // Assert
+     expect(result).toEqual([]);
+   });
  });
});

```

- Add spec passing `one item`:

### ./src/pages/members/list/mappers.spec.ts
```diff
+ import * as vm from './viewModel';
...
+   it('should return array with one item when passing members equals array with one item', () => {
+     // Arrange
+     const members: model.Member[] = [
+       {
+         id: 1,
+         login: 'test login',
+         avatar_url: 'test avatar_url',
+       },
+     ];

+     // Act
+     const result = mapMemberListModelToVM(members);

+     // Assert
+     const expectedResult: vm.Member[] = [
+       {
+         id: 1,
+         name: 'test login',
+         avatarUrl: 'test avatar_url',
+       },
+     ];
+     expect(result).toEqual(expectedResult);
+   });
  });
});

```

- Add spec passing `two items`:

### ./src/pages/members/list/mappers.spec.ts
```diff
+ import * as vm from './viewModel';
...
+   it('should return array with two items when passing members equals array with two items', () => {
+     // Arrange
+     const members: model.Member[] = [
+       {
+         id: 1,
+         login: 'test login 1',
+         avatar_url: 'test avatar_url 1',
+       },
+       {
+         id: 2,
+         login: 'test login 2',
+         avatar_url: 'test avatar_url 2',
+       },
+     ];

+     // Act
+     const result = mapMemberListModelToVM(members);

+     // Assert
+     const expectedResult: vm.Member[] = [
+       {
+         id: 1,
+         name: 'test login 1',
+         avatarUrl: 'test avatar_url 1',
+       },
+       {
+         id: 2,
+         name: 'test login 2',
+         avatarUrl: 'test avatar_url 2',
+       },
+     ];
+     expect(result).toEqual(expectedResult);
+   });
  });
});

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
