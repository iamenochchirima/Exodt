import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate} from 'react-router-dom';
import Spinner from '../../components/Spinner'
import { useSignUpMutation } from '../../redux/features/api/authApi';

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

	const [signUp, { isLoading, isSuccess, isError}] = useSignUpMutation()

	const initialFormData = Object.freeze({
		first_name: '',
		last_name: '',
		username: '',
		email: '',
		password: '',
		re_password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({...formData, [e.target.name]: e.target.value.trim(), });
	};

	const {first_name, last_name, username, email, password, re_password} = formData;

	const body = {
		first_name: formData.first_name, 
		last_name: formData.last_name,
		username: formData.username,
		email: formData.email,
		password: formData.password,
		re_password: formData.re_password
	}

	const handleSubmit = async (e) =>  {
		e.preventDefault();
		if (body) {
			try {
				if (body.password !== body.re_password) {
					alert('Password mismatch')
				  };
				  
				await signUp(body)
				.unwrap()
				.then((payload) => console.log('fulfilled', payload))
			} catch (err) {
				console.error('Failed to signup: ', err)
			}
		}
	}

	let content

	if (isSuccess) {
		content = (
			<div>
        		<p>You have successfully signed up, check your email and very your email. Return here when you're done</p>
    		</div>
		)
	} else if (isError) {
		content = (
			<div>
        		<p>Something went wrong</p>
    		</div>
		)
	} else {
		content = (
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
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							value={username}
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
							disabled={isLoading}
							className={classes.submit}
							onClick={handleSubmit}
						>
							{isLoading ? <Spinner /> : 'Sign up'}
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

	return content;
}

export default SignUp;