import React from "react";

const DisplayMessage = ({ message }) => {
  return (
    message !== null && (
      <div>
        <div>{message.header}</div>
      </div>
    )
  );
};

export default DisplayMessage;
