import express from "express"
import { host, port } from "./config/server.config.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors({origin: '*',credentials: true}))

app.use((req, res, next) => {
    return res.status(404).send({ "message": "page not found" })
})

app.listen({ host: host, port: port }, () => {
    console.log(`This server is listen on http://${host}:${port}`)
})

export { app }