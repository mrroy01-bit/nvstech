const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

connectDB();