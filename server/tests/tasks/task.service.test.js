import { beforeEach, expect, jest, test } from '@jest/globals';

const mockTasksQueries = {
  getAll: jest.fn(),
  getByID: jest.fn(),
  create: jest.fn(),
  updateById: jest.fn(),
  deleteById: jest.fn(),
  getTasksByUser: jest.fn(),
};

const mockUsersTaskQueries = {
  getByTaskId: jest.fn(),
  deleteById: jest.fn(),
  deleteByTask: jest.fn(),
  create: jest.fn(),
};

jest.unstable_mockModule('../../queries/tasks.query.js', () => mockTasksQueries);
jest.unstable_mockModule('../../queries/users-task.query.js', () => mockUsersTaskQueries);
const { taskService } = await import('../../services/task.service.js');

beforeEach(() => {
  jest.clearAllMocks();
});

test('create task', async () => {
  mockTasksQueries.create.mockResolvedValue(1);
  mockTasksQueries.getByID.mockResolvedValue({
    id_task: 1,
    title: 'test',
    body: 'test',
    id_status: 2,
    id_priority: 3,
  });

  mockUsersTaskQueries.getByTaskId.mockResolvedValue([]);
  mockUsersTaskQueries.create.mockResolvedValue();

  const result = await taskService.create({
    title: 'test',
    body: 'test',
    id_users: [5],
    id_status: 2,
    id_priority: 3,
  });

  expect(mockTasksQueries.create).toHaveBeenCalledWith({
    title: 'test',
    body: 'test',
    id_status: 2,
    id_priority: 3,
  });

  console.log(result);

  expect(mockTasksQueries.create).toHaveBeenCalled();
  expect(mockUsersTaskQueries.create).toHaveBeenCalledWith({ id_user: 5, id_task: 1 });
  expect(result).toStrictEqual({
    id_task: 1,
    title: 'test',
    body: 'test',
    id_status: 2,
    id_priority: 3,
  });
});

test('get task by id', async () => {
  mockTasksQueries.getByID.mockResolvedValue(1);
  mockTasksQueries.getByID.mockResolvedValue({
    id_task: 1,
    title: 'test',
    body: 'test',
    id_users: [5],
    id_status: 2,
    id_priority: 3,
    status_title: 'Em Andamento',
    prioridade_title: 'Alto',
  });

  mockUsersTaskQueries.getByTaskId.mockResolvedValue(1);

  const result = await taskService.getById(1);

  expect(mockTasksQueries.getByID).toHaveBeenCalledWith(1);

  console.log(result);

  expect(mockTasksQueries.getByID).toHaveBeenCalled();
  expect(result).toStrictEqual({
    id_task: 1,
    title: 'test',
    body: 'test',
    id_users: [5],
    id_status: 2,
    id_priority: 3,
    status_title: 'Em Andamento',
    prioridade_title: 'Alto',
  });
});

test('Update task', async () => {
  mockTasksQueries.updateById();
  mockTasksQueries.updateById.mockResolvedValue({
    id_task: 1,
    title: 'testUpdate',
    body: 'testUpdate',
    id_users: [2],
    id_status: 3,
    id_priority: 1,
  });

  mockUsersTaskQueries.getByTaskId.mockResolvedValue([{ id_user: 2 }]);
  mockUsersTaskQueries.deleteById.mockResolvedValue();
  mockUsersTaskQueries.create.mockResolvedValue();

  mockTasksQueries.getByID.mockResolvedValue({
    id_task: 1,
    title: 'testUpdate',
    body: 'testUpdate',
    id_users: [2],
    id_status: 3,
    id_priority: 1,
    prioridade_title: 'Baixa',
    status_title: 'Completo',
  });

  const result = await taskService.update(1, {
    title: 'testUpdate',
    body: 'testUpdate',
    id_users: [2],
    id_status: 3,
    id_priority: 1,
  });

  expect(mockTasksQueries.updateById).toHaveBeenCalledWith(1, {
    title: 'testUpdate',
    body: 'testUpdate',
    id_users: [2],
    id_status: 3,
    id_priority: 1,
  });

  console.log(result);

  expect(result).toStrictEqual({
    id_task: 1,
    title: 'testUpdate',
    body: 'testUpdate',
    id_users: [2],
    id_status: 3,
    id_priority: 1,
    prioridade_title: 'Baixa',
    status_title: 'Completo',
  });
});

test('get task by user', async () => {
  // Mock retorna um array de tarefas
  mockTasksQueries.getTasksByUser.mockResolvedValue([
    {
      id_task: 1,
      title: 'testUpdate',
      body: 'testUpdate',
      id_users: [2],
      id_status: 3,
      id_priority: 1,
      prioridade_title: 'Baixa',
      status_title: 'Completo',
    },
  ]);

  // Mock do usersTaskQueries para cada tarefa (se necessário no service)
  mockUsersTaskQueries.getByTaskId.mockResolvedValue([{ id_user: 2 }]);

  const result = await taskService.getTasksByUser(1);

  expect(mockTasksQueries.getTasksByUser).toHaveBeenCalledWith(1);

  console.log(result);

  expect(mockTasksQueries.getTasksByUser).toHaveBeenCalled();
  expect(result).toStrictEqual([
    {
      id_task: 1,
      title: 'testUpdate',
      body: 'testUpdate',
      id_users: [2],
      id_status: 3,
      id_priority: 1,
      prioridade_title: 'Baixa',
      status_title: 'Completo',
    },
  ]);
});
