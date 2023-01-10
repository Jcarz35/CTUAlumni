import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./resumebuilder.css";
import Snackbar from "../../components/Snackbar/Snackbar";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

import { FaUserAlt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { PDFExport } from "@progress/kendo-react-pdf";

const ResumeBuilder = ({ user }) => {
    const pdfExportRef = useRef();

    //para download pdf
    function generatePDF() {
        pdfExportRef.current.save();
    }

    //state sa input
    const [aboutMe, setAboutMe] = useState();
    const [workExperience, setWorkExperience] = useState([
        { title: "", description: "" },
    ]);
    const [education, setEducation] = useState([{ title: "", location: "" }]);
    const [skills, setSkills] = useState([{ title: "" }]);

    const [userInfo, setUserInfo] = useState([]);

    //snackbar
    const [showSnackbar, setShowSnackbar] = useState(false);
    const SnackbarType = {
        success: "success",
        fail: "fail",
    };

    // para kuha sa usa ka data sa user
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/users/user/" + user)
            .then((res) => {
                setUserInfo(res.data);

                // ibutang sa user na variable ang data gikan DB
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userInfo]);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .put("http://localhost:8080/api/users/updateResume", {
                id: userInfo._id,
                bio: aboutMe,
                experience: workExperience,
                education: education,
                skills: skills,
            })
            .then(() => {
                setShowSnackbar(true);
                setTimeout(() => {
                    setShowSnackbar(false);
                }, 3000);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const generatePDFRef = useRef();
    function handleGeneratePDF() {
        console.log("Generating PDF");
        generatePDFRef.current.generatePDF();
    }

    return (
        <div className="resume_builder">
            <ScrollToTop />
            {/* snackbar notif */}
            <div
                className="snackbar_position"
                id={showSnackbar ? "show" : "hide"}
            >
                <Snackbar
                    message={"Succesfully Updated"}
                    type={SnackbarType.success}
                />
            </div>
            <div className="header_resume">
                <h1>Resume</h1>
            </div>

            <div className="resume_builder_body">
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    method="post"
                    className="form_resume_container"
                >
                    <div className="about_me_section">
                        <h1>About me</h1>
                        <textarea
                            placeholder="Tell me about yourself"
                            defaultValue={userInfo.bio}
                            onChange={(e) => setAboutMe(e.target.value)}
                        />
                    </div>
                    <div className="experience_section">
                        <h1>Work Experience</h1>

                        {workExperience.map((item, index) => (
                            <div key={index} className="exp_input_holder">
                                <p>Experience{" " + (index + 1)}</p>
                                <div className="resume_input_title">
                                    <h1>Title</h1>
                                    <input
                                        type="text"
                                        value={item.title}
                                        onChange={(event) => {
                                            const newArray = [
                                                ...workExperience,
                                            ];
                                            newArray[index] = {
                                                ...newArray[index],
                                                title: event.target.value,
                                            };
                                            setWorkExperience(newArray);
                                        }}
                                    />
                                </div>
                                {/* work experience description */}
                                <div className="resume_input_des">
                                    <h1>Description</h1>
                                    <textarea
                                        type="text"
                                        value={item.description}
                                        onChange={(event) => {
                                            const newArray = [
                                                ...workExperience,
                                            ];
                                            newArray[index] = {
                                                ...newArray[index],
                                                description: event.target.value,
                                            };
                                            setWorkExperience(newArray);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}

                        {/* button para add og experience field */}
                        <button
                            className="button_resume_holder"
                            type="button"
                            onClick={() =>
                                setWorkExperience([
                                    ...workExperience,
                                    { title: "", description: "" },
                                ])
                            }
                        >
                            <AiOutlinePlusCircle className="icon" />{" "}
                            <p>Experience</p>
                        </button>
                    </div>

                    {/* education */}
                    <div className="education_section">
                        <h1>Education Details</h1>

                        {education.map((item, index) => (
                            <div key={index} className="exp_input_holder">
                                <p>Education{" " + (index + 1)}</p>
                                <div className="resume_input_title">
                                    <h1>Title</h1>
                                    <input
                                        type="text"
                                        value={item.title}
                                        onChange={(event) => {
                                            const newArray = [...education];
                                            newArray[index] = {
                                                ...newArray[index],
                                                title: event.target.value,
                                            };
                                            setEducation(newArray);
                                        }}
                                    />
                                </div>
                                <div className="resume_input_des">
                                    <h1>School</h1>
                                    <textarea
                                        type="text"
                                        value={item.location}
                                        onChange={(event) => {
                                            const newArray = [...education];
                                            newArray[index] = {
                                                ...newArray[index],
                                                location: event.target.value,
                                            };
                                            setEducation(newArray);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}

                        <button
                            className="button_resume_holder"
                            type="button"
                            onClick={() =>
                                setEducation([
                                    ...education,
                                    { title: "", location: "" },
                                ])
                            }
                        >
                            <AiOutlinePlusCircle className="icon" />{" "}
                            <p>Education</p>
                        </button>
                    </div>
                    <div className="skills_section">
                        <h1>Skills Details</h1>
                        {skills.map((item, index) => (
                            <div key={index} className="skills_input_holder">
                                <p>Skills{" " + (index + 1)}</p>
                                <div className="skills_input_title">
                                    <h1>Skills Title</h1>
                                    <input
                                        type="text"
                                        value={item.title}
                                        onChange={(event) => {
                                            const newArray = [...skills];
                                            newArray[index] = {
                                                ...newArray[index],
                                                title: event.target.value,
                                            };
                                            setSkills(newArray);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}

                        {/* button para add og education field */}
                        <button
                            className="button_resume_holder"
                            type="button"
                            onClick={() =>
                                setSkills([...skills, { title: "" }])
                            }
                        >
                            <AiOutlinePlusCircle className="icon" />{" "}
                            <p>Skills</p>
                        </button>
                    </div>

                    <button className="btn_save_pic" type="submit">
                        Submit
                    </button>
                </form>
                <h1 style={{ fontSize: "24px", color: "black" }}>
                    Resume in PDf format
                </h1>

                {userInfo && (
                    <div className="resume_ready_print">
                        <div className="header_resume">
                            <button
                                className="button_pdf"
                                onClick={generatePDF}
                            >
                                Download PDF
                            </button>
                        </div>

                        <PDFExport ref={pdfExportRef} paperSize="A4">
                            <div className="resume_body">
                                <div className="resume_left">
                                    <div className="resume_img">
                                        <img
                                            src={`http://localhost:8080/uploads/${userInfo.profilePic}`}
                                            alt="profile picture"
                                        />
                                    </div>
                                    <h1 className="personal_details_h1">
                                        Personal Details
                                    </h1>
                                    <div className="profile_info_container">
                                        <div className="profile_info_resume">
                                            <FaUserAlt className="icon_fullName" />
                                            <h1>Full Name </h1>
                                            <p>
                                                {userInfo.firstName}{" "}
                                                {userInfo.lastName}
                                            </p>
                                        </div>
                                        <div className="profile_info_resume">
                                            <AiFillHome className="icon_fullName" />
                                            <h1>Address </h1>
                                            <p>{userInfo.address}</p>
                                        </div>
                                        <div className="profile_info_resume">
                                            <BsTelephoneFill className="icon_fullName" />
                                            <h1>Phone Number </h1>{" "}
                                            <p>{userInfo.phone}</p>
                                        </div>
                                        <div className="profile_info_resume">
                                            <MdEmail className="icon_fullName" />
                                            <h1>Email </h1>{" "}
                                            <p>{userInfo.email}</p>
                                        </div>
                                    </div>
                                    <div className="skills_container">
                                        <h1>Skills</h1>

                                        {userInfo.skills &&
                                            userInfo.skills.map(
                                                (skill, index) => {
                                                    return (
                                                        <p key={index}>
                                                            {skill}
                                                        </p>
                                                    );
                                                }
                                            )}
                                    </div>
                                </div>
                                <div className="resume_right">
                                    <div className="about_me">
                                        <h1>About Me</h1>
                                        <p>{userInfo.bio}</p>
                                    </div>

                                    {/* work Experience */}

                                    <div className="work_experience">
                                        <h1>Work Experience</h1>
                                        {userInfo.experience &&
                                            userInfo.experience.map(
                                                (experience, index) => {
                                                    return (
                                                        <div
                                                            className="work_exp_card"
                                                            key={index}
                                                        >
                                                            <h5>
                                                                {
                                                                    experience.title
                                                                }
                                                            </h5>
                                                            <p>
                                                                {
                                                                    experience.description
                                                                }
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                            )}
                                    </div>

                                    <div className="education">
                                        <h1>Education</h1>
                                        {userInfo.education &&
                                            userInfo.education.map(
                                                (educ, index) => {
                                                    return (
                                                        <div
                                                            className="education_card"
                                                            key={index}
                                                        >
                                                            <h5>
                                                                {educ.title}
                                                            </h5>
                                                            <p>
                                                                {educ.location}
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                            )}
                                    </div>
                                </div>
                            </div>

                            {/* Work experience, education, and skills sections will go here */}
                        </PDFExport>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeBuilder;
