import mongoose from 'mongoose'

const CarSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: [String],
    images: [String],
});

const Car = mongoose.model("Car", CarSchema);
export default Car;
