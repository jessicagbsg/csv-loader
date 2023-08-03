import CSVRepository from "../db/prisma/csv-repository"

export default class CSVService {
  csvRepository: CSVRepository

  constructor() {
    this.csvRepository = new CSVRepository()
  }

  async add() { }

  async list() { }
}
