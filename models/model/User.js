import { Schema ,model } from "mongoose";

const UserSchema = Schema({
    name: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    role:{type:String , enum:['user','admin' ,'member'] , default:'user'},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now},
    address:{
        street:{type:String},
        city:{type:String},
        country:{type:String},
        zip:{type:String}
        
    },
    phone:{type:String},
    
},{
    timestamps:true,
})


const User = model('User',UserSchema);
export default User;