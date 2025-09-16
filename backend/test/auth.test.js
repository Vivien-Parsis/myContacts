import request from "supertest"
import express from "express"
import { jest } from "@jest/globals"

jest.unstable_mockModule("../models/users.model.js", () => ({
    userModel: {
        findOne: jest.fn(),
        insertOne: jest.fn(),
    }
}))

jest.unstable_mockModule("../services/auth.service.js", () => ({
    generateToken: jest.fn(),
}))

jest.unstable_mockModule("bcrypt", () => ({
    default: {
        genSalt: jest.fn(),
        hash: jest.fn(),
    }
}))

const { userModel } = await import("../models/users.model.js")
const { generateToken } = await import("../services/auth.service.js")
const bcrypt = (await import("bcrypt")).default
const { authRouter } = await import("../routes/auth.route.js")

const app = express()
app.use(express.json())
app.use("/auth", authRouter)

describe("Auth Controller", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("POST /auth/login", () => {
        it("should return 422 if credentials are missing", async () => {
            const res = await request(app).post("/auth/login").send({})
            expect(res.status).toBe(422)
            expect(res.body.message).toBe("missing credential")
        })

        it("should return 404 if user not found", async () => {
            userModel.findOne.mockResolvedValue(null)

            const res = await request(app).post("/auth/login").send({
                email: "test@example.com",
                password: "password123"
            })

            expect(res.status).toBe(404)
            expect(res.body.message).toBe("user not found")
        })

        it("should return token if user exists", async () => {
            userModel.findOne.mockResolvedValue({ _id: "123", email: "test@example.com" })
            generateToken.mockReturnValue("fake-jwt")

            const res = await request(app).post("/auth/login").send({
                email: "test@example.com",
                password: "password123"
            })

            expect(res.status).toBe(200)
            expect(res.body.token).toBe("fake-jwt")
        })
    })

    describe("POST /auth/register", () => {
        it("should return 422 if any field is missing", async () => {
            const res = await request(app).post("/auth/register").send({
                email: "test@example.com",
                password: "password123"
            })
            expect(res.status).toBe(422)
            expect(res.body.message).toBe("missing credential")
        })

        it("should return 409 if user already exists", async () => {
            userModel.findOne.mockResolvedValue({ _id: "123" })

            const res = await request(app).post("/auth/register").send({
                email: "test@example.com",
                password: "password123",
                firstName: "John",
                lastName: "Doe"
            })

            expect(res.status).toBe(409)
            expect(res.body.message).toBe("user already exist")
        })

        it("should return 200 with token if registration succeeds", async () => {
            userModel.findOne.mockResolvedValue(null)
            bcrypt.genSalt.mockResolvedValue("salt")
            bcrypt.hash.mockResolvedValue("hashedpassword")
            userModel.insertOne.mockResolvedValue({ _id: "new-id" })
            generateToken.mockReturnValue("fake-jwt")

            const res = await request(app).post("/auth/register").send({
                email: "test@example.com",
                password: "password123",
                firstName: "John",
                lastName: "Doe"
            })

            expect(res.status).toBe(200)
            expect(res.body.token).toBe("fake-jwt")
        })

        it("should return 400 if insertion fails", async () => {
            userModel.findOne.mockResolvedValue(null)
            bcrypt.genSalt.mockResolvedValue("salt")
            bcrypt.hash.mockResolvedValue("hashedpassword")
            userModel.insertOne.mockRejectedValue(new Error("DB error"))

            const res = await request(app).post("/auth/register").send({
                email: "test@example.com",
                password: "password123",
                firstName: "John",
                lastName: "Doe"
            })

            expect(res.status).toBe(400)
            expect(res.body.message).toBe("error while adding user")
        })
    })
})
