import { Button, TextField, Paper, Card, CardContent, Container } from "@material-ui/core";
import React, { useState } from "react";

import { getRequest2GAS } from "../utils/GetRequest2GAS";

export default function Home() {
  const [carNumber, setCarNumber] = useState("");
  const [data, setData] = useState<any>([]);
  const onClick = async () => {
    const params = {
      mode: "search",
      car_number: carNumber,
      crossDomain: true,
    };
    const res = await getRequest2GAS(params);
    console.log(res)
    setData(res.data.search)
  };
  return (
    <Container maxWidth="xs">
      <h1>search</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextField label="車ナンバー 4桁 （「・」は0で入力してください）" onChange={e => setCarNumber(e.target.value)} required type="number" />
        <Button onClick={onClick} variant="contained" color="primary">検索</Button>
      </div>
      <Paper elevation={3}>
        {data.length !== 0 && (
          <>
            <h3>該当者一覧</h3>
            {data.map((item: any, index: number) => (

              <Card key={index}>
                <CardContent>
                  <p>名前：{item[0]}</p>
                  <p>車のナンバー：{item[1]}</p>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </Paper >
    </Container>
  );
}
