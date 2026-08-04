const express = require("express")
const router = express.Router()

const appointment = require("../models/appointment")
const customer = require("../models/customer");
const barber = require("../models/barber");
const service = require("../models/service");

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

    router.post('/', async (req, res) => {
    try {
        const data = req.body;

        if (!data.appointment_id || data.appointment_id.trim() == "") {
            return res.status(400).send("Appointment ID is required");
        }

        data.appointment_id = data.appointment_id.trim();

        const existingAppointment = await appointment.findOne({
            appointment_id: data.appointment_id
        });

        if (existingAppointment) {
            return res.status(400).send("Appointment ID already exists");
        }

        if (!data.customer_id || data.customer_id.trim() == "") {
            return res.status(400).send("Customer ID is required");
        }

        data.customer_id = data.customer_id.trim();

        const existingCustomer = await customer.findOne({
            customer_id: data.customer_id
        });

        if (!existingCustomer) {
            return res.status(400).send("Customer ID does not exist");
        }

        if (!data.barber_id || data.barber_id.trim() == "") {
            return res.status(400).send("Barber ID is required");
        }

        data.barber_id = data.barber_id.trim();

        const existingBarber = await barber.findOne({
            barber_id: data.barber_id
        });

        if (!existingBarber) {
            return res.status(400).send("Barber ID does not exist");
        }

        if (!data.service_id || data.service_id.trim() == "") {
            return res.status(400).send("Service ID is required");
        }

        data.service_id = data.service_id.trim();

        const existingService = await service.findOne({
            service_id: data.service_id
        });

        if (!existingService) {
            return res.status(400).send("Service ID does not exist");
        }

        if (!data.appointment_date) {
            return res.status(400).send("Appointment Date is required");
        }

        if (isNaN(new Date(data.appointment_date).getTime())) {
            return res.status(400).send("Invalid Appointment Date");
        }

        if (!data.status || data.status.trim() == "") {
            return res.status(400).send("Status is required");
        }

        data.status = data.status.trim();

        const validStatus = [
            "Pending",
            "Scheduled",
            "Completed",
            "Cancelled"
        ];

        if (!validStatus.includes(data.status)) {
            return res.status(400).send("Invalid Status");
        }
        

        const existingBooking = await appointment.findOne({
            barber_id: data.barber_id,
            appointment_date: new Date(data.appointment_date),
            status: {
                $ne: "Cancelled"
            }
        });
        if (existingBooking) {
            return res.status(400).send("Barber already has an appointment at this time");
        }
        const appointmentTime = new Date(data.appointment_date);
        const hour = appointmentTime.getHours();

            if (hour < 9 || hour >= 19) {
                return res.status(400).send("Salon timing is 9 AM to 7 PM");
            }

        const holidays = [
                    "2026-01-26",
                    "2026-08-15",
                    "2026-10-02",
                    "2026-12-25",
                    "2026-10-31",
                ];
            const appointmentDay = appointmentTime.toISOString().split("T")[0];

            if (holidays.includes(appointmentDay)) {
                return res.status(400).send("Appointments cannot be booked on holidays");
            }

        if (data.remarks) {
            data.remarks = data.remarks.trim();
        }

        const result = await appointment.create(data);
        res.status(201).send(result);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

    router.patch('/:id', async (req, res) => {

    try {
        const data = req.body;

        if (data.appointment_id !== undefined) {
            return res.status(400).send("Appointment ID cannot be updated");
        }

        if (data.customer_id !== undefined) {

            if (data.customer_id.trim() == "") {
                return res.status(400).send("Customer ID cannot be empty");
            }

            data.customer_id = data.customer_id.trim();

            const existingCustomer = await customer.findOne({
                customer_id: data.customer_id
            });

            if (!existingCustomer) {
                return res.status(400).send("Customer ID does not exist");
            }
        }

        if (data.barber_id !== undefined) {

            if (data.barber_id.trim() == "") {
                return res.status(400).send("Barber ID cannot be empty");
            }

            data.barber_id = data.barber_id.trim();

            const existingBarber = await barber.findOne({
                barber_id: data.barber_id
            });

            if (!existingBarber) {
                return res.status(400).send("Barber ID does not exist");
            }
        }

        if (data.service_id !== undefined) {

            if (data.service_id.trim() == "") {
                return res.status(400).send("Service ID cannot be empty");
            }

            data.service_id = data.service_id.trim();

            const existingService = await service.findOne({
                service_id: data.service_id
            });

            if (!existingService) {
                return res.status(400).send("Service ID does not exist");
            }
        }

        if (data.appointment_date !== undefined) {

            if (isNaN(new Date(data.appointment_date).getTime())) {
                return res.status(400).send("Invalid Appointment Date");
            }

            const appointmentTime = new Date(data.appointment_date);

            const hour = appointmentTime.getHours();

            if (hour < 9 || hour >= 19) {
                return res.status(400).send("Salon timing is 9 AM to 7 PM");
            }

            if (data.appointment_date !== undefined) {

                const appointmentTime = new Date(data.appointment_date);
                const hour = appointmentTime.getHours();

                if (hour < 9 || hour >= 19) {
                    return res.status(400).send("Appointments can only be booked between 9 AM and 7 PM");
                }

                const holidays = [
                    "2026-01-26",
                    "2026-08-15",
                    "2026-10-02",
                    "2026-12-25",
                    "2026-10-31",
                ];
                const appointmentDay = appointmentTime.toISOString().split("T")[0];

                if (holidays.includes(appointmentDay)) {
                    return res.status(400).send("Appointments cannot be booked on holidays");
                }
            }
        }
        if (data.status !== undefined) {

            if (data.status.trim() == "") {
                return res.status(400).send("Status cannot be empty");
            }

            data.status = data.status.trim();

            const validStatus = [
                "Pending",
                "Scheduled",
                "Completed",
                "Cancelled"
            ];
            if (!validStatus.includes(data.status)) {
                return res.status(400).send("Invalid Status");
            }
        }

        if (data.remarks !== undefined) {
            data.remarks = data.remarks.trim();
        }

        if (
            data.barber_id !== undefined ||
            data.appointment_date !== undefined
        ) {

            const currentAppointment = await appointment.findOne({
                appointment_id: req.params.id
            });

            if (!currentAppointment) {
                return res.status(404).send("Appointment not found");
            }

            const barberId =data.barber_id || currentAppointment.barber_id;

            const appointmentDate = data.appointment_date || currentAppointment.appointment_date;

            const existingBooking = await appointment.findOne({
                barber_id: barberId,
                appointment_date: appointmentDate,
                appointment_id: {
                    $ne: req.params.id
                },
                status: {
                    $ne: "Cancelled"
                }
            });

            if (existingBooking) {
                return res.status(400).send("Barber already has an appointment at this time");
            }
        }
        const result = await appointment.updateOne(
            { appointment_id: req.params.id },
            { $set: data }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send("Appointment not found");
        }
        res.send(result);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
module.exports = router