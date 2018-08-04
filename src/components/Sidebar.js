import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Link to="/employee/add" className="btn btn-success btn-sm">
      <i className="fa fa-plus" />New
    </Link>
  );
};

export default Sidebar;
