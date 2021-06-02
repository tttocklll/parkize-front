import React from "react"
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">
            <Link to="/register">登録</Link>
          </Button>
          <Button color="inherit">
            <Link to="/search">検索</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}