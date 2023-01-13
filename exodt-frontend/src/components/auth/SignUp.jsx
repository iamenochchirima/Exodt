import React, { useState } from 'react';
import { connect } from 'react-redux'
import { signup } from '../../redux/actions/auth';

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

const SignUp = ({ signup, isAuthenticated }) => {

	const [accountCreated, setAccountCreated] = useState(false);

	const initialFormData = Object.freeze({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		re_password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({...formData, [e.target.name]: e.target.value.trim(), });
	};

	const {first_name, last_name, email, password, re_password} = formData;

	const handleSubmit = (e) => {
		e.preventDefault();

		if (password === re_password) {
			signup(first_name, last_name, email, password, re_password);
			setAccountCreated(true);
		}
	
	};

	const classes = useStyles();

	if (isAuthenticated) {
        return <Navigate to='/' />
    }
    if (accountCreated) {
        return <Navigate to='/login' />
    }

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Create your account
				</Typography>
				<form className={classes.form} noValidate>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="first_name"
							label="Firstname"
							name="first_name"
							value={first_name}
							autoComplete="first_name"
							onChange={handleChange}
						/>
					</Grid>
					<TextField
						variant="outlined"
						required
						fullWidth
						id="last_name"
						label="Lastname"
						name="last_name"
						value={last_name}
						autoComplete="last_name"
						onChange={handleChange}
					/>
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
						onChange={handleChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="re_password"
						label="Retype password"
						type="password"
						value={re_password}
						id="re_password"
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
						Sign up
					</Button>
					<Grid container>
						<Grid item>
							<Link 
								component={NavLink}
								to="/login"
							>
								Already have an account? Sign in
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

export default connect(mapStateToProps, { signup })(SignUp);