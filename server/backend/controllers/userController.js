import User from "../model/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()


export const signup = async (req, res) =>{
    // const {name, username, email, password} = req.body
    const {username, password}= req.body
    try {
        const isNameExist = await User.findOne({username})
        if(isNameExist){
            res.send("username already exist")
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const user = new User({
            
            username,
           
            password:hashPassword
        })

        await user.save()
        res.status(200).json({message: "user has been saved successfully", data: user})
        
    } catch (error) {
        res.status(404).json("server error")
    }

}


export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User  not found" });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send response with token
        res.status(200).json({ message: "Login successful", token });
        
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

// Assuming you have a blacklist or session store
const tokenBlacklist = new Set(); // This is a simple example; consider using a database for production

export const logout = (req, res) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (token) {
        tokenBlacklist.add(token); // Add token to blacklist
        res.status(200).json({ message: "Logout successful" });
    } else {
        res.status(400).json({ message: "Token not provided" });
    }
}

