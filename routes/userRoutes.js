const {Router} = require('express');
const userController = require('../controllers/userController');
const router = Router();
const jwtAuth = require('../middleware/cookieJwtAuth.js');

// USERS

// ALL USERS
router.get('/get/allUsers', jwtAuth.validateJwt, userController.getAllUsers);

// UPDATE USER PASSWORD
router.post('/update/password',jwtAuth.validateJwt, userController.updatePassword);

module.exports = router;