import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
    },
    name:{
        type: String,
    },
    photo:{
        type: String,
    },
    google_sub:{
        type: String,
    },
    phone_number:{
        type: String,
    },
    
},{
    timestamps: true,
});

export default mongoose.models.User || mongoose.model('User', userSchema);