import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import userModel from '../../models/user/userModel.models'
import dotenv from 'dotenv'

dotenv.config()

const {GOOGLE_CLIENT_ID} = process.env
const {GOOGLE_CLIENT_SECRET} = process.env
const {API_URL} = process.env

const authGoogle = async () => {
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !API_URL) {
        throw new Error('GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET O API_URL , no estan declaradas en las variables de entorno')
      }
    
      passport.use(
        new GoogleStrategy(
          {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: `${API_URL}/auth/google/callback`,
          },
          async (_accessToken, _refreshToken, profile, done) => {
            try {
              const existingUser = await userModel.findOne({
                where: { googleId: profile.id },
              });
      
              if (existingUser) {
                return done(null, existingUser)
              }
      
              const newUser = await userModel.create({
                googleId: profile.id,
                email: profile.emails?.[0].value ?? 'noEmial@provide',
                name: profile.name?.givenName ?? 'noName',
                surname: profile.name?.familyName ?? 'noSurname',
              });
      
              return done(null, newUser)
            } catch (error) {
              return done(error, undefined)
            }
          }
        )
      )
      
      passport.serializeUser((user: any, done) => {
        done(null, user.id);
      })
      
      passport.deserializeUser(async (id: number, done) => {
        try {
          const user = await userModel.findByPk(id)
          done(null, user);
        } catch (error) {
          done(error, null);
        }
      })
}

export default authGoogle
