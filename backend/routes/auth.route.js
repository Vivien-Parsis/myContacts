import { Router } from "express"
import { authController } from "../controllers/auth.controller.js"

const authRouter = Router()
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification des utilisateurs
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion d’un utilisateur existant
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: mail
 *               password:
 *                 type: string 
 *     responses:
 *       200:
 *         description: Authentification réussie, retourne un token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Identifiants invalides
 *       404:
 *         description: Utilisateur introuvable
 *       422:
 *         description: Manque des informations dans le body
 */
authRouter.post("/login", authController.login)
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Création d'un compte utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - lastName
 *               - firstName
 *             properties:
 *               mail:
 *                 type: string
 *                 format: mail
 *               password:
 *                 type: string 
 *               lastName:
 *                 type: string 
 *               firstName:
 *                 type: string 
 *     responses:
 *       200:
 *         description: Authentification réussie, retourne un token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       409:
 *         description: Utilisateur existe déjà
 *       422:
 *         description: Manque des informations dans le body
 */
authRouter.post("/register", authController.register)

export {
    authRouter
}