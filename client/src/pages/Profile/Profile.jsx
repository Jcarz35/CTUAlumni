import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./profile.css";

//para dialog
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

//icons
import { FaUserCircle, FaSave } from "react-icons/fa";
import { BsFillCameraFill } from "react-icons/bs";
//images
import Snackbar from "../../components/Snackbar/Snackbar";

const Profile = ({ user }) => {
    const [userInfo, setUserInfo] = useState([]);

    const [newfirstName, setFirstName] = useState(userInfo.firstName);
    const [newlastName, setLastName] = useState(userInfo.lastName);
    const [newmiddleName, setMiddleName] = useState(userInfo.middleName);
    const [newbio, setBio] = useState(userInfo.bio);
    const [newphone, setPhone] = useState(userInfo.phone);
    const [newgender, setGender] = useState(userInfo.gender);
    const [newage, setAge] = useState(userInfo.age);
    const [newcourse, setCourse] = useState(userInfo.course);
    const [newschoolYear, setSchoolYear] = useState(userInfo.schoolYear);
    const [newempstat, setEmpStat] = useState(userInfo.empStat);
    const [fileName, setFileName] = useState(userInfo.profilePic);

    const [message, setMessage] = useState("");

    // para Dialog sa Image upload
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // para state sa file
    const onChangeFile = (e) => {
        setFileName(e.target.files[0]);
    };

    // changeOnClick formdata
    const changeOnClick = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("id", userInfo._id);
        formData.append("profilePic", fileName);

        axios
            .put("http://localhost:8080/api/users/updateProfilePic", formData)
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

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    //snackbar
    const [showSnackbar, setShowSnackbar] = useState(false);
    const SnackbarType = {
        success: "success",
        fail: "fail",
    };

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

    //update call api
    const updateUser = (id) => {
        const formData = new FormData();
        formData.append("profilePic", fileName);

        axios
            .put("http://localhost:8080/api/users/updateUser", {
                id: id,
                newfirstName: newfirstName,
                newlastName: newlastName,
                newmiddleName: newmiddleName,
                newbio: newbio,
                newphone: newphone,
                newgender: newgender,
                newage: newage,
                newcourse: newcourse,
                newschoolYear: newschoolYear,
                newempstat: newempstat,
                newfileName: fileName,
            })
            .then(() => {
                console.log("successs");
                setShowSnackbar(true);
                setTimeout(() => {
                    setShowSnackbar(false);
                }, 3000);
            });
    };

    return (
        <div className="edit_user_container">
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

            <div className="edit_user_header">
                <h5>Profile</h5>
            </div>

            <div className="container">
                {/**Left */}

                <div className="left">
                    <div className="profile_pic">
                        <img
                            src={`http://localhost:8080/uploads/${userInfo.profilePic}`}
                            alt=""
                            className="profile_pic"
                        />

                        {/* form  */}

                        <div className="update_img">
                            <label htmlFor="files">
                                <div className="camera_holder">
                                    <BsFillCameraFill
                                        className="camera"
                                        onClick={handleClickOpen}
                                    />
                                </div>
                            </label>

                            {/* save dialog */}
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                className="dialog_pic"
                            >
                                <div className="header_update_pic">
                                    <DialogTitle className="dialog_title">
                                        <h5>Upload Profile Picture</h5>
                                    </DialogTitle>
                                    <Button
                                        className="btn_close"
                                        onClick={handleClose}
                                    >
                                        x
                                    </Button>
                                </div>

                                <form
                                    onSubmit={changeOnClick}
                                    encType="multipart/form-data"
                                    method="post"
                                >
                                    <input
                                        id="files"
                                        className="input"
                                        type="file"
                                        filename="profilePic"
                                        onChange={onChangeFile}
                                    />
                                    <div className="button_holder_pic">
                                        <button
                                            className="btn_cancel_pic"
                                            onClick={handleClose}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn_save_pic"
                                            onClick={handleClose}
                                        >
                                            Save
                                        </button>
                                    </div>

                                    {/* <Button onClick={handleClose} type="submit">
                                        Subscribe
                                    </Button> */}
                                </form>
                            </Dialog>
                        </div>

                        <div className="name">
                            <h5>
                                {user.firstName} {user.lastName}
                            </h5>
                        </div>
                    </div>

                    <div className="about_info">
                        <h1>About Me :</h1>
                        <p>{userInfo.bio}</p>
                        <div className="fullname">
                            <h1>FullName : </h1>{" "}
                            <p>
                                {userInfo.firstName} {userInfo.lastName}
                            </p>
                        </div>
                        <div className="fullname">
                            <h1>Mobile : </h1> <p>{userInfo.phone}</p>
                        </div>
                        <div className="fullname">
                            <h1>Email : </h1> <p>{userInfo.email}</p>
                        </div>
                        <div className="fullname">
                            <h1>Gender : </h1> <p>{userInfo.gender}</p>
                        </div>
                        <div className="fullname">
                            <h1>Course : </h1> <p>{userInfo.course}</p>
                        </div>
                        <div className="fullname">
                            <h1>School Year : </h1> <p>{userInfo.schoolYear}</p>
                        </div>
                        <div className="fullname">
                            <h1>Employment Status : </h1>
                            <p>{userInfo.empStat}</p>
                        </div>
                    </div>
                </div>

                {/**Right */}
                <div className="right">
                    <div className="settings">
                        <h1>Edit Your Profile</h1>
                    </div>
                    <div className="edit_personal_info">
                        <FaUserCircle className="edit_user_icons" />
                        <h1>Personal Info</h1>
                    </div>{" "}
                    <div></div>
                    {/**Full name Input */}
                    <div className="fname">
                        <div className="fname_holder">
                            <p>Last Name</p>
                            <input
                                type="text"
                                className="input_fname"
                                placeholder={userInfo.lastName}
                                defaultValue={userInfo.lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="fname_holder">
                            <p>First Name</p>
                            <input
                                type="text"
                                className="input_fname"
                                placeholder={userInfo.firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                defaultValue={userInfo.firstName}
                            />
                        </div>
                        <div className="fname_holder">
                            <p>Middle Name</p>
                            <input
                                type="text"
                                className="input_fname"
                                placeholder={userInfo.middleName}
                                defaultValue={userInfo.middleName}
                                onChange={(e) => setMiddleName(e.target.value)}
                            />
                        </div>
                        {/**Bio */}
                        <div className="bio">
                            <p>Bio</p>
                            <textarea
                                className="bio_area"
                                defaultValue={userInfo.bio}
                                onChange={(e) => setBio(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="phone_holder">
                            <p>Phone</p>
                            <input
                                type="text"
                                className="input_fname"
                                defaultValue={userInfo.phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="gender_holder">
                            <p>Gender</p>
                            <input
                                type="text"
                                className="input_fname"
                                defaultValue={userInfo.gender}
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </div>

                        <div className="age_holder">
                            <p>Age</p>
                            <input
                                type="text"
                                className="input_fname"
                                defaultValue={userInfo.age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>

                        {/** <div className="birthdate_holder}>
                            <p>Birthdate</p>
                        <input type="date" className="input_fname} />
                        </div> */}

                        <div className="course_holder">
                            <p>Course</p>
                            <input
                                type="text"
                                className="input_fname"
                                defaultValue={userInfo.course}
                                onChange={(e) => setCourse(e.target.value)}
                            />
                        </div>

                        <div className="year_holder">
                            <p>School Year</p>
                            <input
                                type="text"
                                className="input_fname"
                                defaultValue={userInfo.schoolYear}
                                onChange={(e) => setSchoolYear(e.target.value)}
                            />
                        </div>

                        <div className="status_holder">
                            <p>Employment Status :</p>
                            <select
                                defaultValue={userInfo.empStat}
                                onChange={(e) => setEmpStat(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="Unemployed">Unemployed</option>
                                <option value="Employed">Employed</option>
                                <option value="UnderEmployed">
                                    UnderEmployed
                                </option>
                                <option value="Self-Employed">
                                    Self-Employed
                                </option>
                            </select>
                        </div>
                    </div>
                    {/* save button */}
                    <div className="button_holder">
                        <button
                            className="button"
                            onClick={() => {
                                updateUser(userInfo._id);
                            }}
                        >
                            <FaSave className="icon" />
                            <p>Save</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
