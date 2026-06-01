import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        console.log("DB already connected.");
        return;
    }
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("DB Connected");
    } catch (err) {
        console.error("Error connecting to DB:", err.message);
        throw err;
    }
};

export default connectDB;