import React, { useState } from "react";
import "./userlist.css";
import UserTable from "./UserTable";

const UserList = () => {
    return (
        <div className="userlist_container">
            <div className="userlist_header">
                <div className="header_content">
                    <h5 className="userlist_title">UserList</h5>
                </div>
                <div className="table">
                    <UserTable />
                </div>
            </div>
        </div>
    );
};

export default UserList;

/** 
import * as React from 'react';




export default function DataGridDemo() {
  return (
    
  );
}

*/
