import React from "react";
import { useState } from "react";
import "./home.css";

//icons
import { AiTwotoneRightCircle } from "react-icons/ai";

//image
import dash from "../../images/dash.png";
import employment from "../../images/employment.png";

const Home = () => {
    const [open, setOpen] = useState(false);
    const toggle_arrow = () => setOpen(!open);
    return (
        <div className="main_containers">
            <div className="home_bar">
                <h5 className="h5">Home</h5>
            </div>

            {/* first div container */}
            <div className="first_div">
                <div className="first_div_left">
                    <img src={dash} alt="" />
                    <div className="first_div_title">
                        <h1>Welcome Back !</h1>
                        <h2>Admin</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. In velit quo beatae harum enim delectus
                            laudantium ex accusamus nisi minima.
                        </p>
                    </div>
                </div>
                {/* first div right container */}
                <div className="first_div_right">
                    <div className="first_div_right_title">
                        <h1>Employment Status</h1>
                        <div className="employment_content_total">
                            <h1>Total:</h1> <span>1200</span>
                        </div>
                    </div>
                    <div className="employment">
                        <div className="employment_content">
                            <div className="employment_content_one">
                                <AiTwotoneRightCircle className="icon" />
                                <p>Employed</p>
                            </div>

                            <div className="employment_content_two">
                                <AiTwotoneRightCircle className="icon" />
                                <p>Self Employed</p>
                            </div>
                            <div className="employment_content_three">
                                <AiTwotoneRightCircle className="icon" />
                                <p>Under Employed</p>
                            </div>
                            <div className="employment_content_four">
                                <AiTwotoneRightCircle className="icon" />
                                <p>UnEmployed</p>
                            </div>
                        </div>
                        <img src={employment} alt="" />
                    </div>
                </div>
            </div>

            {/* second div container */}
            <div className="second_div">
                <div className="second_div_content">
                    <h1>200</h1>
                    <p>Employed</p>
                </div>
                <div className="second_div_content">
                    <h1>400</h1>
                    <p>Under Employed</p>
                </div>
                <div className="second_div_content">
                    <h1>550</h1>
                    <p>UnEmployed</p>
                </div>
                <div className="second_div_content">
                    <h1>50</h1>
                    <p>Self Employed</p>
                </div>
                <div className="second_div_content">
                    <h1>1200</h1>
                    <p>Total Alumni</p>
                </div>
            </div>

            {/* third div container */}
            <div className="third_div">
                <div className="third_div_content">
                    <iframe
                        className="alumniChart"
                        src="https://charts.mongodb.com/charts-ctualumni-acewb/embed/charts?id=6317f14a-acdd-4055-868d-64b972381308&maxDataAge=3600&theme=light&autoRefresh=true"
                    ></iframe>
                </div>
                <span className="para_tabon"></span>
                <div className="third_div_content"></div>
                <div className="third_div_content"></div>
            </div>
        </div>
    );
};

export default Home;
