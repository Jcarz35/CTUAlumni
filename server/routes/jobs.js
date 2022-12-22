const express = require("express");
const router = express.Router();

//import ang model
const { Jobs } = require("../models/jobs");

const multer = require("multer");
// desk storage para image upload
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./companyLogo/");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

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

//get single Job
router.get("/job/:id", async (req, res) => {
    const job = await Jobs.findById(req.params.id);

    if (job) {
        res.json(job);
    } else {
        res.status(404);
    }
});

// add job post
router.post("/add", upload.single("companyLogo"), async (req, res, next) => {
    const companyLogo = req.file.originalname;
    try {
        await new Jobs({
            title: req.body.title,
            companyName: req.body.companyName,
            location: req.body.location,
            entryLevel: req.body.entryLevel,
            description: req.body.description,
            companyLogo: companyLogo,
        }).save();
        console.log("success");
    } catch (err) {
        console.log(err);
    }
});

//find and update single job
router.put("/updateJob", async (req, res) => {
    const id = req.body.id;

    const newTitle = req.body.newTitle;
    const newCompanyName = req.body.newCompanyName;
    const newLocation = req.body.newLocation;
    const newEntryLevel = req.body.newEntryLevel;
    const newDescription = req.body.newDescription;

    try {
        await Jobs.updateOne(
            { _id: id },
            {
                $set: {
                    title: newTitle,
                    companyName: newCompanyName,
                    location: newLocation,
                    entryLevel: newEntryLevel,
                    description: newDescription,
                    postDate: Date.now(),
                },
            }
        );
    } catch (err) {
        console.log("Error " + err);
    }

    res.send("Updated");
});

//find and update companyLogo of a single job
router.put("/updateJobLogo", upload.single("companyLogo"), async (req, res) => {
    const id = req.body.id;
    const newFileName = req.file.originalname;

    try {
        await Jobs.updateOne(
            { _id: id },
            {
                $set: {
                    companyLogo: newFileName,
                    postDate: Date.now(),
                },
            }
        );
    } catch (err) {
        console.log("Error " + err);
    }

    res.send("Updated");
});

//delete Job
router.delete("/deleteJob/:id", async (req, res) => {
    const id = req.params.id;
    await Jobs.findByIdAndRemove(id).exec();

    res.send("item deleted");
    console.log("na delete ng job");
});

module.exports = router;
