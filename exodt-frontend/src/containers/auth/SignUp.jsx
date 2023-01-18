import { useState, useEffect } from 'react';
import { NavLink, Link, Navigate, useNavigate} from 'react-router-dom';

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../../components/Error'
import Spinner from '../../components/Spinner'
import { registerUser } from '../../redux/features/auth/authActions'

//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

const SignUp = () => {
	const classes = useStyles();
	const navigate = useNavigate();

	const { loading, userInfo, error, success } = useSelector(
		(state) => state.auth
	  );
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();

	const submitForm = (data) => {
		if (data.password !== data.re_password) {
		  alert('Password mismatch')
		}
    	dispatch(registerUser(data))
	}

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

	// const handleSubmit = (e) => {
	// 	e.preventDefault();

	// 	// if (password === re_password) {
	// 	// 	signup(first_name, last_name, email, password, re_password);
	// 	// 	setAccountCreated(true);
	// 	// }
	
	// };

    useEffect(() => {
		// redirect user to login page if registration was successful
		if (success) navigate('/signup-redirect')
		// redirect authenticated user to profile screen
		if (userInfo) navigate('/profiles' + userInfo.id)
	  }, [navigate, userInfo, success])

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
							{...register('first_name')}
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
						{...register('last_name')}
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
						{...register('email')}
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
						{...register('password')}
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
						{...register('re_password')}
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
						disabled={loading}
						className={classes.submit}
						onClick={handleSubmit(submitForm)}
					>
						{loading ? <Spinner /> : 'Sign up'}
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

export default SignUp;