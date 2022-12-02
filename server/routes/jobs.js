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

//get single user
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

//find and update
router.put("/updateJob", upload.single("companyLogo"), async (req, res) => {
    const id = req.body.id;
    const companyLogod = await Jobs.findById(id);
    const newFileName = req.file.originalname;
    //  companyLogod.companyLogo || req.file.originalname;
    // if (typeof req.file.originalname !== "undefined") {
    //     newFileName = req.file.originalname;
    // } else {
    //     newFileName = companyLogod.companyLogo;
    // }

    console.log(companyLogod.companyLogo);
    const newTitle = req.body.title;
    const newCompanyName = req.body.companyName;
    const newLocation = req.body.location;
    const newEntryLevel = req.body.entryLevel;
    const newDescription = req.body.description;

    // await Jobs.findById(id)
    //     .then((job) => {
    //         job.title = newTitle;
    //         job.companyName = newCompanyName;
    //         job.location = newLocation;
    //         job.entryLevel = newEntryLevel;
    //         job.description = newDescription;
    //         job.companyLogo = newFileName;

    //         job.save().then(() => {
    //             res.json("job updated");
    //         });
    //     })
    //     .catch((err) => {
    //         res.status(400).send(err.message);
    //     });
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
