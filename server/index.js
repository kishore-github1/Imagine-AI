import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import limeWireRoutes from './routes/limeWireRoutes.js';
import userRoute from './routes/userRoute.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/post', postRoutes);
app.use('/api/limeWire', limeWireRoutes);
app.use('/api/users', userRoute);

app.get('/' , async(req,res) => {
    res.send('Hello');
})

const startServer = async()=>{

    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8000, () => console.log('Server has started on port http://localhost:8000'))
    } catch(error){
        console.log(error);
    }
    
}

startServer();
