import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
        {
            title:{type:String, require:true, unique:true, trim:true},
            desc:{type:String, require:true, unique:true, trim:true},
            image:{type:String, require:true, trim:true},
            categories:{type:Array},
            size:{type:String},
            color:{type:String},
            price:{type:Number, require:true},
        },
        {
            timestamps:true
        
        }
);

const ProductModel = mongoose.model("product",ProductSchema);

export default ProductModel