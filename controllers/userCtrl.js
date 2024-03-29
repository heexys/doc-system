const userModel = require("../models/userModels");
const doctorModel = require("../models/doctorModel");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register callback
const registerController = async (req,res) => {
    try {
        const exisitngUser = await userModel.findOne({email:req.body.email})
        if(exisitngUser){
            return res
                .status(200)
                .send({message: "User Alredy Exist", success:false})
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        req.body.password = hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({message:'Register Sucessfully', success:true})
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .send({
                success:false,
                message: `Register Controller ${error.message}`
        })
    }
};

// login callback
const loginController = async (req,res) => {
    try {
        const user = await userModel.findOne({email:req.body.email})
        if(!user) {
            return res.status(200).send({message:'user not found', success:false})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch) {
            return res.status(200).send({message:'Invalid Email or Password', success:false})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn: '1d'})
        res.status(200).send({message:'Login Success', success:true, token})
    } catch (error) {
        console.log(error)
        res.status(500).send({message: `Error in Login CTRL ${error.message}`})
    }
};

const authController = async (req,res) => {
    try {
        const user = await userModel.findById({_id:req.body.userId});
        user.password = undefined
        if(!user) {
            return res.status(200).send({
                message: 'user not found',
                success: false,
            });
        } else {
            res.status(200).send({
                success:true,
                data: user,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'auth error',
            success: false,
            error,
        });
    }
};

//Apply Doctor CTRL
const applyDoctorController = async (req,res) => {
    try {
        const newDoctor = await doctorModel({...req.body, status:'pending'})
        await newDoctor.save()

        // Найти всех пользователей с админкой
        const adminUsers = await userModel.find({isAdmin:true})

        // Отправить уведомление каждому администратору
        adminUsers.forEach(async (adminUser) => {
            const notifcation = adminUser.notifcation || []
            notifcation.push({
                type: "apply-doctor-request",
                message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account.`,
                onClickPath:'/admin/doctors',
                data:{
                    doctorId:newDoctor._id,
                    name: newDoctor.firstName + ' ' + newDoctor.lastName,
                }
            })
            await userModel.findByIdAndUpdate(adminUser._id, {notifcation})
        })

        res.status(201).send({
            success:true,
            message:'Doctor Account Applied Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error While Applying For Doctor'
        })
    }
}


//notification ctrl
const getAllNotificationController = async (req,res) => {
    try {
        const user = await userModel.findOne({_id:req.body.userId})
        const seennotification = user.seennotification
        const notifcation = user.notifcation
        seennotification.push(...notifcation)
        user.notifcation = []
        const updatedUser = await user.save()
        res.status(200).send({
            success:true,
            message:'all notification marked as read',
            data:updatedUser,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'Error in notification',
            success: false,
            error,
        })
    }
}

// delete notifications
const deleteAllNotificationController = async(req,res) => {
    try {
        const user = await userModel.findOne({_id:req.body.userId})
        user.seennotification = []
        const updatedUser = await user.save()
        updatedUser.password = undefined
        res.status(200).send({
            success:true,
            message:'Notifications Deleted Successfully',
            data: updatedUser,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'unable to delete all notification',
            error
        })
    }
}

module.exports = {
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
};