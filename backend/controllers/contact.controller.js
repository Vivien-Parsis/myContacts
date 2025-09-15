import { contactModel } from "../models/contact.model.js"

const contactController = {
    getContact: async (req, res) => {
        const contacts = await contactModel.find({ contactOf: req.user._id })
        return res.send(contacts)
    },
    addContact: async (req, res) => {
        const currentContact = {
            lastName: req.body.lastName || "",
            firstName: req.body.firstName || "",
            email: req.body.email || "",
            telephone: req.body.telephone || ""
        }
        if (!currentContact.lastName || !currentContact.firstName || !currentContact.email || !currentContact.telephone) {
            return res.status(422).send({ message: "missing information" })
        } else {
            try {
                const newContact = await contactModel.insertOne({
                    lastName: currentContact.lastName,
                    firstName: currentContact.firstName,
                    email: currentContact.email,
                    telephone: currentContact.telephone,
                    contactOf: req.user._id
                })
                return res.status(201).send(newContact)
            } catch {
                res.status(400).send({ message: "error while adding contact" })
            }
        }
    },
    deleteContact: async (req, res) => {
        const idContact = req.body.id;
        const searchContact = await contactModel.findOne({ contactOf: req.user.id, _id: idContact })
        if (!searchContact) {
            return res.status(404).send({ message: "contact non trouvé"})
        } else {
            try {
                await contactModel.deleteOne({ _id: idContact })
                return res.status(200).send({ message: "contact deleted" })
            } catch {
                res.status(400).send({ message: "error while delete contact" })
            }
        }
    },
    updateContact: async (req, res) => {
        const updatedContact = {
            lastName: req.body.lastName || "",
            firstName: req.body.firstName || "",
            email: req.body.email || "",
            telephone: req.body.telephone || ""
        }
        const contactId = req.body.id || ""
        const searchContact = await contactModel.findOne({ _id: contactId, contactOf: req.user.id })
        if (!searchContact) {
            return res.status(404).send({ message: "contact non trouvé"})
        } else {
            await contactModel.updateOne({ _id: contactId }, {
                lastName: updatedContact.lastName || searchContact.lastName,
                firstName: updatedContact.firstName || searchContact.firstName,
                email: updatedContact.email || searchContact.email,
                telephone: updatedContact.telephone || searchContact.telephone,
            })
            return res.status(200).send({ message: "contact modified" })
        }
    }
}

export {
    contactController
}