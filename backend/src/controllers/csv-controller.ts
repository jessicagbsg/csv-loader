import { Request, Response } from "express"
import CSVService from "../services/csv-service"

export default class CSVController {
  csvService: CSVService

  constructor() {
    this.csvService = new CSVService()
  }

  async add(req: Request, res: Response): Promise<void> {
    try {

    } catch (err) {

    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {

    } catch (err) {
    }
  }

}