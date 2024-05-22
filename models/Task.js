const databaseController = require('../database.js');

// TASKS

module.exports.createTask = async function (description,mail) {
    const client = await databaseController.createClient();
    await client.connect();
    const response = await databaseController.createTask(description, mail, client);
    // true or false
    return response;
};

module.exports.getAllTasks = async function (mail) {
    const client = await databaseController.createClient();
    await client.connect();
    const response = await databaseController.getAllTasks(mail,client);
    if (response instanceof Error) {
        return null;
    } else {
        return response;
    }
};

module.exports.updateTask = async function (mail,status,id) {
    const client = await databaseController.createClient();
    await client.connect();
    const response = await databaseController.updateTask(mail,status,id,client);
    if (response === true) {
        return true;
    } else {
        return false;
    }
};

module.exports.deleteTask = async function (mail,id) {
    const client = await databaseController.createClient();
    await client.connect();
    const response = await databaseController.deleteTask(mail,id,client);
    return response;
};