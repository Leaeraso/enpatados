import registerUser from './registerUser.controller'
import loginUser from './loginUser.controller'
import authSession from './authSession.controller'
import passwordRecovery from './passwordRecovery.controller'
import resetPassword from './resetPassword.controller'
import updateUser from './updateUser.controller'
import getUserById from './getUserById.controller'
import {googleAuthCallback, authGoogle} from './googleAuthCallback.controller'
import getUsers from './getUsers.controller'

export { registerUser, loginUser, authSession, passwordRecovery, resetPassword, updateUser, getUserById, googleAuthCallback, authGoogle, getUsers }
