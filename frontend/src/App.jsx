
import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./pages/RegisterPage";
import Landing from "./pages/Landing";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Register />} />
        <Route path="/home-page" element = {<Landing />} />
      </Routes>
    </Router>
  )
}

export default App
