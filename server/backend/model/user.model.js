import mongoose from "mongoose";

const userData = mongoose.Schema({
        
        name: String,
        username: String,
        email: String,
        password: String,

},

{
    timestamps:true
}
)


const User = mongoose.model("UserData",userData);


export default User;
