import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// GET ALL POSTS
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// CREATE A POST
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    if (!name || !prompt || !photo) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    let photoUrl;
    try {
        photoUrl = await cloudinary.uploader.upload(photo);
    } catch (uploadError) {
        return res
          .status(500)
          .json({
            success: false,
            message: "Image upload failed",
            error: uploadError.message,
          });
    }
    console.log(photoUrl);
    const newPost = new Post({
      name,
      prompt,
      photo: photoUrl.secure_url,
    });
    await newPost.save();

    console.log(newPost);

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

export default router;
