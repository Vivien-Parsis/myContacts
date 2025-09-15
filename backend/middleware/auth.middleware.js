import { jwt_secret } from "../config/server.config.js"
import jwt from "jsonwebtoken"
import { userModel } from "../models/users.model.js"

/**
 * Middleware d'authentification
 * - recupere l'entete d'authorization qui est sensé contenir le jwt
 * - verifie la presence du token et le bon format, sinon envoie un message d'erreur
 * - recupère le token et verifie la signature du token avec jwt secret
 * - vérifie que l'utilisateur est bien présent dans la base de donnée
 */
const checkRouteJwt = async (req, res, next) => {
    const authHeader = req.headers.authorization || ""
    if (!authHeader) {
        return res.send({ "message": "missing jwt token" })
    }
    if (!authHeader.startsWith("Bearer ")) {
        return res.send({ "message": "missing bearer key" })
    }

    try {
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, jwt_secret)

        const userSearch = await userModel.findOne({ email: decoded.email || '' })
        if (userSearch) {
            req.user = userSearch
            next()
        } else {
            return res.status(400).send({ "message": "error with jwt token" })
        }
    } catch (err) {
        return res.status(400).send({ "message": "error while decode or search for token", error: err })
    }
}

export {
    checkRouteJwt
}