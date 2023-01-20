import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../../redux/features/api/authApi';
import Spinner from '../../components/Spinner'

//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

const ResetPassword = () => {
	const classes = useStyles();
	const navigate = useNavigate()
	const initialFormData = Object.freeze({
		email: '',
	});
	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({...formData, [e.target.name]: e.target.value.trim(), });
	};

	const {email} = formData;

	const body = {email: formData.email}

	const [resetPassword, {isLoading, isSuccess, isError }] = useResetPasswordMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (body) {
			try {
				await resetPassword(body).unwrap()
				.then((payload) => console.log('fulfilled', payload))
			} catch (err) {
				console.error('Failed to reset: ', err)
			}
		}
	};

	let content;

	if (isSuccess) {
		content = (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
						Your request for password reset was successfull. 
						You can now close this page and check your email then the link we to confirm your password reset
					</Typography>
				</div>
			</Container>
		)
	} else if (isError) {
		content = (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
						Soomething went wrong
					</Typography>
				</div>
			</Container>
		)
	} else {
		content = (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
						Enter your email to request password reset
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
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleSubmit}
						>
							{isLoading ? <Spinner /> : 'Reset'}
						</Button>
					</form>
				</div>
			</Container>
		);
	}

	return content;
}

export default ResetPassword;