import { prismaClient } from "../prisma/prismaClient"
import { User } from "../../models/project-types"

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

  async list() {
    try {
      return prismaClient.user.findMany({
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