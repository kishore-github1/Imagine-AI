import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Add unique constraint
    },
    password: {
        type: String,
        required: true,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const User = mongoose.model('User', userSchema);

export default User;
