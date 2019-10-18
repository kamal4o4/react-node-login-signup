const Joi = require('@hapi/joi');
const UserController = require('../controllers/user');

module.exports = [
    {
        method: 'POST',
        path: '/api/login',
        config: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().email({ minDomainSegments: 2 }).required(),
                    password: Joi.string().max(20).required()
                })
            }
        },
        handler: UserController.login
    },
    {
        method: 'POST',
        path: '/api/user',
        config: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().max(500).required(),
                    email: Joi.string().email({ minDomainSegments: 2 }).required(),
                    password: Joi.string().max(20).required()
                })
            }
        },
        handler: UserController.create
    },
    {
        method: 'GET',
        path: '/api/verifyEmail/{token}',
        config: {
            validate: {
                params: Joi.object({
                    token: Joi.string().required(),
                })
            }
        },
        handler: UserController.verifyEmail
    },
    {
        method: 'POST',
        path: '/api/resendVerificationEmail',
        config: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().email({ minDomainSegments: 2 }).required(),
                })
            }
        },
        handler: UserController.resendVerificationEmail
    }
];