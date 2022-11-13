import React, { useEffect, useState } from "react";
import "./joblist.css";

import axios from "axios";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
const JobPosting = () => {
    const { id } = useParams(); // get the id from the URL

    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);

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
    }, []);

    return (
        <div className="jobposting_containers">
            <div className="header_jobs">
                <h1>Jobs</h1>
                <input
                    type="text"
                    placeholder="search...."
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="jobBodys">
                <div className="leftss">
                    {data.map((val, key) => {
                        return (
                            <NavLink
                                to={"/job/" + val._id}
                                key={val._id}
                                className="lefts_cards"
                                onClick={toggle_arrow}
                            >
                                {val.title}
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default JobPosting;
