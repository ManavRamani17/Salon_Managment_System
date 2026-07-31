const express = require("express")
const router = express.Router()

const customer = require("../models/customer")

    router.get('/', async (req,res)=>{
        const result = await customer.find();
        res.send(result)
    })

    router.get('/:id', async (req,res)=>{
        const result = await customer.findOne({customer_id:req.params.id});
        res.send(result)
    })

    router.delete('/:id', async (req,res)=>{
        const result = await customer.deleteOne({customer_id:req.params.id});
        res.send(result)
    })

    router.post('/', async (req,res)=>{
        const result = await customer.create(req.body);
        res.send(result)
    })

    router.patch('    /:id', async (req,res)=>{
        const result = await customer.updateOne({customer_id:req.params.id},req.body);
        res.send(result)
    })
module.exports = router