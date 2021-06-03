import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Search from "./pages/Search";
import "./App.css";

function App() {
  const [data, setData] = useState<any>(null);
  const onClick = async () => {
    const params = {
      mode: "register",
      name: "tocky",
      crossDomain: true,
    };
    const res = await axios.get(
      "https://script.google.com/macros/s/AKfycbwqp8qIkYAgjC-q6E0UTm3t-R7MBxQVyjZpOaskqIfDLNMnjPPsVTIxj_5hNkkOtjaoPw/exec",
      { params }
    );
    setData(res);
    console.log(res);
  };
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/search" component={Search} />
      </Router>
    </div>
  );
}

export default App;
