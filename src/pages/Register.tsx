import { TextField, Button } from "@material-ui/core";
import React, { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [carNumber, setCarNumber] = useState(0);
  const onClick = (e: any) => {
    console.log(e);
  };
  return (
    <div>
      <h1>Register</h1>
      <form>
        <TextField
          label="名前"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="車ナンバー 4桁"
          required
          onChange={(e) => setCarNumber(Number(e.target.value))}
        />
        <Button onClick={(e) => onClick(e)}>送信</Button>
      </form>
    </div>
  );
}
