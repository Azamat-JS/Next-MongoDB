import { model, models, Schema } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false,
        default: "user",
        enum: ['user', 'admin'],
    }
}, {
    timestamps: true
})

const User =
    models.User || model("User", userSchema);

export default User;