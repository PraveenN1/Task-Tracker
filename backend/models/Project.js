const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

module.exports = model("Project", projectSchema);
