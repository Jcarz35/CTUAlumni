const router = require("express").Router();
const { Events } = require("../models/events");
const { User } = require("../models/user");
const ObjectId = require("mongodb").ObjectId;

// events picure
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./eventPic/");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

//add event
router.post("/addEvent", upload.single("eventPic"), async (req, res) => {
    const pic = req.file.originalname;
    try {
        const event = await new Events({
            title: req.body.title,
            description: req.body.description,
            eventPic: pic,
            postDate: req.body.date,
            course: req.body.course,
            year: req.body.year,
        });
        event.save((error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("success");
            }
        });

        // para sa mga alumni nga apil sa events
        await User.findOneAndUpdate(
            {
                $and: [
                    {
                        course: req.body.course,
                        schoolYear: req.body.year,
                    },
                ],
            },

            { $push: { notification: event._id } }
        );

        // para sa admin
        await User.findOneAndUpdate(
            {
                isAdmin: true,
            },

            { $push: { notification: event._id } }
        );
    } catch (error) {
        console.log(error);
    }
});

// get all events post
router.get("/all/:id", async (req, res) => {
    const id = req.params.id;
    const notification = await User.findById({ _id: id });

    // res.json(notification);
    const notifArray = notification.notification;
    const list = await Promise.all(
        notifArray.map(async (Id) => {
            return await Events.find({ _id: Id });
        })
    );

    res.status(200).json(list.flat());
});

//get single events
router.get("/event/:id", async (req, res) => {
    const event = await Events.findById(req.params.id);

    if (event) {
        res.json(event);
    } else {
        res.status(404);
    }
});

//delete event
router.delete("/deleteEvent/:id", async (req, res) => {
    const id = req.params.id;
    await Events.findByIdAndRemove(id).exec();

    res.send("item deleted");
    console.log("na delete ng job");
});

module.exports = router;
