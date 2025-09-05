import { Router } from "express"

import { contactController } from "../controllers/contact.controller.js"

const contactRouter = Router()
/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Gestion des contacts
 */

/**
 * @swagger
 * /contact:
 *   get:
 *     summary: Recupère tout les contacts de l'utilisateur actualement connecté
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: retourne une liste de tout les contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   contactOf:
 *                     type: string 
 *                   lastName:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   telephone:
 *                     type: string
 *                     example: 01234567                  
 *       400:
 *         description: Erreur avec le token
 *   post:
 *     summary: Création d'un contact pour l'utilisateur actualement connecté
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - firstName
 *               - lastName
 *               - telephone
 *             properties:
 *               email:
 *                 type: string
 *                 format: mail
 *               lastName:
 *                 type: string 
 *               firstName:
 *                 type: string 
 *               telephone:
 *                 type: string
 *     responses:
 *       201:
 *         description: creation réussie, retourne le contact
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   contactOf:
 *                     type: string 
 *                   lastName:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   telephone:
 *                     type: string
 *       400:
 *         description: Erreur lors de la création  
 *       422:
 *         description: Manque d'informations pour créer le contact
 *   put:
 *     summary: modification d'un contact pour l'utilisateur actualement connecté
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - firstName
 *               - lastName
 *               - telephone
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: mail
 *               lastName:
 *                 type: string 
 *               firstName:
 *                 type: string 
 *               telephone:
 *                 type: string
 *     responses:
 *       201:
 *         description: modification réussi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "contact modified"
 *       400:
 *         description: Erreur lors de la modification  
 *       404:
 *         description: Contact non trouvé  
 *       422:
 *         description: Manque d'informations pour modifier le contact
 *   delete:
 *     summary: suppression d'un contact pour l'utilisateur actualement connecté
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 format: mail
 *     responses:
 *       200:
 *         description: suppression réussi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "contact deleted"
 *       400:
 *         description: Erreur lors de la suppression  
 *       404:
 *         description: Contact non trouvé  
 *       422:
 *         description: Manque d'informations pour supprimer le contact
 */
contactRouter.get("/", contactController.getContact)
contactRouter.post("/", contactController.addContact)
contactRouter.delete("/", contactController.deleteContact)
contactRouter.put("/", contactController.updateContact)

export {
    contactRouter
}