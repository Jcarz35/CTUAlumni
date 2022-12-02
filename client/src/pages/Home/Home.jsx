import React from "react";
import { useState, useEffect } from "react";
import "./home.css";
import axios from "axios";

//icons
import { AiTwotoneRightCircle } from "react-icons/ai";

//image
import dash from "../../images/dash.png";
import employment from "../../images/employment.png";

const Home = ({ theme }) => {
    const [open, setOpen] = useState(false);
    const toggle_arrow = () => setOpen(!open);
    const [quotes, setQuotes] = useState(false);

    useEffect(() => {
        try {
            axios
                .get("https://dummyjson.com/quotes/random")
                .then((response) => {
                    setQuotes(response.data.quote);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const lightSrc =
        "https://charts.mongodb.com/charts-ctualumni-acewb/embed/charts?id=6317f14a-acdd-4055-868d-64b972381308&maxDataAge=3600&theme=light&autoRefresh=true";

    const darkSrc =
        "https://charts.mongodb.com/charts-ctualumni-acewb/embed/charts?id=6317f14a-acdd-4055-868d-64b972381308&maxDataAge=3600&theme=dark&autoRefresh=true";

    const [empStatCount, setEmpStatCount] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/users/countEmploymentStatus")
            .then((res) => {
                setEmpStatCount(res.data); // ibutang sa user na variable ang data gikan DB
            })
            .catch((err) => {
                console.log("empstat nabuang", err);
            });
    }, [empStatCount]);
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
                        <p>{quotes}</p>
                    </div>
                </div>
                {/* first div right container */}
                <div className="first_div_right">
                    {/* <div className="first_div_right_title">
                        <h1>Employment Status</h1>
                        <div className="employment_content_total">
                            <h1>Total:</h1> <span>1200</span>
                        </div>
                    </div> */}
                    {/* <div className="employment"> */}
                    {/* <div className="employment_content">
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
                        <img src={employment} alt="" /> */}
                    {theme === "light" ? (
                        <iframe
                            className="courseChart"
                            src="https://charts.mongodb.com/charts-ctualumni-acewb/embed/charts?id=6378c867-14ab-4809-86db-051750fa7f0f&maxDataAge=10&theme=light&autoRefresh=true"
                        ></iframe>
                    ) : (
                        <iframe
                            className="courseChart"
                            src="https://charts.mongodb.com/charts-ctualumni-acewb/embed/charts?id=6378c867-14ab-4809-86db-051750fa7f0f&maxDataAge=10&theme=dark&autoRefresh=true"
                        ></iframe>
                    )}
                    {/* </div> */}
                </div>
            </div>

            {/* second div container */}
            <div className="second_div">
                {empStatCount.map((value, key) => {
                    return (
                        <>
                            <div className="second_div_content">
                                <h1>{value.employed}</h1>
                                <p>Employed</p>
                            </div>
                            <div className="second_div_content">
                                <h1>{value.underemployed}</h1>
                                <p>Under Employed</p>
                            </div>
                            <div className="second_div_content">
                                <h1>{value.unEmployed}</h1>
                                <p>UnEmployed</p>
                            </div>
                            <div className="second_div_content">
                                <h1>{value.selfEmployed}</h1>
                                <p>Self Employed</p>
                            </div>
                            <div className="second_div_content">
                                <h1>{value.totalAlumni}</h1>
                                <p>Total Active Alumni</p>
                            </div>
                        </>
                    );
                })}
            </div>

            {/* third div container */}
            <div className="third_div">
                <div className="third_div_content">
                    {/* light and dark para chart */}
                    {theme === "light" ? (
                        <iframe className="alumniChart" src={lightSrc}></iframe>
                    ) : (
                        <iframe className="alumniChart" src={darkSrc}></iframe>
                    )}
                </div>

                <div className="third_div_content">
                    <iframe
                        className="genderChart"
                        src="https://charts.mongodb.com/charts-ctualumni-acewb/embed/charts?id=6388a2d3-0bf1-4293-838a-6c00c013a914&maxDataAge=3600&theme=light&autoRefresh=true"
                    ></iframe>
                </div>
                <div className="third_div_content"></div>
            </div>
        </div>
    );
};

export default Home;
