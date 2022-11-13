import React from "react";
import DataTable from "./DataTable";
import "./userlist.css";

import Axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//para dialog
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

// icons
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";

const UserTable = () => {
    // state sa User details
    const [user, setUser] = useState([]);

    // para Dialog sa Image upload
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        Axios.get("http://localhost:8080/api/users/all").then((response) => {
            setUser(response.data);
            console.log(response);
        });
    }, []);

    // deleteUser
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
        { field: "email", headerName: "Email", width: 260 },
        { field: "schoolYear", headerName: "Batch", width: 150 },
        { field: "course", headerName: "Course", width: 180 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/user/" + params.row._id}>
                            <button className="userListEdit">
                                <BiEdit className="editBi" />
                            </button>
                        </Link>

                        <button
                            className="delete_button"
                            onClick={handleClickOpen}
                        >
                            <RiDeleteBin5Line className="deleteBi" />
                        </button>
                        <Dialog
                            width={400}
                            height={500}
                            open={open}
                            onClose={handleClose}
                            className="delete_dialog"
                        >
                            <div className="header_close">
                                <DialogTitle>
                                    <h5>Delete Confirmation</h5>
                                </DialogTitle>
                                <div>
                                    {" "}
                                    <GrFormClose
                                        className="close_button"
                                        onClick={handleClose}
                                    />
                                </div>
                            </div>
                            <div className="body_close">
                                <h1>Are you sure you want to delete?</h1>
                            </div>
                            <div className="footer_close">
                                <Button onClick={handleClose}>Cancel</Button>
                                <button
                                    onClick={() => {
                                        deleteUser(params.row._id);
                                    }}
                                    className="button_delete"
                                >
                                    Delete
                                </button>
                            </div>
                        </Dialog>
                    </>
                );
            },
        },
    ];

    return <DataTable rows={user} columns={columns} rowsPerPageOptions={[2]} />;
};

export default UserTable;
