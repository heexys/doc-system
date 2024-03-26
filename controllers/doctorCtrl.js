const doctorModel = require('../models/doctorModel')
const getDoctorInfoController = async (req,res) => {
    try {
        const doctor = await doctorModel.findOne({userId: req.body.userId})
        res.status(200).send({
            succes:true,
            message:'doctor data fetch success',
            data: doctor,
        })
    } catch(error) {
        console.log(error)
        res.status(500).send({
            succes:false,
            error,
            message:'Error in Fetching Doctor Details'
        })
    }
}

module.exports = {
    getDoctorInfoController,
}