const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobsSchema = new Schema({
    title: { type: String },
    companyName: { type: String },
    location: { type: String },
    entryLevel: { type: String },
    description: { type: String },
    companyLogo: { type: String, required: false },
    postDate: { type: Date, default: Date.now },
});

const Jobs = mongoose.model("Jobs", jobsSchema);
module.exports = { Jobs };
