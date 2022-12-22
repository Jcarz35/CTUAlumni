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
    console.log(id);
    try {
        const user = await User.findOne({ userId: id });

        // const userID = await User.findOne({ userId: req.body.userId });

        // try {
        //     if (userID.isActive) {
        //         return res.status(409).send({
        //             message: "User with given Alumni ID  already Exist!",
        //         });
        //     }
        // } catch (error) {
        //     throw new Error(error.message);
        //     //  res.status(400).send({ message: error.message });
        // }

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
        // const { error } = validate(req.body);
        // if (error)
        //     return res.status(400).send({ message: error.details[0].message });
        // pangitaon ang Id sa alumni na database

        const user = await User.findOne({ email: req.body.email });
        try {
            if (user)
                return res
                    .status(409)
                    .send({ message: "User with given email already Exist!" });
        } catch (error) {
            throw new Error(error.message);
        }

        const userID = await User.findOne({ userId: req.body.userId });

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
                            age: null,
                            course: null,
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
        res.status(500).send({ message: "Wala sa Database imong Alumni ID" });
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

module.exports = router;
