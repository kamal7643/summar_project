import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    url:{
        type: String,
        required: true,
        unique: true,
    },
    thumbnail:{
        type: String,
        required: false,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    views:{
        type: Number,
        default: 0,
    },
    likes:{
        type: Number,
        default: 0,
    },
    dislikes:{
        type: Number,
        default: 0,
    },
    comments:{
        type: Number,
        default: 0,
    },
    is_public:{
        type: Boolean,
        default: true,
    },
    is_deleted:{
        type: Boolean,
        default: false,
    },
    for_kids:{
        type: Boolean,
        default: false,
    }
},
{
    timestamps: true,
});


export default mongoose.models.Video || mongoose.model('Video', videoSchema);