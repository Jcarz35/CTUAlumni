import React from "react";
import "./verifyuser.css";
import UserTable from "./UserTable";

const VerifyUser = ({ user }) => {
    return (
        <div className="verify_container">
            <div className="header_verify">
                <h1>Verify Aumni</h1>
            </div>
            <div className="verify_body">
                <UserTable userBuang={user} />
            </div>
        </div>
    );
};

export default VerifyUser;
