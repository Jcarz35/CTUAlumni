import "./main.css";
import React from "react";

import { motion } from "framer-motion";

import axios from "axios";

//icons
import { FaBars, FaHome, FaUser } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import { AiOutlineLogout, AiOutlineHome } from "react-icons/ai";
import {
    MdOutlineKeyboardArrowRight,
    MdOutlineVerifiedUser,
} from "react-icons/md";
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { BsMoonFill } from "react-icons/bs";
import { BsSun } from "react-icons/bs";
import { BiUser, BiFile } from "react-icons/bi";

import { NavLink, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";

//images
import ctu from "../../images/ctu.png";
import profile from "../../images/profile.png";
// import Snackbar from "../Snackbar/Snackbar";

const Main = ({ children, theme, toggleTheme, user }) => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location = "/login";
    };

    // para kuha sa usa ka data sa user
    const [userInfo, setUserInfo] = useState([]);
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

    // para funtionalities sa button
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    // para sa alumni navigations
    const [open, setOpen] = useState(false);
    const toggle_arrow = () => setOpen(!open);

    // para sa jobs na navigation
    const [opens, setOpens] = useState(false);
    const toggle_arrows = () => setOpens(!opens);

    const [openRightBar, setOpenRightBar] = useState(false);
    const toggleRightBar = () => {
        setOpenRightBar(!openRightBar);
        setNotification(false);
    };
    const [openNotification, setNotification] = useState(false);
    const toggleNotification = () => setNotification(!openNotification);

    //para snackbar/toast notification
    // const [showSnackbar, setShowSnackbar] = useState(false);
    // const SnackbarType = {
    //     success: "success",
    //     fail: "fail",
    // };
    // const toggleSnackbar = () => {
    //     setShowSnackbar(true);
    //     setTimeout(() => {
    //         setShowSnackbar(false);
    //     }, 3000);
    // };

    return (
        <div className="main_container">
            <div className="blur" style={{ top: "-18%", right: "0" }}></div>
            <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
            {/*Icons sa left side */}
            <div className="left_icons">
                <div className="bars">
                    <FaBars className="fa_bars" onClick={toggle} />
                    {/* <FaBars onClick={toggleSnackbar} /> */}
                </div>
                <NavLink
                    exact={true}
                    to="/home"
                    key="Home"
                    className={({ isActive }) =>
                        isActive ? "sidebar_active" : "sidebar_icon"
                    }
                >
                    <div className="icon">{<AiOutlineHome />}</div>
                </NavLink>
                <NavLink
                    exact={true}
                    to={"/userlist"}
                    key={"UserList"}
                    className={({ isActive }) =>
                        isActive ? "sidebar_active" : "sidebar_icon"
                    }
                >
                    <div className="icon">{<BiUser />}</div>
                </NavLink>
                <NavLink
                    exact={true}
                    to={"/jobposting"}
                    key={"JobPosting"}
                    className={({ isActive }) =>
                        isActive ? "sidebar_active" : "sidebar_icon"
                    }
                >
                    <div className="icon">{<BiFile />}</div>
                </NavLink>
                {/* para verify na icon */}
                {userInfo.isAdmin && (
                    <NavLink
                        exact={true}
                        to={"/verifyuser"}
                        key={"VerifyUser"}
                        className={({ isActive }) =>
                            isActive ? "sidebar_active" : "sidebar_icon"
                        }
                    >
                        <div className="icon">{<MdOutlineVerifiedUser />}</div>
                    </NavLink>
                )}
            </div>
            {/*SideBar Links */}
            <motion.div
                animate={{ width: isOpen ? "170px" : "0px" }}
                className="sidebar"
            >
                {/* Sidebar CTU header*/}
                {isOpen && (
                    <div className="top_section">
                        {isOpen && <h1 className="logo">CTU AC</h1>}
                        {isOpen && (
                            <div className="logo_container">
                                <img src={ctu} alt="" className="logo_ctu" />
                            </div>
                        )}
                    </div>
                )}
                {isOpen && (
                    <section className="routes">
                        {/* Home Button Menu*/}
                        <div className="link_holder">
                            <NavLink
                                exact={true}
                                to={"/home"}
                                key={"Home"}
                                className={({ isActive }) =>
                                    isActive ? "active" : "link"
                                }
                            >
                                {isOpen && (
                                    <div className="link_text">{"Home"}</div>
                                )}
                            </NavLink>
                        </div>

                        {/* Alumni Button Menu*/}
                        <div className="link_holder">
                            <div className="link_container">
                                <NavLink
                                    exact={true}
                                    to={"/userlist"}
                                    key={"UserList"}
                                    className={({ isActive }) =>
                                        isActive ? "active" : "link"
                                    }
                                >
                                    {isOpen && (
                                        <div className="link_text">
                                            {"Alumni"}
                                        </div>
                                    )}

                                    {/* Arrow Button*/}
                                </NavLink>
                                {/* <div className="arrow_icon_holder">
                                    <div className="arrow_icon">
                                        {
                                            <MdOutlineKeyboardArrowRight
                                                className={`toggle_btn ${
                                                    open ? "rotate" : ""
                                                }`}
                                                onClick={toggle_arrow}
                                                id="toggle_btn"
                                            />
                                        }
                                    </div>
                                </div> */}
                            </div>

                            {/* Submenu*/}
                            {/* <div
                                className={({ open }) =>
                                    open ? "submenu_open" : "submenu"
                                }
                            >
                                <NavLink
                                    exact={true}
                                    to={"/userlist"}
                                    key={"UserList"}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "active_sub_link"
                                            : "sub_link"
                                    }
                                >
                                    {open && (
                                        <div className="link_text_submenu">
                                            {"User List"}
                                        </div>
                                    )}
                                </NavLink>
                            </div> */}
                        </div>

                        {/* Job  */}
                        <div className="link_holder">
                            <div className="link_container">
                                <NavLink
                                    exact={true}
                                    to={"/jobposting"}
                                    key={"JobPosting"}
                                    className={({ isActive }) =>
                                        isActive ? "active" : "link"
                                    }
                                >
                                    {isOpen && (
                                        <div className="link_text">
                                            {"Job Post"}
                                        </div>
                                    )}

                                    {/* Arrow Button*/}
                                </NavLink>
                                <div className="arrow_icon_holder">
                                    <div className="arrow_icon">
                                        {
                                            <MdOutlineKeyboardArrowRight
                                                className={`toggle_btn ${
                                                    opens ? "rotate" : ""
                                                }`}
                                                onClick={toggle_arrows}
                                                id="toggle_btn"
                                            />
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Submenu*/}
                            <div
                                className={({ open }) =>
                                    open ? "submenu_open" : "submenu"
                                }
                            >
                                <NavLink
                                    exact={true}
                                    to={"/createjob"}
                                    key={"CreateJob"}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "active_sub_link"
                                            : "sub_link"
                                    }
                                >
                                    {opens && (
                                        <div className="link_text_submenu">
                                            {"Post Job"}
                                        </div>
                                    )}
                                </NavLink>
                            </div>
                        </div>

                        {/* Verify alumni Button Menu*/}
                        {userInfo.isAdmin && (
                            <div className="link_holder">
                                <div className="link_container">
                                    <NavLink
                                        exact={true}
                                        to={"/verifyuser"}
                                        key={"VerifyUser"}
                                        className={({ isActive }) =>
                                            isActive ? "active" : "link"
                                        }
                                    >
                                        {isOpen && (
                                            <div className="link_text">
                                                {"Verify"}
                                            </div>
                                        )}

                                        {/* Arrow Button*/}
                                    </NavLink>
                                </div>
                            </div>
                        )}
                    </section>
                )}
            </motion.div>

            {/*Right container  */}
            <div className="right_container">
                {/*Navbar og title bar sa taas */}
                <div className="navbar_container">
                    <nav className="navbar">
                        <h1 className="alumni">Alumni Information System</h1>

                        <div className="right_theme" onClick={toggleTheme}>
                            {theme === "light" ? (
                                <BsMoonFill
                                    className="moon"
                                    title="Dark Mode"
                                />
                            ) : (
                                <BsSun className="sun" title="Light Mode" />
                            )}
                        </div>

                        {/* notifications */}
                        <div
                            className="topBarIconContainer"
                            onClick={toggleNotification}
                        >
                            <IoMdNotifications className="icon" />
                            <span className="topIconBadge">2</span>
                        </div>
                        <motion.div
                            animate={{
                                height: openNotification ? "400px" : "0",
                            }}
                            className="notificationContainer"
                        ></motion.div>

                        {/* dropdown para profile */}
                        <motion.div
                            animate={{
                                height: openRightBar ? "400px" : "0",
                            }}
                            className="Username"
                        >
                            <div className="Username_logo">
                                <div className="right_bar">
                                    <div
                                        onClick={toggleRightBar}
                                        className="right_bars"
                                    >
                                        {openRightBar ? (
                                            <FaRegWindowClose className="right_bars" />
                                        ) : (
                                            <FaBars className="right_bars" />
                                        )}
                                    </div>

                                    {/* <FaBars
                                        onClick={toggleRightBar}
                                        className="right_bars"
                                    /> */}
                                </div>
                                <div className="right_Menu">
                                    <div className="profile_pics">
                                        <img
                                            id="profile_img_main"
                                            src={`http://localhost:8080/uploads/${userInfo.profilePic}`}
                                            alt=""
                                        />
                                    </div>
                                    <div className="side_profile">
                                        <h5>
                                            {userInfo.firstName}{" "}
                                            {userInfo.lastName}
                                        </h5>
                                        {!userInfo.isAdmin ? (
                                            <p>Alumni</p>
                                        ) : (
                                            <p>Administrator</p>
                                        )}
                                    </div>
                                </div>
                                <hr className="horizontal_line" />

                                <div className="right_link_holder">
                                    <NavLink
                                        exact={true}
                                        to={"/profile"}
                                        key={"Profile"}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "right_link_active"
                                                : "right_link"
                                        }
                                    >
                                        <div className="icons">
                                            {<FaUser />}
                                        </div>

                                        <div className="right_link_text">
                                            {"Profile"}
                                        </div>
                                    </NavLink>
                                </div>

                                <div className="right_link_holder">
                                    <NavLink
                                        exact={true}
                                        to={"/"}
                                        key={"Login"}
                                        className="right_link"
                                    >
                                        <div className="icons">
                                            {<AiOutlineLogout />}
                                        </div>
                                        <div
                                            className="right_link_text"
                                            onClick={handleLogout}
                                        >
                                            {"Logout"}
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        </motion.div>
                    </nav>
                </div>

                {/*Container para sa mga Router link */}
                <main className="side_container">{children}</main>
            </div>
        </div>
    );
};

export default Main;
