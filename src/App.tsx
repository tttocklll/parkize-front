import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Search from "./pages/Search";
import AllItems from "./pages/AllItems";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import SelectEvent from "./pages/SelectEvent";

import AdminHome from "./pages/admin/AdminHome";
import AdminCreateEvent from "./pages/admin/AdminCreateEvent";

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
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/list" component={AllItems} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={SelectEvent} />
            <Route exact path="/admin/create" component={AdminCreateEvent} />
            <Route exact path="/admin" component={AdminHome} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
