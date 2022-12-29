const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String },
    postDate: { type: String },
    where: { type: String },
    description: { type: String },
    eventPic: { type: String },
    course: { type: String },
    year: { type: Number },
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
});

const Events = mongoose.model("events", eventSchema);
module.exports = { Events };
