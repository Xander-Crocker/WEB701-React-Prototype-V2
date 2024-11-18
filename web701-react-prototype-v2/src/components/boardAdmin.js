import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

// BoardAdmin component
const BoardAdmin = () => {
  const [content, setContent] = useState(""); // State variable for content

  // useEffect hook to fetch admin board content when the component mounts
  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data); // Set content to the response data
      },
      (error) => {
        // Handle errors and set content to the error message
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        // If the error status is 401 (Unauthorized), dispatch a logout event
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []); // Empty dependency array means this runs once when the component mounts


  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardAdmin;


