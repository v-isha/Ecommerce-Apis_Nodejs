import Cart from '../Models/Cart.js'
import express from 'express'
import  {verifyTokenandAuthorization,verifyTokenAdmin,verifyToken}  from '../Middlewares/VerifyToken.js'

const router = express.Router()

// CREATE CART
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
  
    try {
      const savecart = await newCart.save();
      res.status(200).json(savecart);
    } catch (err) {
      res.status(500).json(err);
    }
  });

 

//   UPDATE CART
router.put("/:id",verifyTokenandAuthorization, async (req,res)=>{
    
    try {

        const updatecart = await Cart.findByIdAndUpdate(
          req.params.id, 
            {
                $set : req.body
            },
            {
                new:true
            }
        );
        res.status(200).json(updatecart);
        
    } catch (error) {
        res.status(500).json(error);  
    }

});


// DELETE PRODUCTS

router.delete("/:id",verifyTokenandAuthorization, async (req,res)=>{
    
    try {

        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted");
        
    } catch (error) {
        res.status(500).json(error);  
    }

});


// GET USER CART

router.get("/find/:userid",verifyTokenandAuthorization, async (req,res)=>{
    try {

        const cart = await Cart.findOne({userId:req.params.userid});
        res.status(200).json(cart);
        
    } catch (error) {
        res.status(500).json(error);  
    }

});


// GET ALL USER CART

router.get("/usercart",verifyTokenAdmin,async (req,res)=>{

        try {
                    const cart = await Cart.find();
                    res.status(200).json(cart);

            } catch (error) {
                 res.status(500).json(error);
            }
});



 









export default router;