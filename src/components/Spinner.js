import React from "react";
import spinner from "./25.gif";
const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading...."
        style={{
          width: "50px",
          margin: "auto",
          display: "block"
        }}
      />
    </div>
  );
};
export default Spinner;
