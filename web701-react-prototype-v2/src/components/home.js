import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

// Home component
const Home = () => {
  const [content, setContent] = useState(""); // State variable for content

  // useEffect hook to fetch public content when the component mounts
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        const data = response.data;
        // Set content to the response data, formatted as a string if necessary
        setContent(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
      },
      (error) => {
        // Handle errors and set content to the error message
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="container">
      <header className="jumbotron">
        <pre>{content}</pre> {/* Display the content */}
      </header>
    </div>
  );
};

export default Home;

