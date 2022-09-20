import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
        {
            userId:{type:String, require:true},
            products:[{
                    productId:{type:String},
                    quantity:{type:Number,default:1},
                },],
           
        },
        {
            timestamps:true
        
        }
);

const CartModel = mongoose.model("Cart",CartSchema);

export default CartModel