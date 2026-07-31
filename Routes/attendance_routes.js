const express = require("express")
const router = express.Router()

const attendance = require("../models/attendance")

    router.get('/', async (req,res)=>{
        const result = await attendance.find();
        res.send(result)
    })

    router.get('/:id', async (req,res)=>{
        const result = await attendance.findOne({attendance_id:req.params.id});
        res.send(result)
    })

    router.delete('/:id', async (req,res)=>{
        const result = await attendance.deleteOne({attendance_id:req.params.id});
        res.send(result)
    })

    router.post('/', async (req,res)=>{
        const result = await attendance.create(req.body);
        res.send(result)
    })

    router.patch('/:id', async (req,res)=>{
        const result = await attendance.updateOne({attendance_id:req.params.id},req.body);
        res.send(result)
    })
module.exports = router