const express = require("express");
const mongoose = require("mongoose");
const mongoUrl = "mongodb://localhost:27017/salon_management_system";
const app = express();
var jwt = require("jsonwebtoken");
app.use(express.json()); 

const userRoutes = require("./Routes/user_routes")
const customerRoutes = require("./Routes/customer_routes")
const barberRoutes = require("./Routes/barber_routes")
const serviceRoutes = require("./Routes/service_routes")
const attendanceRoutes = require("./Routes/attendance_routes")
const appointmentRoutes = require("./Routes/appointment_routes")
const wagerecordRoutes = require("./Routes/wagerecord_routes")


mongoose.connect(mongoUrl)
.then(() => {
    console.log("MongoDB Connected");

    app.post("/login", (req, res) => {
      console.log("Login Request: ", req.body);
    if (req.body.username == "Admin" && req.body.password == "admin123") {
      var token = jwt.sign({ username: "Admin", img: "asdfasdf" }, "shhhhh");
      res.status(200).send({
        isValid: true,
        token,
      });
    } else {
      res.status(401).send({ isValid: false });
    }
  });

  app.use((req, res, next) => {
    try {
      let token = req.headers.authorization.split(" ")[1];
      var decoded = jwt.verify(token, "shhhhh");
      next();
    } catch (e) {
      res.status(401).send("Unauthorized");
    }
  });

  app.use("/users", userRoutes);
  app.use("/customers", customerRoutes)
  app.use("/barbers", barberRoutes)
  app.use("/services", serviceRoutes)
  app.use("/attendance", attendanceRoutes)
  app.use("/appointments", appointmentRoutes)
  app.use("/wagerecords", wagerecordRoutes)

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
})
.catch(err => console.log(err));


    

   


