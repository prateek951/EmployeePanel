import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const Alert = props => {
  const { message, messageType } = props;
  return (
    <div
      className={classnames("alert", {
        "alert-danger": messageType === "error",
        "alert-success": messageType === "success"
      })}
    >
      {message}
    </div>
  );
};
Alert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired
};

export default Alert;
