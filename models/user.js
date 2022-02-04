const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');
// const bcryptSalt =10

const UserSchema = new Schema({
    level: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique:false,
    },
    password: {
        type: String,
        required: false,
    },
    role: { 
        type:String ,
        enum: ["admin" , "manager" , "staff"],
     },
        

    team: {
        type: String,
    
    },
    
    dateCreated: {
        type: Date,
        default: Date.now(),
    },
});
// UserSchema.pre("save" , async function(next){
//     if(!this.isModified("password")){
//         return next();
//     }
//     const hash = await bcrypt.hash(this.password , Number(bcryptSalt));
//     this.password = hash;
//     next();
// })

module.exports.User = mongoose.model("user", UserSchema);