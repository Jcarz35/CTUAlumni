const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

const nodemailer = require("nodemailer"); // para send Email

const multer = require("multer"); // para file upload
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

router.post("/addAlumni", async (req, res) => {
    const id = req.body.userId;

    try {
        const user = await User.findOne({ userId: id });

        if (user) {
            return res.status(409).send({
                message: "Alumni ID  already Exist!",
            });

            // res.status(409).send({ message: "Id Already exists" });
        } else {
            try {
                // const salt = await bcrypt.genSalt(Number(process.env.SALT));
                // const hashPassword = await bcrypt.hash(req.body.password, salt);

                await new User({
                    userId: req.body.userId,
                    birthday: req.body.birthday,
                    isAdmin: false,
                    isActive: false,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: "",
                    password: "",
                    middleName: "",
                    profilePic: "profile.png",
                }).save();
                res.status(201).send({ message: "User created successfully" });
                console.log("alumni ADDed successfully");
            } catch (err) {
                console.error(err);
            }
        }
    } catch (error) {
        res.status(409).send({ message: "User Id already existed" });
    }
    // const { error } = validate(req.body);
    // if (error)
    //     return res.status(400).send({ message: error.details[0].message });
    // pangitaon ang Id sa alumni na database
});

// para register
router.put("/register", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        try {
            if (user)
                return res
                    .status(409)
                    .send({ message: "User with given email already Exist!" });
        } catch (error) {
            throw new Error(error.message);
        }

        const userID = await User.findOne({
            $and: [
                {
                    userId: req.body.userId,
                    birthday: req.body.birthday,
                },
            ],
        });

        try {
            if (userID.isActive) {
                return res.status(409).send({
                    message: "Alumni Id Already taken!",
                });
            }
        } catch (error) {
            throw new Error(error.message);
            //  res.status(400).send({ message: error.message });
        }

        if (userID) {
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            try {
                await User.updateOne(
                    { _id: userID._id },

                    {
                        $set: {
                            // firstName: userID.firstName,
                            // lastName: userID.lastName,
                            middleName: "",
                            email: req.body.email,
                            password: hashPassword,
                            isActive: true,
                            isAdmin: false,
                            profilePic: "profile.png",
                            address: "",
                            phone: "",
                            postDate: Date.now(),
                        },
                    }
                );
            } catch (err) {
                console.log("Error " + err);
            }
        } else {
            return res
                .status(409)
                .send({ message: "Wala sa Database imong Alumni ID" });
        }

        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({
            message: "Alumni ID and Birthday does not match",
        });
    }
});

