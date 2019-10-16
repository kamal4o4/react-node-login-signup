/*
    Author: Kamal Pandey [Raysteeds Infotech Pvt Ltd]
    Date: 1 Sept 2019
    
*/

/********************************************************************
Dependencies
********************************************************************/
const Hapi = require('@hapi/hapi');
const Config = require('./config/config.json');
const Mongoose = require('mongoose');
const HapiAuthJWT = require('hapi-auth-jwt2');

const User = require('./routes/user');

var options = {
    host: Config.server.host,
    port: Config.server.port,
    routes: {
        cors: {
            origin: ["*"],
            headers: ["Accept", "Content-Type"],
            additionalHeaders: ["X-Requested-With"]
        }
    }
};
const server = Hapi.server(options);

/********************************************************************
Making connection to MongoDB database with mongoose ORM
********************************************************************/
Mongoose.connect('mongodb://localhost/login-signup', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/********************************************************************
Registering Authentication
********************************************************************/
async function registerAuth() {
    await server.register({
        plugin: HapiAuthJWT
    });
    await server.auth.strategy('jwt', 'jwt',
    {
        key: Config.jwt.secret_key,
        validate: async (decoded, request) => {
            return { isValid: true };
        },
        verifyOptions: { algorithms: ['HS256'] },
    });
}

/********************************************************************
Registering Routes
********************************************************************/
server.route(User);

async function initServer() {
    try {
        await registerAuth();
        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
    } catch (err) {
        console.trace(err);
        process.exit(1);
    }
}

initServer();