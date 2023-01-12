import React, { useState } from 'react';
import { connect } from 'react-redux'
import { reset_password_confirm } from '../../actions/auth';
import { useParams } from 'react-router-dom';

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

const ResetPasswordConfirm = ({ reset_password_confirm }) => {

  const { uid, token } = useParams();

  const [requestSent, setRequestSent] = useState(false);

	const initialFormData = Object.freeze({
		new_password: '',
		re_new_password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({...formData, [e.target.name]: e.target.value.trim(), });
	};

	const {new_password, re_new_password} = formData;

	const handleSubmit = (e) => {
		e.preventDefault();

		reset_password_confirm(uid, token, new_password, re_new_password);
    setRequestSent(true);
	};

	const classes = useStyles();

	if (requestSent) {
		return <Navigate to='/'/>
	}

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
						Confirm
					</Button>
				</form>
			</div>
		</Container>
	);
}


export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);