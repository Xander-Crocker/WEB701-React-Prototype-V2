import React from "react";
import AuthService from "../services/auth.service";

// Profile component
const Profile = () => {
  // Get the current user from AuthService
  const currentUser = AuthService.getCurrentUser();

  // If no user is logged in, display a message
  if (!currentUser) {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>No user is logged in</h3>
        </header>
      </div>
    );
  }

  // If a user is logged in, display their profile information
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        {currentUser.token && (
          <>
            <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
            {currentUser.token.substring(currentUser.token.length - 20)}
          </>
        )}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;