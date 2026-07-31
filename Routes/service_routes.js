const express = require("express")
const router = express.Router()

const service = require("../models/service")

    router.get('/', async (req,res)=>{
        const result = await service.find();
        res.send(result)
    })

    router.get('/:id', async (req,res)=>{
        console.log(req.params.id)
        const result = await service.findOne({service_id:req.params.id});
        res.send(result)
    })

    router.delete('/:id', async (req,res)=>{
        const result = await service.deleteOne({service_id:req.params.id});
        res.send(result)
    })

    router.post('/', async (req, res) => {

    try {

        const data = req.body;

        if (!data.service_id) {
            return res.status(400).send("Service ID is required");
        }

        if (!data.service_name) {
            return res.status(400).send("Service Name is required");
        }

        if (typeof data.price !== "number") {
            return res.status(400).send("Price must be a number");
        }

        if (data.price < 0) {
            return res.status(400).send("Price cannot be negative");
        }

        if (typeof data.duration !== "number") {
            return res.status(400).send("Duration must be a number");
        }

        if (data.duration <= 0) {
            return res.status(400).send("Duration must be greater than 0");
        }

        data.service_name = data.service_name.trim();
        data.service_id = data.service_id.trim();

        if (data.description) {
            data.description = data.description.trim();
        }

        const existingServiceid = await service.findOne({
            service_id: data.service_id
        });

        if (existingServiceid) {
            return res.status(400).send("Service ID already exists");
        }

        const result = await service.create(data);

        res.status(201).send(result);

    }
    catch (err) {
        res.status(500).send(err.message);
    }

});

    router.patch('/:id', async (req, res) => {
    try {

        const data = req.body;

        if (data.service_name !== undefined) {

            if (data.service_name.trim() === "") {
                return res.status(400).send("Service Name is required");
            }

            data.service_name = data.service_name.trim();
        }

        if (data.price !== undefined) {

            if (typeof data.price !== "number") {
                return res.status(400).send("Price must be a number");
            }

            if (data.price < 0) {
                return res.status(400).send("Price cannot be negative");
            }
        }

        if (data.duration !== undefined) {

            if (typeof data.duration !== "number") {
                return res.status(400).send("Duration must be a number");
            }

            if (data.duration <= 0) {
                return res.status(400).send("Duration must be greater than 0");
            }
        }

        if (data.description !== undefined) {
            data.description = data.description.trim();
        }

        if (data.service_id !== undefined) {

            if (data.service_id.trim() === "") {
                return res.status(400).send("Service ID is required");
            }

            data.service_id = data.service_id.trim();

            const existingService = await service.findOne({
                service_id: data.service_id
            });

            if (
                existingService &&
                existingService.service_id !== req.params.id
            ) {
                return res.status(400).send("Service ID already exists");
            }
        }

        const result = await service.updateOne(
            { service_id: req.params.id },
            data
        );

        if (result.matchedCount === 0) {
            return res.status(404).send("Service not found");
        }

        res.send(result);

    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
module.exports = router

