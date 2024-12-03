import swaggerJSDoc, {OAS3Definition, OAS3Options} from 'swagger-jsdoc'

const swaggerDefinition: OAS3Definition = {
    openapi: '3.0.1',
    info: {
        title: 'Documentacion API Enpatados',
        description: 'Esta API se encarga de administrar las ventas de productos, estados y pagos de la empresa Enpatados.',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:3000',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            },
        },
        schemas: {
            registerUser: {
                type: 'object',
                required: ['name', 'surname', 'email', 'password', 'dob'],
                properties: {
                    name: {
                        type: 'string',
                    },
                    surname: {
                        type: 'string',
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                    },
                    password: {
                        type: 'string',
                        minLength: 8,
                    },
                    dob: {
                        type: 'string',
                        format: 'date',
                    },
                },
            },
            loginUser: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: {
                        type: 'string',
                        format: 'email'
                    },
                    password: {
                        type: 'string',
                        minLength: 8,
                    },
                },
            },
            resetPasswd: {
                type: 'object',
                required: ['newPasswd'],
                properties: {
                    newPasswd: {
                        type: 'string',
                        minLength: 8,
                    },
                },
            },
            product: {
                type: 'object',
                required: ['name', 'description', 'price', 'stock', 'iamgeUrl', 'productType', 'categoryId'],
                properties: {
                    name: {
                        type: 'string',
                    },
                    description: {
                        type: 'string',
                    },
                    price: {
                        type: 'float',
                    },
                    stock: {
                        type: 'integer',
                    },
                    imageUrl: {
                        type: 'string',
                    },
                    productType: {
                        type: 'string',
                    },
                    categoryId: {
                        type: 'integer',
                    },
                },
            },
            category: {
                type: 'object',
                required: ['name', 'description', 'icon'],
                properties: {
                    name: {
                        type: 'string',
                    },
                    description: {
                        type: 'string',
                    },
                    icon: {
                        type: 'string',
                    },
                },
            },
            subcategory: {
                type: 'object',
                required: ['name', 'categoryId'],
                properties: {
                    name: {
                        type: 'string',
                    },
                    categoryId: {
                        type: 'integer',
                    },
                },
            },
            order: {
                type: 'object',
                required: ['date', 'total', 'status', 'userId', 'discount'],
                properties: {
                    date: {
                        type: 'string',
                        format: 'date',
                    },
                    total: {
                        type: 'float',
                    },
                    status: {
                        type: 'string',
                    },
                    userId: {
                        type: 'integer',
                    },
                    discount: {
                        type: 'integer',
                    },
                },
            },
        }
    }
}

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ['./src/routes/**/*.ts']
}

export default swaggerJSDoc(swaggerOptions)