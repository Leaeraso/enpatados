class customError extends Error {
  code: string
  httpStatus: number

  constructor(msg: string, code: string, httpStatus: number) {
    super(msg)
    this.code = code
    this.httpStatus = httpStatus
    this.name = this.constructor.name

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

const conflictError = (msg: string, code = 'CONFLICT') => {
  let err = new customError(msg, code, 409)
  throw err
}

const notFoundError = (msg: string, code = 'NOT_FOUND') => {
  let err = new customError(msg, code, 404)
  throw err
}

const notAuthorizedError = (msg: string, code = 'UNAUTHORIZED') => {
  let err = new customError(msg, code, 401)
  throw err
}

const forbiddenError = (msg: string, code = 'FORBIDDEN') => {
  let err = new customError(msg, code, 403)
  throw err
}

const internalServerError = (msg: string, code = 'INTERNAL_SERVER') => {
  let err = new customError(msg, code, 500)
  throw err
}

const badRequestError = (msg: string, code = 'BAD_REQUEST') => {
  let err = new customError(msg, code, 400)
  throw err
}

export default {
  conflictError,
  notFoundError,
  notAuthorizedError,
  forbiddenError,
  internalServerError,
  badRequestError
}