// get all data that is not admin and activated account
router.get("/all", async (req, res) => {
    User.find(
        { isAdmin: { $ne: true }, isActive: { $ne: false } },
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
});

// get all not activated account
router.get("/allNotActive", async (req, res) => {
    User.find({ isActive: { $ne: true } }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

// verify user using isActive
router.put("/activateAlumni", async (req, res) => {
    const id = req.body.id;

    var transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: "587",
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const userVerify = await User.findById(id);

    const mailOptions = {
        from: {
            name: "CTU Alumni Information System",
            address: process.env.USER,
        }, // sender address
        to: userVerify.email, // list of receivers
        subject: "Account Verified", // Subject line
        text: "Hello",
        html: `
        <div style="padding:10px;border-style: ridge">
        <p>Dear ${userVerify.firstName} ${userVerify.lastName}</p>
        <p>Your Account is now Active</p>
        <ul>
            <li>From: Cebu Technological University Alumni Information System</li>
            <li>Subject: Your account to CTU AIS has been activated</li>
            <li>Message: You may now log in to the site using your chosen email and password</li>
        </ul>
        </div>
        `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("errors");
        } else {
            console.log("Email successfully sent");
        }
    });

    try {
        await User.updateOne(
            { _id: id },
            {
                $set: { isActive: true },
            }
        ).then(console.log("na accept na"));
    } catch (error) {
        console.log(error);
    }
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

//find and update single user
router.put("/updateUser", async (req, res) => {
    const id = req.body.id;

    const newFirstName = req.body.newfirstName;
    const newLastName = req.body.newlastName;
    const newMiddleName = req.body.newmiddleName;
    const newBio = req.body.newbio;
    const newAddress = req.body.newaddress;
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
                    address: newAddress,
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

//update alumni profile pic
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

//delete one User
router.delete("/deleteUser/:id", async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndRemove(id).exec();

    res.send("item deleted");
});

//para Count sa Employment Status
router.get("/countEmploymentStatus", async (req, res) => {
    try {
        const countData = []; //temporary array para sud sa na count
        const countEmployed = await User.find({
            empStat: "Employed",
            isActive: { $ne: false },
        }).count();
        const countUnemployed = await User.find({
            empStat: "Unemployed",
            isActive: { $ne: false },
        }).count();
        const countSelfemployed = await User.find({
            empStat: "Self-Employed",
            isActive: { $ne: false },
        }).count();
        const countUnderemployed = await User.find({
            empStat: "UnderEmployed",
            isActive: { $ne: false },
        }).count();

        const totalAlumni = await User.find({
            isActive: { $ne: false },
            isAdmin: { $ne: true },
        }).count();

        countData.push({
            employed: countEmployed,
            unEmployed: countUnemployed,
            selfEmployed: countSelfemployed,
            underemployed: countUnderemployed,
            totalAlumni: totalAlumni,
        });

        //send sa fronted
        res.status(200).send(countData);
    } catch (err) {
        console.log("Error " + err);
    }
});

//para change sa notifications  read to true
router.put("/changeRead/:id", async (req, res) => {
    const userId = req.params.id;
    // console.log("user ID ni", userId);

    const notificationId = req.body.notificationId;
    // console.log("notification id nga na click na notification", notificationId);

    const updateResult = await User.updateOne(
        {
            _id: userId,
            "notification.notificationId": req.body.notificationId,
        },
        { $set: { "notification.$.read": true } }
    );
    res.send(updateResult);
});

//para cound sa notifications nga wapa na read
router.get("/countUnReadEvents/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const count = user.notification.filter((n) => n.read === false).length;
        res.status(200).send({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//find and update for resume
router.put("/updateResume", async (req, res) => {
    const id = req.body.id;

    // experience
    const experience = req.body.experience
        .map((skill) => {
            return { title: skill.title, description: skill.description };
        })
        .filter((exp) => exp !== "");

    // education
    const education = req.body.education
        .map((skill) => {
            return { title: skill.title, location: skill.location };
        })
        .filter((edu) => edu !== "");

    // skills
    const skills = [];
    req.body.skills
        .map((skill) => {
            skills.push(skill.title);
        })
        .filter((skill) => skill !== "");
    // Filter out empty strings from the arrays

    try {
        await User.updateOne(
            { _id: id },

            {
                $set: { bio: req.body.bio },
                $push: {
                    experience: { $each: experience },
                    education: { $each: education },
                    skills: { $each: skills },
                },
            }
        );
    } catch (err) {
        console.log("Error " + err);
    }

    res.send("Updated");
});

//find and update or add honor and award
router.put("/addAward", (req, res) => {
    const newAward = {
        awardName: req.body.awardName,
        issuer: req.body.issuer,
        dateIssued: req.body.dateIssued,
        description: req.body.awardDescription,
    };
    User.updateOne(
        { _id: req.body.id },
        { $push: { award: newAward } },
        function (error) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.send("Award added successfully");
            }
        }
    );
});

router.put("/deleteAward/:awardId", (req, res) => {
    console.log("userId", req.body.userId);
    console.log("Deleting", req.params.awardId);
    User.updateOne(
        { _id: req.body.userId },
        { $pull: { award: { _id: req.params.awardId } } },
        function (error) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.send("Award deleted successfully");
            }
        }
    );
});
module.exports = router;
