import React from "react";
import "../components/Label.css";

const Label = ({ text = "" }) => {
  return (
    <div className="col-md-3 d-flex align-items-center custom-div">
      <label className="input-text" htmlFor="">
        {text} 
      </label>
    </div>
  );
};

export default Label;
