import express from "express"
// import { mongo } from "mongoose"
import mongodb from "./backend/database/db.js"
import dotenv from "dotenv"
import router from "./backend/routes/addTaskRoute.js"
import auth from "./backend/routes/auth.route.js"
import cors from "cors"
const app = express()
app.use(express.json())

dotenv.config()


app.use(cors());
app.get("/api/v4", (req,res)=>{
    res.send("this is wonderful")
    // return console.log("this is working")
})
const users =[
    {
        username:"timi",
        password: "1234",
        isAdmin: true,
    }
]

app.get("/api/v1",(req,res)=>{
    res.send("server is running")
})
//Middleware - URL Encoder
app.use(express.urlencoded({ extended: true }));

app.use(express.json())
app.use("/api/v1", router )
app.use("/api/v1", auth)

mongodb()

app.listen(3000, ()=>{console.log("server is running")})



