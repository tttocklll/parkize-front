import { Button, TextField } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>search</h1>
      <div>
        <TextField label="車ナンバー" />
        <Button>検索</Button>
      </div>
      <div>登録されている車一覧</div>
    </div>
  );
}
