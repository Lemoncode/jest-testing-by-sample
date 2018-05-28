import { Request, Response } from 'express';
import { LoginController } from './controller';

describe('routers/login/controller tests', () => {
  describe('post', () => {
    it('should send 401 status code when passing login and password equals undefined', () => {
      // Arrange
      const login = undefined;
      const password = undefined;

      const req: Partial<Request> = {
        body: {
          login,
          password,
        },
      };

      const res: Partial<Response> = {
        sendStatus: jest.fn(),
      };

      const controller = LoginController();

      // Act
      controller.post(req as Request, res as Response);

      // Assert
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should send 401 status code when passing login and password equals null', () => {
      // Arrange
      const login = null;
      const password = null;

      const req: Partial<Request> = {
        body: {
          login,
          password,
        },
      };

      const res: Partial<Response> = {
        sendStatus: jest.fn(),
      };

      const controller = LoginController();

      // Act
      controller.post(req as Request, res as Response);

      // Assert
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should send 401 status code when passing login equals "login" and password equals "password"', () => {
      // Arrange
      const login = 'login';
      const password = 'password';

      const req: Partial<Request> = {
        body: {
          login,
          password,
        },
      };

      const res: Partial<Response> = {
        sendStatus: jest.fn(),
      };

      const controller = LoginController();

      // Act
      controller.post(req as Request, res as Response);

      // Assert
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should send 201 status code when passing login equals "admin" and password equals "test"', () => {
      // Arrange
      const login = 'admin';
      const password = 'test';

      const req: Partial<Request> = {
        body: {
          login,
          password,
        },
      };

      const res: Partial<Response> = {
        sendStatus: jest.fn(),
      };

      const controller = LoginController();

      // Act
      controller.post(req as Request, res as Response);

      // Assert
      expect(res.sendStatus).toHaveBeenCalledWith(201);
    });
  });
});
