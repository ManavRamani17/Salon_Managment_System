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

    router.post('/', async (req, res) => {
    try {
        const data = req.body;

        if (!data.user_id || data.user_id.trim() == "") {
            return res.status(400).send("User ID is required");
        }

        data.user_id = data.user_id.trim();

        const existingUserId = await user.findOne({
            user_id: data.user_id
        });

        if (existingUserId) {
            return res.status(400).send("User ID already exists");
        }

        if (!data.name || data.name.trim() == "") {
            return res.status(400).send("Name is required");
        }

        data.name = data.name.trim();

        if (!data.email || data.email.trim() == "") {
            return res.status(400).send("Email is required");
        }

        data.email = data.email.trim().toLowerCase();

        const existingEmail = await user.findOne({
            email: data.email
        });

        if (existingEmail) {
            return res.status(400).send("Email already exists");
        }

        if (!data.password || data.password.trim() == "") {
            return res.status(400).send("Password is required");
        }

        data.password = data.password.trim();

        if (!data.role || data.role.trim() == "") {
            return res.status(400).send("Role is required");
        }

        data.role = data.role.trim();

        const validRoles = [
            "Administrator",
            "Receptionist",
            "Barber"
        ];

        if (!validRoles.includes(data.role)) {
            return res.status(400).send("Invalid Role");
        }

        if (data.status !== undefined) {

            data.status = data.status.trim();

            const validStatus = [
                "Active",
                "Inactive"
            ];

            if (!validStatus.includes(data.status)) {
                return res.status(400).send("Invalid Status");
            }
        }
        const result = await user.create(data);
        res.status(201).send(result);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

    router.patch('/:id', async (req,res)=>{
        const result = await user.updateOne({user_id:req.params.id},req.body);
        res.send(result)
    })
module.exports = router