import { TextField, Button, Container } from "@material-ui/core";
import { getRequest2GAS } from "../utils/GetRequest2GAS";
import React, { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [carNumber, setCarNumber] = useState("");

  const onClick = async () => {
    const params = {
      mode: "register",
      name,
      car_number: carNumber,
      crossDomain: true,
    };
    const res = await getRequest2GAS(params);
    console.log(res);
  };
  return (
    <Container>
      <h1>Register</h1>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          label="名前"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="車ナンバー 4桁 （「・」は0で入力してください）"
          required
          onChange={(e) => setCarNumber(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={onClick}>送信</Button>
      </form>
    </Container>
  );
}
