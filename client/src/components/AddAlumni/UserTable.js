import React from "react";
import DataTable from "./DataTable";
import "./addalumni.css";

import Axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";

//para dialog
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

// icons
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrFormClose } from "react-icons/gr";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

//loading spinner
import FadeLoader from "react-spinners/FadeLoader";

const UserTable = ({ userBuang }) => {
    // state sa User details
    const [user, setUser] = useState([]);

    //loading page
    const [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#36d7b7");

    // para Dialog sa Image upload
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // para kuha sa usa ka data sa user
    const [userInfo, setUserInfo] = useState([]);
    useEffect(() => {
        Axios.get("http://localhost:8080/api/users/user/" + userBuang)
            .then((res) => {
                setUserInfo(res.data);
                // ibutang sa user na variable ang data gikan DB
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userInfo]);

    // fetch all not active account
    useEffect(() => {
        Axios.get("http://localhost:8080/api/users/allNotActive").then(
            (response) => {
                setUser(response.data);
                setLoading(false);
            }
        );
    }, [user]);

    // activate a single account
    const activateUser = (id) => {
        console.log(id);
        Axios.put("http://localhost:8080/api/users/activateAlumni", {
            id: id,
        }).then(() => {
            setUser(user.filter((item) => item._id !== id));
            handleClose();
        });
        console.log("gipislit na");
    };
    // Reject User or delete
    const deleteUser = (id) => {
        Axios.delete(`http://localhost:8080/api/users/deleteUser/${id}`);
        setUser(user.filter((item) => item._id !== id));

        console.log("user ids", id);
        handleClose();
    };

    // para header sa table
    const columns = [
        { field: "lastName", headerName: "Last Name", width: 180 },
        { field: "firstName", headerName: "First Name", width: 180 },
        { field: "userId", headerName: "Alumni Id", width: 200 },
        { field: "birthday", headerName: "Birthday", width: 150 },

        // {
        //     field: "action",
        //     headerName: "Action",
        //     width: 150,
        //     renderCell: (params) => {
        //         return (
        //             <>
        //                 {userInfo.isAdmin && (
        //                     <button
        //                         className="approve_button"
        //                         onClick={() => {
        //                             activateUser(params.row._id);
        //                         }}
        //                     >
        //                         <AiOutlineCheckCircle className="icon" />
        //                         <p>Approve</p>
        //                     </button>
        //                 )}

        //                 {userInfo.isAdmin && (
        //                     <button
        //                         className="disapprove_button"
        //                         onClick={handleClickOpen}
        //                     >
        //                         <AiOutlineCloseCircle className="icon" />
        //                         <p>Reject</p>
        //                     </button>
        //                 )}

        //                 {/* Dialog para confirmation to delete */}
        //                 <Dialog
        //                     // width={400}
        //                     // height={500}
        //                     open={open}
        //                     onClose={handleClose}
        //                     className="delete_dialog"
        //                 >
        //                     <div className="header_close">
        //                         <DialogTitle>
        //                             <h5>Reject Confirmation</h5>
        //                         </DialogTitle>
        //                         <div>
        //                             {" "}
        //                             <GrFormClose
        //                                 className="close_button"
        //                                 onClick={handleClose}
        //                             />
        //                         </div>
        //                     </div>
        //                     <div className="body_close">
        //                         <h1>
        //                             Are you sure you want to reject the request?
        //                         </h1>
        //                         <h1>It will be deleted from the database</h1>
        //                     </div>
        //                     <div className="footer_close">
        //                         <Button onClick={handleClose}>Cancel</Button>
        //                         <button
        //                             onClick={() => {
        //                                 deleteUser(params.row._id);
        //                             }}
        //                             className="button_delete"
        //                         >
        //                             Yes
        //                         </button>
        //                     </div>
        //                 </Dialog>
        //             </>
        //         );
        //     },
        // },
    ];

    return (
        <>
            {loading ? (
                <div className="loading_page">
                    <FadeLoader
                        loading={loading}
                        size={200}
                        aria-label="Loading Spinner"
                        color={color}
                    />
                    <label htmlFor="">Loading...</label>
                </div>
            ) : (
                <DataTable
                    rows={user}
                    columns={columns}
                    rowsPerPageOptions={[2]}
                />
            )}
        </>
    );
};

export default UserTable;
