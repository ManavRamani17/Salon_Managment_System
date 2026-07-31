const express = require("express")
const router = express.Router()

const appointment = require("../models/appointment")

    router.get('/', async (req,res)=>{
        const result = await appointment.find();
        res.send(result)
    })

    router.get('/:id', async (req,res)=>{
        const result = await appointment.findOne({appointment_id:req.params.id});
        res.send(result)
    })

    router.delete('/:id', async (req,res)=>{
        const result = await appointment.deleteOne({appointment_id:req.params.id});
        res.send(result)
    })

    router.post('/', async (req,res)=>{
        const result = await appointment.create(req.body);
        res.send(result)
    })

    router.patch('/:id', async (req,res)=>{
        const result = await appointment.updateOne({appointment_id:req.params.id},req.body);
        res.send(result)
    })
module.exports = router