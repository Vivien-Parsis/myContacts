import swaggerJsdoc from 'swagger-jsdoc'

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'myContacts',
            version: '1.0.0'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    description: 'JWT (mettre uniquement le token)',
                    bearerFormat: 'JWT'
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./routes/*.route.js'],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

export { swaggerSpec }