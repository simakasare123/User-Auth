const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "new User",
    },
    token: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

module.exports = mongoose.model("token", tokenSchema);