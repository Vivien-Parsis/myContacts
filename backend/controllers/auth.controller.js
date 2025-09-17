import { generateToken } from "../services/auth.service.js"
import { userModel } from "../models/users.model.js"
import bcrypt from "bcrypt"
import { passwordPattern } from "../config/pattern.config.js"

const authController = {
    login: async (req, res) => {
        const currentUser = {
            email: req.body.email || "",
            password: req.body.password || ""
        }
        if (!currentUser.email || !currentUser.password) {
            return res.status(422).send({ message: "missing credential" })
        }
        const findUser = await userModel.findOne({ email: currentUser.email })
        if (findUser) {
            currentUser.id = findUser._id
            const jwt = generateToken(currentUser)
            return res.status(200).send({ token: jwt })
        } else {
            return res.status(404).send({ message: "user not found" })
        }
    },
    register: async (req, res) => {
        const currentUser = {
            email: req.body.email || "",
            password: req.body.password || "",
            lastName: req.body.lastName || "",
            firstName: req.body.firstName || ""
        }
        if (!currentUser.email || !currentUser.password || !currentUser.lastName || !currentUser.firstName) {
            res.status(422).send({ message: "missing credential" })
        }else if (!passwordPattern.test(currentUser.password)) {
            return res.status(422).send({ message: "password must be between 6 and 30 characters with no space" })
        }
        const findUser = await userModel.findOne({ email: currentUser.email })
        if (!findUser) {
            try {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(currentUser.password, salt)
                console.log({
                    email: currentUser.email,
                    password: hashedPassword,
                    lastName: currentUser.lastName,
                    firstName: currentUser.firstName
                })
                const insertedUser = await userModel.insertOne({
                    email: currentUser.email,
                    password: hashedPassword,
                    lastName: currentUser.lastName,
                    firstName: currentUser.firstName
                })
                currentUser.id = insertedUser._id
                const jwt = generateToken(currentUser)
                return res.status(200).send({ token: jwt })
            } catch {
                res.status(400).send({ message: "error while adding user" })
            }
        } else {
            res.status(409).send({ message: "user already exist" })
        }
    }
}

export {
    authController
}