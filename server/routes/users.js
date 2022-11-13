const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const multer = require("multer");

// desk storage para image upload
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

// para register
router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(409)
                .send({ message: "User with given email already Exist!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({
            ...req.body,
            password: hashPassword,
            middleName: null,
            bio: null,
            phone: undefined,
            gender: null,
            age: null,
            course: null,
            schoolYear: null,
            empStat: null,
            profilePic: "profile.png",
        }).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// get all data
router.get("/all", async (req, res) => {
    User.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

//get single user
router.get("/user/:id", async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not Found");
    }
});

//find and update
router.put("/updateUser", async (req, res) => {
    const id = req.body.id;

    const newFirstName = req.body.newfirstName;
    const newLastName = req.body.newlastName;
    const newMiddleName = req.body.newmiddleName;
    const newBio = req.body.newbio;
    const newPhone = req.body.newphone;
    const newGender = req.body.newgender;
    const newAge = req.body.newage;
    const newCourse = req.body.newcourse;
    const newSchoolYear = req.body.newschoolYear;
    const newEmpStat = req.body.newempstat;

    try {
        await User.updateOne(
            { _id: id },
            {
                $set: {
                    firstName: newFirstName,
                    lastName: newLastName,
                    middleName: newMiddleName,
                    bio: newBio,
                    phone: newPhone,
                    gender: newGender,
                    age: newAge,
                    course: newCourse,
                    schoolYear: newSchoolYear,
                    empStat: newEmpStat,
                },
            }
        );
    } catch (err) {
        console.log("Error " + err);
    }

    res.send("Updated");
});

router.put(
    "/updateProfilePic",
    upload.single("profilePic"),
    async (req, res) => {
        const id = req.body.id;
        const pic = req.file.originalname;

        try {
            await User.updateOne(
                { _id: id },
                {
                    $set: {
                        profilePic: pic,
                    },
                }
            );
        } catch (err) {
            console.log("Error " + err);
        }
        res.send("Updated");
    }
);
router.delete("/deleteUser/:id", async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndRemove(id).exec();

    res.send("item deleted");
});

module.exports = router;
