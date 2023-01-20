import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useResetPasswordConfirmMutation } from '../../redux/features/api/authApi';
import Spinner from '../../components/Spinner'

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

const ResetPasswordConfirm = () => {
	const classes = useStyles();
	const navigate = useNavigate();

  	const { uid, token } = useParams();

	const initialFormData = Object.freeze({
		new_password: '',
		re_new_password: '',
	});
	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({...formData, [e.target.name]: e.target.value.trim(), });
	};

	const {new_password, re_new_password} = formData;

	const body = {uid, token, new_password: formData.new_password, re_new_password: formData.re_new_password}
	console.log(body, 'the')

	const [resetConfirm, {isLoading, isSuccess}] = useResetPasswordConfirmMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (body) {
			try {
				if (body.new_password !== body.re_new_password) {
					alert('Password mismatch')
				  };
				await resetConfirm(body).unwrap()
				.then((payload) => console.log('fulfilled', payload))
			} catch (err) {
				console.error('Failed to confirm rest: ', err)
			}
		}
	};

	useEffect(() => {
		if (isSuccess) {
			navigate('/login');
		}
		}, [navigate, isSuccess])

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Set new password
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="new_password"
            value={new_password}
						label="New password"
						type="password"
						id="new_password"
						onChange={handleChange}
					/>
          <TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="re_new_password"
						label="Retype new assword"
            value={re_new_password}
						type="password"
						id="re_new_password"
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
						{isLoading ? <Spinner /> : 'Confirm'}
					</Button>
				</form>
			</div>
		</Container>
	);
}


export default ResetPasswordConfirm;