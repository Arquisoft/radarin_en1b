import React from "react";

const NotLoggedIn = (props) => {
  return (
    <div className="waiting-screen">
      <h1>You are not logged in!</h1>
      <p>To be able to view this you need to be logged in</p>
    </div>
  );
};

export default NotLoggedIn;