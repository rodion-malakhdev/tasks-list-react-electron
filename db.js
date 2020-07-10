require('dotenv').config();
const Sequelize = require('sequelize');
const faker = require('faker');
const { Task } = require('./models');

const { DB_HOST, DB_NAME, DB_DIALECT, DB_PASSWORD, DB_PORT, DB_USER } = process.env;

//Needs to setup DB
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD,
    {
        dialectOptions: { charset: "utf8" },
        dialect: DB_DIALECT,
        host: DB_HOST,
        port: DB_PORT
    }
);

const task = Task.init(sequelize);

function fillTasks(){
    return task.bulkCreate(new Array(55).fill(null).map(() => ({ description: faker.random.word()})))
}



Promise.resolve()
    .then(() => sequelize.sync())
    .then(() => task.count())
    .then((c) => !c && fillTasks())
    .then(() => console.log('DB is synced'))


module.exports = { sequelize, task }