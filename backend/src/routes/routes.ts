import { Router } from "express"
import CSVController from "../controllers/csv-controller"
import multer from "multer"

const multerConfig = multer()

const csvController = new CSVController()

export default (router: Router): void => {
  router.post('/files', multerConfig.single('file'), csvController.load.bind(this))
  router.get('/users', csvController.list.bind(this))
}