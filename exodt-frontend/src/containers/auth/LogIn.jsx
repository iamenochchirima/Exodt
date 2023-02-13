import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useLogInMutation } from "../../redux/features/api/authApi";
import { setTokens } from "../../redux/features/api/authSlice";
import Spinner from "../../components/Spinner";

//MaterialUI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { NavLink, Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });
  const [formData, updateFormData] = useState(initialFormData);
  const handleChange = (e) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };
  const { email, password } = formData;
  const [logIn, { data, isLoading, isSuccess }] = useLogInMutation();
  const body = { email: formData.email, password: formData.password };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (body) {
      try {
        await logIn(body)
          .unwrap()
          .then((payload) => console.log("fulfilled", payload));
      } catch (err) {
        console.error("Failed to login: ", err);
      }
    }
  };
  useEffect(() => {
    if (data) dispatch(setTokens(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      window.location.reload();
    }
  }, [navigate, isSuccess]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            {isLoading ? <Spinner /> : "Sign in"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={NavLink} to="/reset-password">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={NavLink} to="/signup">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
