import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    is_public:{
        type: Boolean,
        default: true,
    },
    is_draft:{
        type: Boolean,
        default: true,
    },
},
{
    timestamps: true,
});

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);