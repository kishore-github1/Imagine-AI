import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    name: { type: String , required:false},
    prompt: { type: String, required:false},
    photo: { type: String, required: false},
});

const Post = mongoose.model('Post',PostSchema);

export default Post;