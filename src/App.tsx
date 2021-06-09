import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Search from "./pages/Search";
import AllItems from "./pages/AllItems";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div
      className="App"
      style={{
        paddingTop: "80px",
        paddingBottom: "60px",
        position: "relative",
        minHeight: "100vh",
      }}
    >
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
          <Route path="/list" component={AllItems} />
          <Route exact path="/" component={Home} />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
