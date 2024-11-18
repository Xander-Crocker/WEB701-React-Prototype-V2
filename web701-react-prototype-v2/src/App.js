import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false); // State to show/hide moderator board
  const [showAdminBoard, setShowAdminBoard] = useState(false); // State to show/hide admin board
  const [currentUser, setCurrentUser] = useState(undefined); // State for the current user

  useEffect(() => {
    const user = AuthService.getCurrentUser(); // Get the current user

    if (user) {
      setCurrentUser(user); // Set the current user
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR")); // Show moderator board if user has moderator role
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN")); // Show admin board if user has admin role
    }

    // Listen for logout event
    EventBus.on("logout", () => {
      logOut();
    });

    // Cleanup the event listener on component unmount
    return () => {
      EventBus.remove("logout");
    };
  }, []);

  // Function to log out the user
  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  // Navigation bar
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          React Prototype
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      {/* Route paths */}
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/user" element={<BoardUser/>} />
          <Route path="/mod" element={<BoardModerator/>} />
          <Route path="/admin" element={<BoardAdmin/>} />
        </Routes>
      </div>

    </div>
  );
};

export default App;
