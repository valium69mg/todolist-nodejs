const Task = require('../models/Task');
const jwt = require("jsonwebtoken");

module.exports.createTask = async (req,res) => {
    const {description} = req.body;
    // req.mail is defined on the cookieJwtAuth middleware
    const newTask = await Task.createTask(description,req.mail);
    if (newTask === true) {
        res.status(201).redirect('/');
    } else {
        res.sendStatus(403);
    }
};

module.exports.getAllTasks = async (req,res) => {
    const allTasks = await Task.getAllTasks(req.mail);
    if (allTasks !== null) {
        res.json(allTasks);
    } else {
        res.json({});
    }
};

module.exports.updateTask = async (req,res) => {
    const {status,id} = req.body;
    if (status === 'pending' | status === 'completed') {
        const updateTask = await Task.updateTask(req.mail,status,parseInt(id));
        if (updateTask === true) {
            res.status(200).redirect('/');
        } else {
            res.status(403).redirect('/');
        }
    } else {
        res.status(400).redirect('/');
    }
    
};

module.exports.deleteTask = async (req,res) => {
    const {id} = req.body;
    const token = req.cookies.token;
    const mail = jwt.verify(token,process.env.MY_SECRET);
    req.mail = mail;
    const deleteTask = await Task.deleteTask(req.mail,id);
    if (deleteTask instanceof Error) {
        res.json({error: deleteTask});
    } else if(deleteTask === true) {
        res.status(200).redirect('/');
    } else {
        res.send("Oops, something went wrong");
    }
};