import { Readable } from "stream";
import CSVRepository from "../db/repositories/csv-repository"
import readLine from "readline";
import { User } from "../models/project-types"

export default class CSVService {
  csvRepository: CSVRepository

  constructor() {
    this.csvRepository = new CSVRepository()
  }

  async load(file: Express.Multer.File) {
    const { buffer } = file

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const csvLine = readLine.createInterface({
      input: readableFile
    })

    const users: User[] = []

    for await (let line of csvLine) {
      const lineSplit = line.split(',')

      users.push({
        name: lineSplit[0],
        city: lineSplit[1],
        country: lineSplit[2],
        favorite_sport: lineSplit[3]
      })
    }

    users.shift()
    return await this.csvRepository.create(users)
  }

  async list() {
    return this.csvRepository.list()
  }
}
