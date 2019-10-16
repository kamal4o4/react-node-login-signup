const Bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');
var jwt = require('jsonwebtoken');
const Config = require('../config/config.json');
const User = require('../models/user');
const Mailer = require('../lib/mailer');

module.exports = {
    login: async (request, h) => {
        const { payload } = request;
        try {
            const user = await User.findOne({
                email: payload.email
            });
            if (!user) return Boom.notFound('User does not exist. Please type valid email !!');
            const isValid = Bcrypt.compareSync(payload.password, user.password);
            if (!isValid) return Boom.unauthorized('Invalid Password !!');
            if (!user.isVerified) return h.response("Your email address is not verified. please verify your email address to proceed");
            return h.response(user);
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    create: async (request, h) => {
        const { payload } = request;
        payload.scope = "Customer";
        const hashPassword = Bcrypt.hashSync(payload.password, 10);
        try {
            await User.create({
                name: payload.name,
                email: payload.email,
                password: hashPassword,
                scope: payload.scope
            });
            var token = jwt.sign({ name: payload.name, email: payload.email, scope: payload.scope }, Config.jwt.secret_key, { expiresIn: '24h' });
            console.log('token sent in mail: ', token);
            Mailer.sentMailVerificationLink(payload, token);
            return h.response("Please confirm your mail id by clicking on link in email.");
        } catch (err) {
            console.log(err);
            if (err.name === 'MongoError' && err.code === 11000) return Boom.badRequest("email already exists!");
        }
    },

    resendVerificationEmail: async (request, h) => {
        const { payload } = request;
        try {
            const user = await User.findOne({
                email: payload.email
            });
            if (!user) return Boom.notFound('User does not exist. Please type valid email !!');
            const isValid = Bcrypt.compareSync(payload.password, user.password);
            if (!isValid) return Boom.unauthorized('Invalid Password !!');
            if (user.isVerified) return h.response("your email address is already verified");
            var token = jwt.sign({ name: user.name, email: user.email, scope: user.scope }, Config.jwt.secret_key, { expiresIn: '24h' });
            Mailer.sentMailVerificationLink(user, token);
            return h.response("Account verification link is sucessfully send to an email id.");
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    verifyEmail: async (request, h) => {
        try {
            let decoded = await jwt.verify(request.headers.authorization.split(" ")[1], Config.jwt.secret_key);
            if (decoded === undefined) { return Boom.badRequest("Invalid verfication link!"); };
            if (decoded.scope !== "Customer") return Boom.badRequest("Invalid verification link!");
            const user = await User.findOne({
                email: decoded.email
            });
            if (!user) return Boom.notFound('Invalid verfication link!');
            if (user.isVerified) return h.response("Account is already verified!");
            await User.update({ email: decoded.email }, { isVerified: true });
            return h.response("Account is successfully verfied!");
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    }
};