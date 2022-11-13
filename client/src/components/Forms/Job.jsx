import React from "react";
import axios from "axios";
import "./../JobPosting/jobposting.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

const ArticlesPage = () => {
    const [rightData, setRightData] = useState([]);
    const { id } = useParams(); // get the id from the URL

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const toggle_arrow = (e) => {
        setOpen(true);
    };

    //fetch all job
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/jobs/all")
            .then((res) => {
                setData(res.data);

                // ibutang sa user na variable ang data gikan DB
            })
            .catch((err) => {
                console.log(err);
            });
    }, [data]);
    // display 1 data
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/jobs/job/" + id)
            .then((res) => {
                setRightData(res.data); // ibutang sa user na variable ang data gikan DB
            })
            .catch((err) => {
                console.log("error ni" + err);
            });
    }, [rightData]);

    return (
        <div className="jobposting_containers">
            <div className="header_job">
                <h1>Jobs</h1>
            </div>
            <div className="jobBody">
                <div className="lefts">
                    {data.map((val, key) => {
                        return (
                            <NavLink
                                to={"/job/" + val._id}
                                key={val._id}
                                className="lefts_card"
                                onClick={toggle_arrow}
                            >
                                {val.title}
                            </NavLink>
                        );
                    })}
                </div>
                <div className="rights">
                    {open && <h1>{rightData.title}</h1>}
                </div>
            </div>
        </div>
    );
};

export default ArticlesPage;
