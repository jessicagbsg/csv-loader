import { Router } from "express"

import CSVController from "../controllers/csv-controller"

const csvController = new CSVController()

export default (router: Router): void => {
  router.post('/files', csvController.add.bind(this))
  router.get('/users', csvController.list.bind(this))
}