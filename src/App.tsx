import React, { useState } from "react";
import logo from "./logo.svg";
import axios from "axios";
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
      "https://script.google.com/macros/s/AKfycbzeM6Cia-98YwTQvOriVDGw7-vI2nmrwS3cGUO9urWqozKpB7Xn/exec",
      { params }
    );
    setData(res);
    console.log(res);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={onClick}>clickme</button>
        <p>{data && JSON.stringify(data.data)}</p>
      </header>
    </div>
  );
}

export default App;
