import request from "supertest"
import express from "express"
import { jest } from "@jest/globals"

jest.unstable_mockModule("../models/contact.model.js", () => ({
    contactModel: {
        find: jest.fn(),
        findOne: jest.fn(),
        insertOne: jest.fn(),
        deleteOne: jest.fn(),
        updateOne: jest.fn(),
    }
}))

const { contactModel } = await import("../models/contact.model.js")
const { contactRouter } = await import("../routes/contact.route.js")

const fakeAuth = (req, res, next) => {
    req.user = { _id: "user123" }
    next()
}

const app = express()
app.use(express.json())
app.use(fakeAuth) // inject user before routes
app.use("/contact", contactRouter)

describe("Contact Controller", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("GET /contact", () => {
        it("should return list of contacts", async () => {
            const contacts = [
                { _id: "1", lastName: "Doe", firstName: "John", email: "a@b.com", telephone: "123" }
            ]
            contactModel.find.mockResolvedValue(contacts)

            const res = await request(app).get("/contact")

            expect(res.status).toBe(200)
            expect(res.body).toEqual(contacts)
            expect(contactModel.find).toHaveBeenCalledWith({ contactOf: "user123" })
        })
    })

    describe("POST /contact", () => {
        it("should return 422 if info missing", async () => {
            const res = await request(app).post("/contact").send({
                firstName: "John",
                email: "a@b.com"
            })
            expect(res.status).toBe(422)
            expect(res.body.message).toBe("missing information")
        })

        it("should return 201 if contact added", async () => {
            const newContact = { _id: "c1", lastName: "Doe", firstName: "John", email: "a@b.com", telephone: "123", contactOf: "user123" }
            contactModel.insertOne.mockResolvedValue(newContact)

            const res = await request(app).post("/contact").send({
                lastName: "Doe",
                firstName: "John",
                email: "a@b.com",
                telephone: "123"
            })

            expect(res.status).toBe(201)
            expect(res.body).toEqual(newContact)
            expect(contactModel.insertOne).toHaveBeenCalled()
        })

        it("should return 400 if insertion fails", async () => {
            contactModel.insertOne.mockRejectedValue(new Error("DB error"))

            const res = await request(app).post("/contact").send({
                lastName: "Doe",
                firstName: "John",
                email: "a@b.com",
                telephone: "123"
            })

            expect(res.status).toBe(400)
            expect(res.body.message).toBe("error while adding contact")
        })
    })

    describe("DELETE /contact", () => {
        it("should return 404 if contact not found", async () => {
            contactModel.findOne.mockResolvedValue(null)

            const res = await request(app).delete("/contact").send({ id: "c1" })

            expect(res.status).toBe(404)
            expect(res.body.message).toBe("contact non trouvé")
        })

        it("should return 200 if deleted", async () => {
            contactModel.findOne.mockResolvedValue({ _id: "c1" })
            contactModel.deleteOne.mockResolvedValue({ deletedCount: 1 })

            const res = await request(app).delete("/contact").send({ id: "c1" })

            expect(res.status).toBe(200)
            expect(res.body.message).toBe("contact deleted")
        })

        it("should return 400 if deletion fails", async () => {
            contactModel.findOne.mockResolvedValue({ _id: "c1" })
            contactModel.deleteOne.mockRejectedValue(new Error("DB error"))

            const res = await request(app).delete("/contact").send({ id: "c1" })

            expect(res.status).toBe(400)
            expect(res.body.message).toBe("error while delete contact")
        })
    })

    describe("PUT /contact", () => {
        it("should return 404 if contact not found", async () => {
            contactModel.findOne.mockResolvedValue(null)

            const res = await request(app).put("/contact").send({
                id: "c1",
                lastName: "Smith"
            })

            expect(res.status).toBe(404)
            expect(res.body.message).toBe("contact non trouvé")
        })

        it("should return 200 if updated", async () => {
            const existing = { _id: "c1", lastName: "Doe", firstName: "John", email: "a@b.com", telephone: "123" }
            contactModel.findOne.mockResolvedValue(existing)
            contactModel.updateOne.mockResolvedValue({ acknowledged: true })

            const res = await request(app).put("/contact").send({
                id: "c1",
                lastName: "Smith"
            })

            expect(res.status).toBe(200)
            expect(res.body.message).toBe("contact modified")
        })
    })
})
