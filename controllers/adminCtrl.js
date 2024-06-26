const doctorModel = require('../models/doctorModel')
const userModel = require('../models/userModels')

const getAllUsersController = async (req,res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({
            success: true,
            message: "Users Data List",
            data: users,
        })
    } catch(error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while fetching users',
            error
        })
    }
}

const getAllDoctorsController = async (req,res) => {
    try{
        const doctors = await doctorModel.find({})
        res.status(200).send({
            success:true,
            message:'Doctors Data List',
            data: doctors,
        })
    } catch(error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while getting doctors data',
            error
        })
    }
}

// account status
const changeAccountStatusController = async (req,res) => {
    try {
        const {doctorId, status} = req.body
        const doctor = await doctorModel.findByIdAndUpdate(doctorId,{status})
        const user = await userModel.findOne({_id:doctor.userId})
        const notification = user.notifcation
        notification.push({
            type:'doctor-account-request-updated',
            message:`Your Doctor Request Has ${status}`,
            onClickPath:'/notification'
        })
        user.isDoctor = status === 'approved' ? true : false
        await user.save()
        res.status(201).send({
            success: true,
            message:'Account Status Updated',
            data: doctor,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Eror in Account Status',
            error
        })
    }
}

//change user admin status
const changeAdminStatusController = async (req, res) => {
    try {
        const {id, userId} = req.body
        const user = await userModel.findById(id)
        if (userId === id || user.isDoctor === true) {
            if (userId === id) {
                return res.status(400).send({
                    success: false,
                    message: "You can't change your admin status",
                });
            } else {
                return res.status(400).send({
                    success: false,
                    message: "This user can't be admin because user has the role doctor",
                });
            }
        } else{
        user.isAdmin = !user.isAdmin;}
        await user.save()
        res.status(201).send({
            success: true,
            message:'Account Admin Status Updated',
            messages:[{id}, {userId}, {user}],
            data: user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Change Account Admin Status',
            error
        })
    }
}

module.exports = {
    getAllUsersController, 
    getAllDoctorsController,
    changeAccountStatusController,
    changeAdminStatusController,
}