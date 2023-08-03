import { prismaClient } from "../prisma/prismaClient"
import { User } from "../../models/project-types"
import { UserFilters } from "../../shared/types"

export default class CSVRepository {
  async create(users: User[]): Promise<void> {
    try {
      return users.forEach(async user => {

        await prismaClient.user.create({
          data: {
            ...user
          }
        })
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async list(filters?: UserFilters) {
    const { name, city, country, favorite_sport } = filters
    try {
      return prismaClient.user.findMany({
        where: {
          name: {
            contains: name
          },
          city: {
            contains: city
          },
          country: {
            contains: country
          },
          favorite_sport: {
            contains: favorite_sport
          },
        },
        orderBy: [
          {
            id: "desc",
          },
        ],
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }
}