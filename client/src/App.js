import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FormComponent from "./components/FormComponent";
import axios from "axios";
import "./styles/App.css";

const App = () => {
  const handleRefresh = async () => {
    try {
      await axios.get(`http://localhost:3000/api/refresh`);
      alert("Excel sheet updated successfully");
    } catch (error) {
      console.error(error);
      alert("Error updating Excel sheet");
    }
  };

  return (
    <Router>
      <div>
        <button>
          <Link to="/formA">Form A</Link>
        </button>
        <button>
          <Link to="/formB">Form B</Link>
        </button>
        <button onClick={handleRefresh}>Refresh</button>
        <Routes>
          <Route path="/formA" element={<FormComponent formType="A" />} />
          <Route path="/formB" element={<FormComponent formType="B" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
