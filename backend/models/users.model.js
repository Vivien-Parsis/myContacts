import { userSchema } from "../config/schema.config.js"
import { databaseConnection } from '../config/database.config.js'

const userModel = databaseConnection.model("utilisateur", userSchema, "utilisateur")

export { userModel }