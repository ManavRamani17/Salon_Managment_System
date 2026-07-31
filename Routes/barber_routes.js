const express = require("express")
const router = express.Router()

const barber = require("../models/barber")
const user = require("../models/user")

    router.get('/', async (req,res)=>{
        const result = await barber.find();
        res.send(result)
    })

    router.get('/:id', async (req,res)=>{
        const result = await barber.findOne({barber_id:req.params.id});
        res.send(result)
    })

    router.delete('/:id', async (req,res)=>{
        const result = await barber.deleteOne({barber_id:req.params.id});
        res.send(result)
    })

    router.post('/', async (req, res) => {

    try {

        const data = req.body;

        if (!data.barber_id || data.barber_id.trim() == "") {
            return res.status(400).send("Barber ID is required");
        }

        data.barber_id = data.barber_id.trim();

        const existingBarber = await barber.findOne({
            barber_id: data.barber_id
        });

        if (existingBarber) {
            return res.status(400).send("Barber ID already exists");
        }

        if (!data.user_id || data.user_id.trim() == "") {
            return res.status(400).send("User ID is required");
        }

        data.user_id = data.user_id.trim();

        const existingUser = await user.findOne({
            user_id: data.user_id
        });

        if (!existingUser) {
            return res.status(400).send("User ID does not exist pls create a new user");
        }

        const assignedBarber = await barber.findOne({
            user_id: data.user_id
        });

        if (assignedBarber) {
            return res.status(400).send("This User ID is already assigned to another barber");
        }

        if (existingUser.role !== "Barber") {
            return res.status(400).send("Selected User is not a Barber");
        }

        if (!data.specialization || data.specialization.trim() == "") {
            return res.status(400).send("Specialization is required");
        }

        data.specialization = data.specialization.trim();

        if (data.commission_percentage == undefined) {
            return res.status(400).send("Commission Percentage is required");
        }

        if (typeof data.commission_percentage !== "number") {
            return res.status(400).send("Commission Percentage must be a number");
        }

        if (
            data.commission_percentage < 0 ||
            data.commission_percentage > 100
        ) {
            return res.status(400).send("Commission Percentage must be between 0 and 100");
        }

        if (!data.joining_date) {
            return res.status(400).send("Joining Date is required");
        }

        if (isNaN(new Date(data.joining_date).getTime())) {
            return res.status(400).send("Invalid Joining Date");
        }

        const result = await barber.create(data);

        res.status(201).send(result);

    }
    catch (err) {
        res.status(500).send(err.message);
    }

});

    router.patch('/:id', async (req, res) => {

    try {

        const data = req.body;

        if (data.barber_id !== undefined) {

            if (data.barber_id.trim() == "") {
                return res.status(400).send("Barber ID cannot be empty");
            }

            data.barber_id = data.barber_id.trim();

            const existingBarber = await barber.findOne({
                barber_id: data.barber_id
            });

            if (
                existingBarber &&
                existingBarber.barber_id !== req.params.id
            ) {
                return res.status(400).send("Barber ID already exists");
            }
        }

        if (data.user_id !== undefined) {

            if (data.user_id.trim() == "") {
                return res.status(400).send("User ID cannot be empty");
            }

            data.user_id = data.user_id.trim();

            const existingUser = await user.findOne({
                user_id: data.user_id
            });

            if (!existingUser) {
                return res.status(400).send("User ID does not exist");
            }

            const assignedBarber = await barber.findOne({
                user_id: data.user_id
            });

            if (
                assignedBarber &&
                assignedBarber.barber_id !== req.params.id
            ) {
                return res.status(400).send("This User ID is already assigned to another barber");
            }

            if (existingUser.role !== "Barber") {
                return res.status(400).send("Selected User is not a Barber");
            }
        }

        if (data.specialization !== undefined) {

            if (data.specialization.trim() == "") {
                return res.status(400).send("Specialization cannot be empty");
            }

            data.specialization = data.specialization.trim();
        }

        if (data.commission_percentage !== undefined) {

            if (typeof data.commission_percentage !== "number") {
                return res.status(400).send("Commission Percentage must be a number");
            }

            if (
                data.commission_percentage < 0 ||
                data.commission_percentage > 100
            ) {
                return res.status(400).send("Commission Percentage must be between 0 and 100");
            }
        }

        if (data.joining_date !== undefined) {

            if (isNaN(new Date(data.joining_date).getTime())) {
                return res.status(400).send("Invalid Joining Date");
            }
        }

        const result = await barber.updateOne(
            { barber_id: req.params.id },
            data
        );

        if (result.matchedCount === 0) {
            return res.status(404).send("Barber not found");
        }

        res.send(result);

    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
module.exports = router