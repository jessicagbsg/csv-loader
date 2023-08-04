import { prismaClient } from "../prisma/prismaClient"
import { User } from "../../models/project-types"
import { UserFilters } from "../../shared/types"

export default class CSVRepository {
  async create(users: User[]): Promise<void> {
    try {
      await Promise.all(users.map(user => prismaClient.user.create({ data: user })));
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async list(filters?: UserFilters): Promise<User[]> {
    try {
      const where: any = {};

      if (filters?.name) {
        where.name = {
          contains: filters.name,
        };
      }

      if (filters?.city) {
        where.city = {
          contains: filters.city,
        };
      }

      if (filters?.country) {
        where.country = {
          contains: filters.country,
        };
      }

      if (filters?.favorite_sport) {
        where.favorite_sport = {
          contains: filters.favorite_sport,
        };
      }

      return prismaClient.user.findMany({
        where: Object.keys(where).length ? where : undefined,
        orderBy: [
          {
            id: "desc",
          },
        ],
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}