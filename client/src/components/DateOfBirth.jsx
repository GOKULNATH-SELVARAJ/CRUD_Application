import React, { useState } from 'react'

function DateOfBirth({dob,setDob}) {
    const [IsValidDob, setIsValidDob] = useState(true);
    const validateDob = (value) => {
        const enteredDate = new Date(value);
        const curnDate = new Date();
        console.log(curnDate);
        return enteredDate < curnDate;
      };
    
      const handleDobChange = (e) => {
        const newDob = e.target.value;
        setDob(newDob);
        const isValid = validateDob(newDob);
        setIsValidDob(isValid);
      };
  return (
    <div className="col-md-9">
                <input
                  type="date"
                  className={`form-control ${IsValidDob ? "" : "is-invalid"}`}
                  autoComplete="off"
                  onChange={handleDobChange}
                />
                {!IsValidDob && (
                  <div className="invalid-feedback">
                    Enter Valid Date of Birth
                  </div>
                )}
              </div>
  )
}

export default DateOfBirth