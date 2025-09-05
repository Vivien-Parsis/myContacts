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
                jwtToken: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: 'JWT brut',
                },
            },
        },
        security: [{ jwtToken: [] }],
    },
    apis: ['./router/*.route.js'],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

export { swaggerSpec }