const { Sequelize } = require('sequelize');
require('dotenv').config();

const DataCn = new Sequelize(
    process.env.DATA_CN,
    process.env.USER_NAME_DATABASE97,
    process.env.PASSWORD_DATABASE97,
    {
        host: process.env.SERVER_DATABASE97,
        dialect: process.env.dialect,
        dialectOptions: {
            options: {
                enableArithAbort: false,
                encrypt: false,
                cryptoCredentialsDetails: {
                    minVersion: 'TLSv1',
                },
            },
        }
    }
);

module.exports = { DataCn };