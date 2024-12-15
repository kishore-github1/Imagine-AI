import express from "express";
import User from "../mongodb/models/user.js";
import jwt from "jsonwebtoken";
import { authenticateJwt, secret } from "../middleware/auth.js"; // Ensure proper destructuring of exports
import Post from "../mongodb/models/post.js"; // Import the Post model if not already imported
import cloudinary from 'cloudinary'; // Make sure cloudinary is properly configured

const router = express.Router();

// SignUp
router.route('/signUp').post(async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name,email,password);

        const new_user = new User({ name, email, password });
        await new_user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.route('/login').post(async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (user) {
            const token = jwt.sign(
                { userId: user._id, email: email },
                secret,
                { expiresIn: '1h' }  // Use expiresIn instead of expiry
            );
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update posts in user
router.route('/addPostToUser').post(authenticateJwt, async (req, res) => {
    try {
        const email = 'kishore@gmail.com'; // Assuming this is temporary and will be dynamic
        const { name, prompt, photo } = req.body;
        let photoUrl;

        try {
            const uploadResponse = await cloudinary.uploader.upload(photo);
            photoUrl = uploadResponse.secure_url;
        } catch (uploadError) {
            return res.status(500).json({
                success: false,
                message: "Image upload failed",
                error: uploadError.message,
            });
        }

        const newPost = new Post({
            name,
            prompt,
            photo: photoUrl,
        });

        await newPost.save();

        // Find the user by email and update posts
        const user = await User.findOneAndUpdate(
            { email },
            { $push: { posts: newPost._id } },
            { new: true }
        ).populate("posts");

        console.log("user",user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});



export default router;
