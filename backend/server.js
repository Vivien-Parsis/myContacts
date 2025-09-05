import express from "express"
import cors from "cors"
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.config.js'
import { host, port } from "./config/server.config.js"
import { authRouter } from "./router/auth.route.js"

const app = express()

app.use(express.json())
app.use(cors({origin: '*'}))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/auth', authRouter)

app.use((req, res, next) => {
    return res.status(404).send({ "message": "page not found" })
})

app.listen({ host: host, port: port }, () => {
    console.log(`This server is listen on http://${host}:${port}`)
})

export { app }