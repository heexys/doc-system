const userModel = require("../models/userModels");
const bcrypt = require('bcryptjs');

// register callback
const registerController = async (req,res) => {
    try {
        const exisitngUser = await userModel.findOne({email:req.body.email})
        if(exisitngUser){
            return res.status(200).send.message({message: `User Alredy Exist`, success:false})
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        req.body.password = hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        req.status(201).send({message:'Register Sucessfully', success:true})
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false, message: `Register Controller ${error.message}`})
    }
};

const loginController = () => {};

module.exports = { loginController, registerController };