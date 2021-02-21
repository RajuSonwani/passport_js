require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

const router = require("./routes/routes")

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));

app.use("/public",express.static(path.join(__dirname,"public")))
app.use("/auth",router);

app.get("/",(req,res)=>{
    res.render("login")
})

app.listen(process.env.port,()=>{
    console.log("server running..!")
})



