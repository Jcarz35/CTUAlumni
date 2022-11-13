const express = require("express");
const router = express.Router();

//import ang model
const { Jobs } = require("../models/jobs");

//request get all jobs
router.get("/", (req, res) => {
    Jobs.find()
        .then((article) => {
            res.json(article);
        })
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

// get all jobs post
router.get("/all", async (req, res) => {
    Jobs.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

//get single user
router.get("/job/:id", async (req, res) => {
    const job = await Jobs.findById(req.params.id);

    if (job) {
        res.json(job);
    } else {
        res.status(404);
        throw new Error("Job not Found");
    }
});

// add job post
router.put("/articles/add", (req, res, next) => {
    const newJobs = new Jobs({
        title: req.body.title,
    });

    newJobs
        .save()
        .then(() => res.json("new Job Posted"))
        .catch((err) => res.status(400).json("Error"));
});

module.exports = router;
