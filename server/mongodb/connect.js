import mongoose from 'mongoose';

const connectDB = (url) =>{
    mongoose.set('strictQuery',true);
    mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true, dbName: "images" })
    .then(() => console.log('MongoDB connected'))
    .catch((err)=> console.log(err));
}

export default connectDB;