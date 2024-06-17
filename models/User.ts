import mongoose from "mongoose";
import friendRequestSchema from "./subSchema/friendRequest";

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
    friends:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    friend_requests:[friendRequestSchema],
},{
    timestamps: true,
});

export default mongoose.models.User || mongoose.model('User', userSchema);