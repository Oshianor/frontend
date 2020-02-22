import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import { config } from "../../../../config";
import Router from "next/router";
import { connect } from "react-redux";
import { setToken } from "../../../store/actions"


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Tipestry
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const mapDispatchToProps = {
  setToken
};

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignInSide = (props) => {
  const { setToken } = props;
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [res, setRes] = useState({ err: false, msg: "", status: "" });
	const [value, setValue] = useState({
		email: "",
		password: ""
  })


	const handleChange = val => (event) => {
		setValue({
			...value,
			[val]: event.target.value
		})
	}

	const handleLogin = async (event) => {
		event.preventDefault();

		if (!isEmail(value.email)) {
			setRes({
				err: true,
				msg: "A valid Email is required",
				status: "warning"
			})
			return;
		}

		if (value.password === "") {
			setRes({
				err: true,
				msg: "Password is required",
				status: "warning"
			})
			return;
		}

		if (value.password.length < 6) {
			setRes({
				err: true,
				msg: "Password must have a minimum of 6 characters",
				status: "warning"
			})
			return;
		}
		try {
      const login = await axios.post(config.login, value);
      
      // save token to local storage
      localStorage.setItem("token", login.headers["x-auth-token"]);
      
      // set token to redux state
      setToken(login.headers["x-auth-token"]);

      // redirect to homepage
      Router.push("/");
      
		} catch (error) {
      console.log("error", error);
		}
	}

  return (
    <form className={classes.form} onSubmit={handleLogin} noValidate>
      {res.err && <Alert severity={res.status}>{res.msg}</Alert>}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        onChange={handleChange("email")}
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        onChange={handleChange("password")}
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        {loading ? <CircularProgress /> : "Sign In"}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="/forgot" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="/register" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
      <Box mt={5}>
        <Copyright />
      </Box>
    </form>
  );
}



export default connect(null, mapDispatchToProps)(SignInSide);