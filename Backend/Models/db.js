const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MongoDB URI is not defined in environment variables');
        }
        
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

connectDB();