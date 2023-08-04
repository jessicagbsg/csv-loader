import { MockContext, Context, createMockContext } from '../../tests/mocks/context';
import { prismaClient } from '../prisma/prismaClient';
import CSVRepository from './csv-repository';

let mockCtx: MockContext;
let ctx: Context;
let mockCreate: jest.SpyInstance;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
  mockCreate = jest.spyOn(prismaClient.user, 'create').mockResolvedValue(undefined);
});


describe('CSVRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create users from csv file', async () => {
      const repository = new CSVRepository();

      const users = [
        { name: 'John', city: 'Doe', country: 'USA', favorite_sport: 'Basketball' },
        { name: 'Alice', city: 'Smith', country: 'UK', favorite_sport: 'Tennis' },
      ];

      await repository.create(users);

      expect(prismaClient.user.create).toHaveBeenCalledTimes(2);
      expect(prismaClient.user.create).toHaveBeenCalledWith({ data: users[0] });
      expect(prismaClient.user.create).toHaveBeenCalledWith({ data: users[1] });
    });

    it('should return an error', async () => {
      const repository = new CSVRepository();

      const users = [
        { name: 'John', city: 'New York', country: 'USA', favorite_sport: 'Basketball' },
        { name: 'Jane', city: 'London', country: 'UK', favorite_sport: 'Basketball', extra_field: 'extra' }
      ];

      (prismaClient.user.create as jest.Mock).mockRejectedValueOnce(new Error('Failed to create user'));

      await expect(repository.create(users)).rejects.toThrow('Failed to create user');

      expect(prismaClient.user.create).toHaveBeenCalledTimes(2);
    });

  })

  describe('list', () => {
    it('should list users based on filters', async () => {
      const repository = new CSVRepository();

      jest.spyOn(prismaClient.user, 'findMany').mockResolvedValueOnce([
        { id: 1, name: 'John', city: 'New York', country: 'USA', favorite_sport: 'Basketball' },
      ]);

      const filters = {
        name: 'John',
        country: 'USA',
        favorite_sport: 'Basketball'
      };

      const result = await repository.list(filters);

      expect(prismaClient.user.findMany).toHaveBeenCalled();
      expect(prismaClient.user.findMany).toHaveBeenCalledWith({
        where: {
          name: { contains: filters.name },
          country: { contains: filters.country },
          favorite_sport: { contains: filters.favorite_sport }
        },
        orderBy: [
          {
            id: 'desc',
          },
        ],
      });
      expect(result).toEqual([
        { id: 1, name: 'John', city: 'New York', country: 'USA', favorite_sport: 'Basketball' },
      ]);
    });

    it('should list all users when there are no filters', async () => {
      const repository = new CSVRepository();

      jest.spyOn(prismaClient.user, 'findMany').mockResolvedValueOnce([
        { id: 1, name: 'John', city: 'New York', country: 'USA', favorite_sport: 'Basketball' },
        { id: 1, name: 'Jane', city: 'London', country: 'UK', favorite_sport: 'Basketball' }
      ]);

      const filters = {};

      const result = await repository.list(filters);

      expect(prismaClient.user.findMany).toHaveBeenCalled();
      expect(prismaClient.user.findMany).toHaveBeenCalledWith({
        where: undefined,
        orderBy: [
          {
            id: 'desc',
          },
        ],
      });
      expect(result).toEqual([
        { id: 1, name: 'John', city: 'New York', country: 'USA', favorite_sport: 'Basketball' },
        { id: 1, name: 'Jane', city: 'London', country: 'UK', favorite_sport: 'Basketball' }
      ]);
    });

    it('should handle error in list', async () => {
      const repository = new CSVRepository();

      const errorMessage = 'Failed to fetch users';
      (prismaClient.user.findMany as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(repository.list()).rejects.toThrow(errorMessage);

      expect(prismaClient.user.findMany).toHaveBeenCalledTimes(1);
    });

    it('should handle error in list with specific filters', async () => {
      const repository = new CSVRepository();

      const errorMessage = 'Failed to fetch users';
      (prismaClient.user.findMany as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      const filters = { name: 'John', city: 'New York' };

      await expect(repository.list(filters)).rejects.toThrow(errorMessage);

      expect(prismaClient.user.findMany).toHaveBeenCalledTimes(1);
    });
  })
});
