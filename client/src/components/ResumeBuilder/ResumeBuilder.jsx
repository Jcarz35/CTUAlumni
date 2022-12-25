import React, { useRef, useState } from "react";
import "./resumebuilder.css";
import Resume from "../Resume/Resume";
import { AiOutlinePlusCircle } from "react-icons/ai";

const ResumeBuilder = () => {
    const [aboutMe, setAboutMe] = useState("");
    const [workExperience, setWorkExperience] = useState([
        { title: "", description: "" },
    ]);
    const [education, setEducation] = useState([{ title: "", location: "" }]);
    const [skills, setSkills] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Send a request to the server to store the data in the database
    };

    const generatePDFRef = useRef();
    function handleGeneratePDF() {
        console.log("Generating PDF");
        generatePDFRef.current.generatePDF();
    }
    const newIndex = 1;

    return (
        <div className="resume_builder">
            <div className="header_resume">
                <h1>Resume</h1>
            </div>

            <div className="resume_builder_body">
                <form onSubmit={handleSubmit} className="form_resume_container">
                    <div className="about_me_section">
                        <h1>About me</h1>
                        <textarea
                            placeholder="Tell me about yourself"
                            value={aboutMe}
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
                                <p>Experience{" " + (index + 1)}</p>
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
                                                description: event.target.value,
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
                    </div>

                    <button className="btn_save_pic" type="submit">
                        Submit
                    </button>
                </form>
                <h1 style={{ fontSize: "24px", color: "black" }}>
                    Resume in PDf format
                </h1>
                {console.log(workExperience)}
                <Resume ref={generatePDFRef} />
            </div>
        </div>
    );
};

export default ResumeBuilder;
