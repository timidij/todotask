import mongoose from "mongoose"

const mongodb = async (req,res) =>{
    let db=""
    if(process.env.mongoURI){
        db = process.env.mongoURI
    }else{
        db = "mongodb://localhost:27017/"
    }
    try {
        mongoose.connect(db)
        console.log("connected to database")
    } catch (error) {
        console.log("unable to connect")
    }
}

export default mongodb










