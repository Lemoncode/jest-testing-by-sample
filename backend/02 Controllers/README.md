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
+ import { Request, Response } from 'express';
import { LoginController } from './controller';

describe('routers/login/controller tests', () => {
  describe('post', () => {
+   it('should send 401 status code when passing login and password equals undefined', () => {
+     // Arrange
+     const login = undefined;
+     const password = undefined;

+     const req: Partial<Request> = {
+       body: {
+         login,
+         password,
+       },
+     };

+     const res: Partial<Response> = {
+       sendStatus: jest.fn(),
+     };

+     const controller = LoginController();

+     // Act
+     controller.post(req as Request, res as Response);

+     // Assert
+     expect(res.sendStatus).toHaveBeenCalledWith(401);
+   });
  });
});
```

- Should return 401 when login and password equals null:

### ./src/routers/login/controller.spec.ts
```diff
...
+   it('should send 401 status code when passing login and password equals null', () => {
+     // Arrange
+     const login = null;
+     const password = null;

+     const req: Partial<Request> = {
+       body: {
+         login,
+         password,
+       },
+     };

+     const res: Partial<Response> = {
+       sendStatus: jest.fn(),
+     };

+     const controller = LoginController();

+     // Act
+     controller.post(req as Request, res as Response);

+     // Assert
+     expect(res.sendStatus).toHaveBeenCalledWith(401);
+   });
...
```

- Should return 401 when login equals "login" and password equals "password":

### ./src/routers/login/controller.spec.ts
```diff
...
+   it('should send 401 status code when passing login equals "login" and password equals "password"', () => {
+     // Arrange
+     const login = 'login';
+     const password = 'password';

+     const req: Partial<Request> = {
+       body: {
+         login,
+         password,
+       },
+     };

+     const res: Partial<Response> = {
+       sendStatus: jest.fn(),
+     };

+     const controller = LoginController();

+     // Act
+     controller.post(req as Request, res as Response);

+     // Assert
+     expect(res.sendStatus).toHaveBeenCalledWith(401);
+   });
...
```

- Should return 201 when login equals "admin" and password equals "test":

### ./src/routers/login/controller.spec.ts
```diff
...
+   it('should send 201 status code when passing login equals "admin" and password equals "test"', () => {
+     // Arrange
+     const login = 'admin';
+     const password = 'test';

+     const req: Partial<Request> = {
+       body: {
+         login,
+         password,
+       },
+     };

+     const res: Partial<Response> = {
+       sendStatus: jest.fn(),
+     };

+     const controller = LoginController();

+     // Act
+     controller.post(req as Request, res as Response);

+     // Assert
+     expect(res.sendStatus).toHaveBeenCalledWith(201);
+   });
...
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
