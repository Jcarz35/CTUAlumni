const express = require("express");
const router = express.Router();
const { Request } = require("../models/requestid");
const { User } = require("../models/user");
const nodemailer = require("nodemailer"); // para send Email

router.post("/addRequest", async (req, res) => {
    try {
        await new Request({
            email: req.body.email,
            ownerId: req.body.ownerId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })
            .save()
            .then(() => {
                console.log("success ang id request");
            });
    } catch (error) {
        console.error(error);
    }
});

//ara update sa date nga gi aprove ang request
router.put("/updateDate/:id", async (req, res) => {
    const email = req.body.email;
    try {
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

        // "Monday, January 1, 2021"
        const date = new Date(req.body.approvedDate);
        const formattedDate = date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        const mailOptions = {
            from: {
                name: "CTU Alumni Information System",
                address: process.env.USER,
            }, // sender address
            to: req.body.email, // list of receivers
            subject: "Alumni Id Request Accepted", // Subject line
            text: "Hello",
            html: `
            <div style="padding:10px;border-style: ridge">
            <p>Dear ${req.body.firstName} ${req.body.lastName}</p>
            <p>Your Request for Alumni Id </p>
            <ul>
                <li>From: Cebu Technological University Alumni Information System AC</li>
                <li>I am pleased to inform you that your request for an alumni ID has been approved. </li>
                <li>Message: Your schedule for processing alumni ID will be on ${formattedDate}.</li>
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

        // para update sa date nga na apporved
        await Request.updateOne(
            { _id: req.params.id },

            {
                $set: { approvedDate: req.body.approvedDate, accept: true },
            }
        ).then(() => {
            console.log("success");
        });
    } catch (err) {
        console.log("Error " + err);
    }
});

// get all data request
router.get("/all", async (req, res) => {
    Request.find()
        .then((request) => {
            res.json(request);
        })
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

//delete Request
router.delete("/deleteRequest/:id", async (req, res) => {
    const id = req.params.id;
    await Request.findByIdAndRemove(id).exec();

    res.send("item deleted");
});

module.exports = router;
