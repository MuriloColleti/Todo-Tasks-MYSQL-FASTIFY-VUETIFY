import { beforeEach, expect, jest, test } from '@jest/globals';

const mockUsersQueries = {
  getAll: jest.fn(),
  getByID: jest.fn(),
  create: jest.fn(),
  updateById: jest.fn(),
  getByEmail: jest.fn(),
};

jest.unstable_mockModule('../../queries/users.query.js', () => mockUsersQueries);
const { userService } = await import('../../services/users.service.js');

beforeEach(() => {
  jest.clearAllMocks();
});

test('create user', async () => {
  mockUsersQueries.getByEmail.mockResolvedValue(null);
  mockUsersQueries.create.mockResolvedValue(1);
  mockUsersQueries.getByID.mockResolvedValue({
    active: 1,
    id_user: 1,
    username: 'usertest',
    email: 'test@email.com',
    password: '123456',
  });

  const result = await userService.create({
    username: 'usertest',
    email: 'test@email.com',
    password: '123456',
  });

  expect(mockUsersQueries.getByEmail).toHaveBeenCalledWith('test@email.com');
  expect(mockUsersQueries.create).toHaveBeenCalledWith({
    active: 1,
    username: 'usertest',
    email: 'test@email.com',
    password: '123456',
  });

  expect(result).toStrictEqual({
    id_user: 1,
    active: 1,
    username: 'usertest',
    email: 'test@email.com',
  });
});

test('update user', async () => {
  mockUsersQueries.getByEmail.mockResolvedValue(null);
  mockUsersQueries.updateById.mockResolvedValue(1);
  mockUsersQueries.getByID.mockResolvedValue({
    active: 1,
    id_user: 1,
    username: 'usernameUpdate',
    email: 'test@email.com',
    password: '12345678',
  });

  const result = await userService.update(1, {
    username: 'usernameUpdate',
    email: 'test@email.com',
    password: '12345678',
  });

  expect(mockUsersQueries.updateById).toHaveBeenCalledWith(1, {
    username: 'usernameUpdate',
    email: 'test@email.com',
    password: '12345678',
  });

  console.log(result);

  expect(result).toStrictEqual({
    active: 1,
    id_user: 1,
    username: 'usernameUpdate',
    email: 'test@email.com',
    password: '12345678',
  });
});
