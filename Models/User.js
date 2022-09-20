import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
        {
            username:{type:String, require:true, unique:true, trim:true},
            email:{type:String, require:true, unique:true, trim:true},
            password:{type:String, require:true, trim:true},
            isAdmin:{
                type:Boolean,
                default:false,
            },
        },
        {
            timestamps:true
        
        }
);

const UserModel = mongoose.model("User",UserSchema);

export default UserModel