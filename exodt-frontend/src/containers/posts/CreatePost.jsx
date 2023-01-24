import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatePostMutation } from '../../redux/features/api/postsApi';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner'

//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const CreatePost = () => {

	const classes = useStyles();
	const navigate = useNavigate();

	const clearData = () => {
		setContent('');
		setImage('null');
	}

 	const [content, setContent] = useState('');
	const [image, setImage] = useState(null);

	const { userProfileDetails} = useSelector((state) => state.auth);

	const [submitPost, {isLoading, isSuccess}] = useCreatePostMutation()

	const handleSubmit = async (e) => {
		e.preventDefault();
		let formData = new FormData();

		formData.append('content', content);
		formData.append('author', userProfileDetails.id)
		
		if (image) {
			formData.append('image', image);
		}

		if (formData) {
			try {
				await submitPost(formData).unwrap()
				.then((payload) => console.log('fulfilled', payload))
			} catch (err) {
				console.error('Failed to post: ', err)
			}
		}
		clearData();
	};

	useEffect(() => {
		if (isSuccess) {
			navigate('/')
		}
	}, [navigate, isSuccess]);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					CreatePost New Post
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="content"
								label="content"
								name="content"
								value={content}
								autoComplete="content"
								onChange={(e) => setContent(e.target.value)}
								multiline
								rows={4}
							/>
						</Grid>
						<input
							accept="image/*"
							className={classes.input}
							id="image"
							onChange={(e) => setImage(e.target.files[0])}
							name="image"
							type="file"
						/>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						{isLoading ? <Spinner/> : 'Create'}
					</Button>
				</form>
			</div>
		</Container>
	);
}

export default CreatePost;