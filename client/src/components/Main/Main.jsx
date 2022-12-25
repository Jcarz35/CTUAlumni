import "./main.css";
import React from "react";

import { motion } from "framer-motion";

import axios from "axios";
import { format } from "timeago.js";

//icons
import { FaBars, FaUser } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import {
    AiOutlineLogout,
    AiOutlineHome,
    AiOutlineUserAdd,
    AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { VscCalendar } from "react-icons/vsc";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { FiMoon } from "react-icons/fi";
import { BsSun } from "react-icons/bs";
import { BiUser, BiFile } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";

import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

//images
import ctu from "../../images/ctu.png";
// import Snackbar from "../Snackbar/Snackbar";

const Main = ({ children, theme, toggleTheme, user }) => {
    //para events
    const [data, setData] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setTimeout(() => {
            window.location = "/login";
        }, 1000);
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

    //fetch all events
    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/events/all/${user}`)
            .then((res) => {
                setData(res.data);

                // ibutang sa user na variable ang data gikan DB
            })
            .catch((err) => {
                console.log(err);
            });
    }, [data]);

    // para funtionalities sa button
    const [isOpen, setIsOpen] = useState(true);
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
                <NavLink
                    exact={true}
                    to={"/addalumni"}
                    key={"AddAlumni"}
                    className={({ isActive }) =>
                        isActive ? "sidebar_active" : "sidebar_icon"
                    }
                >
                    <div className="icon">{<AiOutlineUsergroupAdd />}</div>
                </NavLink>

                {/* events nav button */}
                <NavLink
                    exact={true}
                    to={"/events"}
                    key={"Events"}
                    className={({ isActive }) =>
                        isActive ? "sidebar_active" : "sidebar_icon"
                    }
                >
                    <div className="icon">{<VscCalendar />}</div>
                </NavLink>
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
                                    <div className="link_text">
                                        {"Dashboard"}
                                    </div>
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

                        {/* Alumni Button Menu*/}
                        <div className="link_holder">
                            <div className="link_container">
                                <NavLink
                                    exact={true}
                                    to={"/addalumni"}
                                    key={"AddAlumni"}
                                    className={({ isActive }) =>
                                        isActive ? "active" : "link"
                                    }
                                >
                                    {isOpen && (
                                        <div className="link_text">
                                            {"Add Alumni"}
                                        </div>
                                    )}

                                    {/* Arrow Button*/}
                                </NavLink>
                            </div>
                        </div>

                        {/* Events Button Menu*/}
                        <div className="link_holder">
                            <div className="link_container">
                                <NavLink
                                    exact={true}
                                    to={"/events"}
                                    key={"Events"}
                                    className={({ isActive }) =>
                                        isActive ? "active" : "link"
                                    }
                                >
                                    {isOpen && (
                                        <div className="link_text">
                                            {"Events"}
                                        </div>
                                    )}

                                    {/* Arrow Button*/}
                                </NavLink>
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
                                <FiMoon className="moon" title="Dark Mode" />
                            ) : (
                                <BsSun className="sun" title="Light Mode" />
                            )}
                        </div>

                        {/* notifications */}
                        <div
                            className="topBarIconContainer"
                            onClick={toggleNotification}
                        >
                            {openNotification ? (
                                <IoMdNotificationsOutline className="iconBlue" />
                            ) : (
                                <IoMdNotificationsOutline className="icon" />
                            )}
                            <span className="topIconBadge">2</span>
                        </div>
                        <motion.div
                            animate={{
                                height: openNotification ? "570px" : "0",
                            }}
                            className="notificationContainer"
                        >
                            <div className="inner_notif_dialog">
                                {openNotification && (
                                    <h1 className="h1">Notifications</h1>
                                )}
                                {openNotification &&
                                    data
                                        .map((val, key) => {
                                            return (
                                                <Link
                                                    key={val._id}
                                                    to={"/event/" + val._id}
                                                    className="event_cards_notif"
                                                    title="Click me"
                                                >
                                                    <h5>{val.title}</h5>
                                                    <p>
                                                        {val.description.substring(
                                                            0,
                                                            60
                                                        )}
                                                        {"..."}
                                                    </p>
                                                    <p className="para_time">
                                                        {format(val.date)}
                                                    </p>
                                                </Link>
                                            );
                                        })
                                        .sort()
                                        .reverse()}
                            </div>
                        </motion.div>

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
                                            // <FaBars className="right_bars" />
                                            <div className="profile_pics">
                                                <img
                                                    id="profile_img_main"
                                                    src={`http://localhost:8080/uploads/${userInfo.profilePic}`}
                                                    alt=""
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* <FaBars
                                        onClick={toggleRightBar}
                                        className="right_bars"
                                    /> */}
                                </div>
                                <div className="right_Menu">
                                    <div className="profile_picss">
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

                                {/* resume builder */}
                                <div className="right_link_holder">
                                    <NavLink
                                        exact={true}
                                        to={"/resumeBuilder"}
                                        key={"ResumeBuilder"}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "right_link_active"
                                                : "right_link"
                                        }
                                    >
                                        <div className="icons">
                                            {<TbListDetails />}
                                        </div>

                                        <div className="right_link_text">
                                            {"Resume/Cv"}
                                        </div>
                                    </NavLink>
                                </div>

                                {/* logout */}
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
