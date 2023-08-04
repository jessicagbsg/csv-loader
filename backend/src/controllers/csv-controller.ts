import { Request, Response } from "express"
import CSVService from "../services/csv-service"
import { UserFilters } from "../shared/types"

export default class CSVController {
  csvService: CSVService

  constructor() {
    this.csvService = new CSVService()
  }

  async load(request: Request, response: Response): Promise<void> {
    try {
      if (!request.file) {
        response.status(400).send({
          message: "sending a csv file is required",
        })
      }

      if (!this.csvService) {
        this.csvService = new CSVService()
      }

      const { file } = request

      const csvUploaded = await this.csvService.load(file)

      response.status(200).json(csvUploaded)
      return csvUploaded
    } catch (err) {
      response.status(400).json({
        message: err.message,
      })
    }
  }

  async list(request: Request, response: Response): Promise<void> {
    try {
      if (!this.csvService) {
        this.csvService = new CSVService()
      }

      const filters: UserFilters = request.query

      const users = await this.csvService.list(filters)

      response.status(200).json(users)
    } catch (err) {
      response.status(400).json({
        message: err.message,
      })
    }
  }

}