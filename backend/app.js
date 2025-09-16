import express from "express"
import cors from "cors"
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.config.js'
import { authRouter } from "./router/auth.route.js"
import { checkRouteJwt } from "./middleware/auth.middleware.js"
import { contactRouter } from "./router/conctat.route.js"

const app = express()

app.use(express.json())
app.use(cors({ origin: '*' }))

app.use('/', (req, res) => res.status(200).send({ message: "myContact api" }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/auth', authRouter)
app.use('/contact', checkRouteJwt, contactRouter)

app.use((req, res, next) => {
    return res.status(404).send({ "message": "page not found" })
})

export { app }