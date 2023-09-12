import React, { useState } from 'react'

function FirstName({firstName,setFirstName}) {
    const [isValidFname, setIsValidFname] = useState(true);

  const validateFname = (value) => {
    const fNamePattern = /^[A-Za-z\s]+$/;
    return fNamePattern.test(value);
  };

  const handleFnameChange = (e) => {
    const newFname = e.target.value;
    setFirstName(newFname);
    const isValid = validateFname(newFname);
    setIsValidFname(isValid);
  };
  return (
    <div className="col-md-9">
                <input
                  type="text"
                  className={`form-control ${isValidFname ? "" : "is-invalid"}`}
                  placeholder="First Name"
                  autoComplete="off"
                  onChange={handleFnameChange}
                />
                {!isValidFname && (
                  <div className="invalid-feedback">Enter Valid Name</div>
                )}
              </div>
  )
}

export default FirstName