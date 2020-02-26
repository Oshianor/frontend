import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import { connect } from "react-redux";
import { setUserData } from "../../store/actions"
import Exit from "@material-ui/icons/ExitToApp"
import IconButton from "@material-ui/core/IconButton";
import Router from "next/router";



const mapStateToProps = state => ({
  user: state.user
});


const mapDispatchToProps = {
  setUserData
};


const Header = (props) => {
  const classes = useStyles();
  const { user, setUserData } = props;


  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUserData(null);
    Router.push("/login");
  }

  const loggedIn = () => {
    return (
      <>
        <div className={classes.user}>
          <Typography variant="overline" className={classes.username}>
            @
          </Typography>
          <Typography
            variant="overline"
            className={classes.username}
            component="a"
            href={"/p/" + user.user.username}
          >
            {user.user.username}
          </Typography>
        </div>
        <IconButton onClick={handleLogOut}>
          <Exit style={{ color: "white" }} />
        </IconButton>
      </>
    );
  }

  


  const notLoggedIn = () => {
    return (
      <>
        <Button href="/login" color="inherit" size="small">
          Login
        </Button>
        <Fab
          variant="extended"
          size="small"
          href="/register"
          color="secondary"
          aria-label="add"
          className={classes.margin}
        >
          Join Us
        </Fab>
      </>
    );
  }

  // *131#


  return (
    <AppBar position="static" elevation={1} className={classes.root}>
      <Container maxWidth="md">
        <Toolbar>
          <img src="/static/tipcoins/tip-large.png" className={classes.logo} />
          <div className={classes.title} />
          {
            user.user ? (
              loggedIn()
            ) : (
              notLoggedIn()
            )
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1
    // backgroundColor: "transparent"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  logo: {
    width: "auto",
    height: 40
  },
  margin: {
    margin: theme.spacing(1),
    width: "90px !important"
  },
  user: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  username: { color: "white", fontSize: 16 }
}));
