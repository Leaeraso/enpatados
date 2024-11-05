interface registerUser {
  name: string
  surname: string
  password: string
  email: string
  dob: Date
  role?: string
  isValidated?: boolean
}

export default registerUser
