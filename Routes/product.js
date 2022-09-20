import Product from '../Models/Product.js'
import express from 'express'
import  {verifyTokenandAuthorization,verifyTokenAdmin}  from '../Middlewares/VerifyToken.js'

const router = express.Router()

// CREATE PRODUCTS
router.post("/",verifyTokenAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
  
    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });



//   UPDATE PRODUCTS
router.put("/:id",verifyTokenAdmin, async (req,res)=>{
    
    try {

        const updateproduct = await Product.findByIdAndUpdate(
          req.params.id, 
            {
                $set : req.body
            },
            {
                new:true
            }
        );
        res.status(200).json(updateproduct);
        
    } catch (error) {
        res.status(500).json(error);  
    }

});


// DELETE PRODUCTS

router.delete("/:id",verifyTokenAdmin, async (req,res)=>{
    
    try {

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted");
        
    } catch (error) {
        res.status(500).json(error);  
    }

});


// GET PRODUCT BY ID

router.get("/find/:id",verifyTokenAdmin, async (req,res)=>{
    try {

        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json(error);  
    }

});

// GET ALL PRODUCT AT A TIME @1.28.00
router.get("/product",verifyTokenAdmin, async (req,res)=>{
    try {

        const user = await Product.find();
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json(error);  
    }

});



 









export default router;