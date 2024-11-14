import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const BoardUser = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  const navigateToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <button onClick={navigateToProfile}>Go to Profile</button>
      </header>
    </div>
  );
};

export default BoardUser;