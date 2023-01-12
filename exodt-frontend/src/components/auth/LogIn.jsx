import React, { useState } from 'react';
import { connect } from 'react-redux'
import { login } from '../../actions/auth';

//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { NavLink, Link, Navigate} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Login = ({ login, isAuthenticated }) => {
	const initialFormData = Object.freeze({
		email: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({...formData, [e.target.name]: e.target.value.trim(), });
	};

	const {email, password} = formData;

	const handleSubmit = (e) => {
		e.preventDefault();
		
		login(email, password);
	};

	const classes = useStyles();

	if (isAuthenticated) {
		return <Navigate to='/'/>
	}

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
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link 
								component={NavLink}
								to="/reset-password"
							>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link 
								component={NavLink}
								to="/signup"
							>
								Don't have an account? Sign Up
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);