import express, { Router } from "express"
import setupUserRoutes from "./routes/routes"
import setupMiddlewares from "./config/middlewares"

const app = express()
setupMiddlewares(app)

const router = Router()
setupUserRoutes(router)

app.use("/api", router)

export default app