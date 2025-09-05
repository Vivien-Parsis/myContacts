import { contactSchema } from "../config/schema.config.js"
import { databaseConnection } from '../config/database.config.js'

const contactModel = databaseConnection.model("contact", contactSchema, "contact")

export { contactModel }