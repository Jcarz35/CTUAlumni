import React, { useEffect, useState } from "react";
import "./App.css";
import { createContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Axios from "axios";

// Components and pages
import Main from "./components/Main/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Analytics from "./pages/Analytics/Analytics";
import Alumni from "./pages/Alumni/Alumni";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import UserList from "./pages/UserList/UserList";
import EditUser from "./components/EditUser/EditUser";
import JobPosting from "./components/JobPosting/JobPosting";
import Job from "./components/Forms/Job";
import NotFound from "./pages/NotFound/NotFound";

export const ThemeContext = createContext(null);

function App() {
    const user = localStorage.getItem("token");

    const [theme, setTheme] = useState("light");
    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className="App" id={theme}>
                <div className="blur" style={{ top: "-18%", right: "0" }}></div>
                <div
                    className="blur"
                    style={{ top: "36%", left: "-8rem" }}
                ></div>
                <Routes>
                    <Route path="/signup" exact element={<Signup />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route
                        path="/"
                        element={<Navigate replace to="/login" />}
                    />
                </Routes>
                {user && (
                    <Main theme={theme} toggleTheme={toggleTheme}>
                        <Routes>
                            <Route path="/home" exact element={<Home />} />
                            <Route path="/alumni" exact element={<Alumni />} />
                            <Route
                                path="/analytics"
                                exact
                                element={<Analytics />}
                            />
                            <Route
                                path="/profile"
                                exact
                                element={<Profile user={user} />}
                            ></Route>
                            <Route
                                path="/userlist"
                                exact
                                element={<UserList />}
                            ></Route>
                            <Route
                                path="/user/:id"
                                exact
                                element={<EditUser />}
                            ></Route>
                            <Route
                                path="/jobposting"
                                exact
                                element={<JobPosting />}
                            ></Route>
                            <Route
                                path="/job/:id"
                                exact
                                element={<Job />}
                            ></Route>
                            <Route
                                path="/*"
                                exact
                                element={<NotFound />}
                            ></Route>
                        </Routes>
                    </Main>
                )}
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
