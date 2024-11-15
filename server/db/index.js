import mongoose from 'mongoose'
import {config} from 'dotenv'

config()


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected");
        console.log(connectionInstance.connection.host);

    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1)

    }

}

export default connectDB