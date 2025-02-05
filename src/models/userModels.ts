import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    avatar: {
        type: String,
        default: `https://
        greekherald.com.au/wp-content/uploads/2020/07/default-avatar.png`,
    },
    password: { type: String, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Vehicle" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
