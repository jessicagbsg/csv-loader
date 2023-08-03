import express, { Router } from "express"

const app = express()

const router = Router()

app.use("/api", router)

export default app