import express from "express";
const router = express.Router()
import User from '../Models/User.js'
import crypto from 'crypto-js'
import jwt from 'jsonwebtoken'

// REGISTRATION SECTION
router.post('/signup', async (req,res)=>{
            const newUser = new User({
                username:req.body.username,
                email:req.body.email,
                password:crypto.AES.encrypt(req.body.password,process.env.PASSWORD).toString(),
            });
            try {
                const savedUser = await newUser.save();
                res.status(201).json(savedUser);
            } catch (error) {
                res.status(500).json(error);

            }
});



// LOGIN SECTION
router.post('/login', async (req,res)=>{

        try {
                    const user = await User.findOne({username:req.body.username});
                    !user && res.status(401).json("wrong credientials")
                    
                    const hashedpassword = crypto.AES.decrypt(user.password,process.env.PASSWORD);
                    const originalpassword = hashedpassword.toString(crypto.enc.Utf8);
                    originalpassword !== req.body.password &&
                       res.status(401).json("wrong cred")

                       const accessToken =jwt.sign(
                        {
                        id:user._id,
                        isAdmin:user.isAdmin,
                        },
                        process.env.JWT_SKEY,
                        {expiresIn:"5d"}
                       );

                    const {password,...others} = user._doc ;
                    res.status(200).json({...others,accessToken})




        } catch (error) {
            res.status(500).json(error)
        }







});














export default router