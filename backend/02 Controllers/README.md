# 02 Controllers

In this sample we are going to testing controllers that belongs to API routes.

We will start from sample _01 Add config_.

Summary steps:
 - Remove sample spec.
 - Add login controller specs.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
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

- Adding `login controller` specs:

### ./src/routers/login/controller.spec.ts
```javascript
import { LoginController } from './controller';

describe('routers/login/controller tests', () => {
  describe('post', () => {

  });
});
```

- Should return 401 when login and password equals undefined:

### ./src/routers/login/controller.spec.ts
```diff
import { LoginController } from './controller';

describe('routers/login/controller tests', () => {
  describe('post', () => {

  });
});
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
