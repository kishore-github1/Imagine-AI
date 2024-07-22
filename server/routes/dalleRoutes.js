import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';


dotenv.config();

const router = express.Router();

const apiKey = process.env.LIMEWIRE_API_KEY;
router.route('/').post(async(req,res) =>{
    try{
        const {prompt} = req.body;
        
            const resp = await fetch(
              `https://api.limewire.com/api/image/generation`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Api-Version': 'v1',
                  Accept: 'application/json',
                  Authorization:`Bearer ${apiKey}`
                },
                body: JSON.stringify({
                  prompt: prompt,
                  aspect_ratio: '1:1'
                })
              }
            );
          
            const data = await resp.json();
            console.log(data);
            
            if (data.status === 'COMPLETED' && data.data.length > 0) {
                const imageUrl = data.data[0].asset_url;
                res.status(200).json({ imageUrl: imageUrl });
            } else {
                res.status(500).send('Image generation failed or no image URL found.');
            }
        } catch (error) {
            console.log(error);
            res.status(500).send(error?.response?.data?.error?.message || 'Internal Server Error');
        }


})

export default router;