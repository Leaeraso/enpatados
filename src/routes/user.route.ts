import express from 'express'
import { 
    registerUser, 
    loginUser, 
    authSession, 
    passwordRecovery, 
    resetPassword, 
    updateUser,
    googleAuthCallback,
    authGoogle,
    getUsers
} from '../controllers/user/index.controller'
import { authToken } from '../middlewares/middleware'
import passport from 'passport'

const router = express.Router()

/**
 * @openapi
 * /user/auth/token:
 *   get:
 *     tags:
 *       - users
 *     summary: Validar sesion del usuario
 *     responses:
 *       200:
 *         description: Retorna el req.user
 *       500:
 *         description: Error al veriricar la sesion
 *     security:
 *       - bearerAuth: []
 */
router.get('/auth/token', authToken, authSession)

router.get('/auth/google', authGoogle)

router.get('/auth/google/callback', passport.authenticate('google', { failureMessage:'Error al loguearse con google', failureRedirect: '/login' }), googleAuthCallback)

router.get('/', authToken, getUsers)

/**
 * @openapi
 * /user/passwordRecovery:
 *   post:
 *     tags:
 *       - users
 *     summary: Recuperar la contraseña del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: Se ha enviado un mail de recuperacion a ...
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error al recuperar la contraseña
 */
router.post('/pass/recovery', passwordRecovery)

/**
 * @openapi
 * /user/register:
 *   post:
 *     tags:
 *       - users
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/registerUser'
 *     responses:
 *       201:
 *         description: Usuario registrado con exito
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error al registrar el usuario
 */
router.post('/register', registerUser)

/**
 * @openapi
 * /user/login:
 *   post:
 *     tags:
 *       - users
 *     summary: Logear al usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/loginUser'
 *     responses:
 *       200:
 *         description: Devuelve un token
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error al loguear el usuario
 */
router.post('/login', loginUser)

/**
 * @openapi
 * /user/reset/{token}:
 *   put:
 *     tags:
 *       - users
 *     summary: cambiar contraseña
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/resetPasswd'
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *       400:
 *         description: Invalid token
 *       500:
 *         description: Error al cambiar la contraseña
 */
router.put('/reset',authToken, resetPassword)

/**
 * @openapi
 * /user/{id}:
 *   put:
 *     tags:
 *       - users
 *     summary: Actualizar datos del usuario
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: Devuelve el usuario
 *       404:
 *         description: User not found
 *       500:
 *         description: Error al actualizar los datos del usuario
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authToken, updateUser)

export default router;
