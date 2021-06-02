import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>home</h1>
      <Button>
        <Link to="/register">登録</Link>
      </Button>
      <Button>
        <Link to="/search">検索</Link>
      </Button>
    </div>
  );
}
