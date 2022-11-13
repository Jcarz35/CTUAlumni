const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobsSchema = new Schema({
    title: { type: String, required: true },

    postDate: { type: Date, default: Date.now },
});

const Jobs = mongoose.model("Jobs", jobsSchema);
module.exports = { Jobs };
