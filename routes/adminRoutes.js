const express = require('express');
const {
    getAllUsersController,
    getAllDoctorsController,
    changeAccountStatusController,
    changeAdminStatusController,
} = require('../controllers/adminCtrl');
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router()

//GET METHOD || USERS
router.get('/getAllUsers', authMiddleware, getAllUsersController)

//GET METHOD || DOCTORS
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)

//POST ACCOUNT STATUS
router.post('/changeAccountStatus', authMiddleware, changeAccountStatusController)

//POST ADMIN STATUS
router.post('/changeAdminStatus', authMiddleware, changeAdminStatusController)

module.exports = router