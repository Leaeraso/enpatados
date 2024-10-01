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

const errorHelper = {
  conflictError: (msg: string, code: string) => {
    return new customError(msg, code, 409)
  },
  notFoundError: (msg: string, code: string) => {
    return new customError(msg, code, 404)
  },
  notAuthorizedError: (msg: string, code: string) => {
    return new customError(msg, code, 401)
  },
  forbiddenError: (msg: string, code: string) => {
    return new customError(msg, code, 403)
  },
  internalServerError: (msg: string, code: string) => {
    return new customError(msg, code, 500)
  },
  badRequestError: (msg: string, code: string) => {
    return new customError(msg, code, 400)
  }
}

export { customError }
export default errorHelper
