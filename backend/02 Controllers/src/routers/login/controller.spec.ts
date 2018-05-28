import { Request, Response } from 'express';
import { LoginController } from './controller';

describe('routers/login/controller tests', () => {
  describe('post', () => {
    it('should send 401 status code when passing login and password equals undefined', () => {
      // Arrange
      const login = undefined;
      const password = undefined;

      const req = {
        body: {
          login,
          password,
        },
      } as Request;

      // Act

      // Assert
    });
  });
});
