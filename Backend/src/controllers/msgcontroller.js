const Msg =require('../models/msg')

const getAll = async (req,res)=>{
    res.json(await Msg.findAll())
}

module.exports.getAll = getAll