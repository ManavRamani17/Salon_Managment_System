const express = require("express")
const router = express.Router()

const user = require("../models/user")

    router.get('/', async (req,res)=>{
        const result = await user.find();
        res.send(result)
    })

    router.get('/:id', async (req,res)=>{
        const result = await user.findOne({user_id:req.params.id});
        res.send(result)
    })

    router.delete('/:id', async (req,res)=>{
        const result = await user.deleteOne({user_id:req.params.id});
        res.send(result)
    })

    router.post('/', async (req,res)=>{
        const result = await user.create(req.body);
        res.send(result)
    })

    router.patch('/:id', async (req,res)=>{
        const result = await user.updateOne({user_id:req.params.id},req.body);
        res.send(result)
    })
module.exports = router