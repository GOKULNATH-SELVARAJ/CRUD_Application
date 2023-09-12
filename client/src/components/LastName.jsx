import React, { useState } from 'react'

function LastName({lastName, setLastName}) {
    const [isValidLname, setIsValidLname] = useState(true);
    const validateLname = (value) => {
        const lNamePattern = /^[A-Za-z\s]+$/;
        return lNamePattern.test(value);
      };
    
      const handleLnameChange = (e) => {
        const newLname = e.target.value;
        setLastName(newLname);
        const isValid = validateLname(newLname);
        setIsValidLname(isValid);
      };
  return (
    <div className="col-md-9">
                <input
                  type="text"
                  className={`form-control ${isValidLname ? "" : "is-invalid"}`}
                  placeholder="Last Name"
                  autoComplete="off"
                  onChange={handleLnameChange}
                />
                {!isValidLname && (
                  <div className="invalid-feedback">Enter Valid Name</div>
                )}
              </div>
  )
}

export default LastName