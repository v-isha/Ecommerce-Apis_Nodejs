import express from 'express'
import User from '../Models/User.js'
import crypto from 'crypto-js'
import  {verifyTokenandAuthorization,verifyTokenAdmin}  from '../Middlewares/VerifyToken.js'
const router = express.Router()




// UPDATE
router.put("/:id",verifyTokenandAuthorization, async (req,res)=>{
            if(req.body.password){
                req.body.password=crypto.AES.encrypt(req.body.password,process.env.PASSWORD).toString();
            }
            try {

                const updateuser = await User.findByIdAndUpdate(
                  req.params.id, 
                    {
                        $set : req.body
                    },
                    {
                        new:true
                    }
                );
                res.status(200).json(updateuser);
                
            } catch (error) {
                res.status(500).json(error);  
            }

});


// DELETE

router.delete("/:id",verifyTokenandAuthorization, async (req,res)=>{
    
    try {

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
        
    } catch (error) {
        res.status(500).json(error);  
    }

});

// GET USER BY ID

router.get("/find/:id",verifyTokenAdmin, async (req,res)=>{
    try {

        const user = await User.findById(req.params.id);
        const {password,...others}= user._doc;
        res.status(200).json(others);
        
    } catch (error) {
        res.status(500).json(error);  
    }

});

// GET ALL USER AT A TIME plus @1.15.44
router.get("/user",verifyTokenAdmin, async (req,res)=>{
    try {

        const user = await User.find();
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json(error);  
    }

});


// GET USER STATS
// pending



















export default router