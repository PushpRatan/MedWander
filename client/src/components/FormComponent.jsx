import React, { useState, useEffect } from "react";
import axios from "axios";

const FormComponent = ({ formType }) => {
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedName = localStorage.getItem("name");
    const savedCountryCode = localStorage.getItem("countryCode");
    const savedPhoneNumber = localStorage.getItem("phoneNumber");
    if (savedName) setName(savedName);
    if (savedCountryCode) setCountryCode(savedCountryCode);
    if (savedPhoneNumber) setPhoneNumber(savedPhoneNumber);
  }, []);

  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("countryCode", countryCode);
    localStorage.setItem("phoneNumber", phoneNumber);
  }, [name, countryCode, phoneNumber]);

  const validateForm = () => {
    const errors = {};
    if (!name.match(/^[A-Za-z]+$/)) {
      errors.name = "Name must contain only alphabetic characters";
    }
    if (!countryCode) {
      errors.countryCode = "Country code must be selected";
    }
    if (!phoneNumber.match(/^[0-9]+$/)) {
      errors.phoneNumber = "Phone number must contain only numeric characters";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post(`http://localhost:3000/api/submit`, {
        formType,
        name,
        countryCode,
        phoneNumber,
      });
      alert("Form submitted successfully");
    } catch (error) {
      console.error(error);
      alert("Error submitting form: " + error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{formType === "A" ? "Form A" : "Form B"}</h1>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div>
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          required
        >
          <option value="">Select Country Code</option>
          <option value="US">US</option>
          <option value="CA">CA</option>
          {/* Add more country codes as needed */}
        </select>
        {errors.countryCode && <p className="error">{errors.countryCode}</p>}
      </div>
      <div>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          required
        />
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
