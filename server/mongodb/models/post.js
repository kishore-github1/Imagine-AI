import mongoose from "mongoose";

const Post = new mongoose.Schema({
    name: { type: String , required:false},
    prompt: { type: String, required:false},
    photo: { type: String, required: false},
});

const PostSchema = mongoose.model('Post',Post);

export default PostSchema;