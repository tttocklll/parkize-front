import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Header from "./components/Header"
import "./App.css";

function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/register" component={Register} />
        <Route path="/search" component={Search} />
        <Route exact path="/" component={Home} />
      </Router>
    </div>
  );
}

export default App;
