import { ValidationError } from 'sequelize'

const validateHelper = async (model: any, data: Record<string, any>) => {
  try {
    const instance = model.build(data)

    await instance.validate()

    return { valid: true, errors: null }
  } catch (error) {
    if (error instanceof ValidationError) {
      return { valid: false, errors: error.errors.map((e) => e.message) }
    }

    throw new Error('Error de validacion')
  }
}

export default validateHelper
