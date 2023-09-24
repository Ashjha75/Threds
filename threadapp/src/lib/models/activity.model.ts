import mongoose from "mongoose";
import { string } from "zod";

const activitySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["follows", "likes", "comment"],
        required: true,
    },
    readed: {
        type: Boolean,
        default: false
    },
    data: {
        follows: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        likes: {
            ThreadId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Thread",
            },
            likerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        },
        comment: {
            ThreadId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Thread",
            },
            likerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Activity = mongoose.models.activity || mongoose.model("activity", activitySchema);
export default Activity;

