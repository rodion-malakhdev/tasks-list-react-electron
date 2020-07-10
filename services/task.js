const { ipcMain } = require('electron');
const { task } = require('../db');

module.exports = async function(){
    ipcMain.on('listTask', async (event, options) => {
        options = { raw: true, order: [['createdAt', 'DESC']], ...options}
        options.raw = true;
        event.returnValue = await task.findAndCountAll(options);
    });
    ipcMain.on('addTask', async (event, newTask) => {
        event.returnValue = await task.create(newTask);
    })
}