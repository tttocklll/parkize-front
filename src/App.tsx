import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div
          style={{
            margin: "0px auto",
            padding: "0px 20px",
            maxWidth: "600px",
          }}
        >
          <Route path="/register" component={Register} />
          <Route path="/search" component={Search} />
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    </div>
  );
}

export default App;
