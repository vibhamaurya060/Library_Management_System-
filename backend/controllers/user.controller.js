const userModel = require("../models/user.model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const blacklistModel = require("../models/blacklist.model");

const register = async(req, res)=>{
    try {
        const {username, password, role}= req.body;
        if(!username || !password || !role){
            return res.status(400).json({message: "All fields are required"});
        }

        const existingUser=await userModel.findOne({username});
        if(existingUser){
            return res.status(409).json({message: "Username already exists"});
        }

        const hashedPassword= await bcrypt.hash(password, 10);

        const newUser= await userModel.create({username, password: hashedPassword, role});
        res.status(201).json({message: "User registered successfully", newUser})
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
};


const login = async(req, res)=>{
    try {
        const {username, password}=req.body;
        const user=await userModel.findOne({username});
        if(!user){
            return res.status(401).json({message: 'Invalid credentials'});
        }
        
        // Compare hashed password
        const isPasswordValid = bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid credentials"});
        }

        //Generate JWT Token
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'} );
        res.status(200).json({message: "Login successfull.", token, role: user.role})

    } catch (error) {
        console.log({error: error});
        res.status(500).json({message: "Server error"})
    }
}

const logout= async(req, res)=>{
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(400).json({message: "Token is required for logout."});
    }

    const decoded=jwt.decode(token);
    if(!decoded || !decoded.exp){
        return res.status(400).json({message: "Invalid token."});
    }

    const expiresAt=new Date(decoded.exp * 1000);
    await blacklistModel.create({token, expiresAt});
    res.status(200).json({message: "Logout successful. Token has been invalidated."});
}

module.exports={register, login, logout};