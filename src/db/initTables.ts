import UserModel from '../models/user/userModel.models'

const createTables = async () => {
  await UserModel.sync()
  console.log('The table for the User model was just created!')
}

export default createTables
