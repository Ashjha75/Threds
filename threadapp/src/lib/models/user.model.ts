import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: String, default: null,
    },

    username: {
        type: String,
        required: [true, "Please provide a Username."],
    },
    email: {
        type: String,
        required: [true, "Please provide a Email."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a Password."],
    },
    name: {
        type: String, default: null,
    },
    image: String,
    bio: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    threads: [{
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: "Thread"
    }],
    onboarded: {
        type: Boolean,
        default: false
    },
    communities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
        default: null,
    }],
})

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;