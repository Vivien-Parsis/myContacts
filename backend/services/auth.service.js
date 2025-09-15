import jwt from "jsonwebtoken"
import { jwt_secret } from "../config/server.config.js"

const generateToken = (user) => {
    return jwt.sign({ email: user.email, id: user.id }, jwt_secret, { expiresIn: "2h" })
}

export {
    generateToken
}