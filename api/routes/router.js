/******************************************************************************
 *  @Purpose        : To provide routes to each webpages. 
 *  @file           : routes.js        
 *  @author         : PRASHANTH S
 *  @version        : v0.1
 *  @since          : 05-02-2019
 ******************************************************************************/
const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controllers");
const chatControllers = require("../controllers/chat.controllers");
middle=require("../authentication/authentication")
// Contact routes
router.post('/login', userController.login);
router.post('/register', userController.registration);
router.post('/forgot',userController.forgotPassword);
router.post('/resetPassword/:token',middle.checkToken,userController.setPassword);
router.get('/getAllUsers',userController.getAllUsers)
router.post('/addMessage', chatControllers.addMessage);
router.get('/getAllChats', chatControllers.getAllUserChats);
// Export API routes
module.exports = router;