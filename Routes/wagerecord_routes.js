const express = require("express")
const router = express.Router()

const wagerecord = require("../models/wageRecord")

    router.get('/', async (req,res)=>{
        const result = await wagerecord .find();
        res.send(result)
    })

    router.get('/:id', async (req,res)=>{
        const result = await wagerecord .findOne({wage_id:req.params.id});
        res.send(result)
    })

    router.delete('/:id', async (req,res)=>{
        const result = await wagerecord .deleteOne({wage_id:req.params.id});
        res.send(result)
    })

    router.post('/', async (req,res)=>{
        const result = await wagerecord .create(req.body);
        res.send(result)
    })

    router.patch('/:id', async (req,res)=>{
        const result = await wagerecord .updateOne({wage_id:req.params.id},req.body);
        res.send(result)
    })
module.exports = router