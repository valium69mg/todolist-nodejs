const {Router} = require('express');
const tasksController = require('../controllers/tasksController.js');
const jwtAuth = require('../middleware/cookieJwtAuth.js');
const router = Router();

// create task 
router.get("/createTask", jwtAuth.validateJwt, (req,res) => {
    res.render("createTask.ejs");
});

// create task 
router.post("/createTask", jwtAuth.validateJwt, tasksController.createTask);

// get all tasks
router.post("/getAllTasks", jwtAuth.validateJwt, tasksController.getAllTasks);

// update task
router.post("/updateTask", jwtAuth.validateJwt, tasksController.updateTask);

// delete task 
router.post("/deleteTask", jwtAuth.validateJwt, tasksController.deleteTask);

module.exports = router;