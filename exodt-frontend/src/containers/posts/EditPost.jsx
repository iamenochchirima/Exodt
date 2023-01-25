import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditPostMutation, useGetPostDetailsQuery } from '../../redux/features/api/postsApi';

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

const EditPost = () => {

    const { id: postId } = useParams()

	const classes = useStyles();
	const navigate = useNavigate();

    const [post, setPost] = useState({});
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

	const [editPost, {isLoading, isSuccess}] = useEditPostMutation()
    const {data} = useGetPostDetailsQuery(postId)
    const { userProfileDetails} = useSelector((state) => state.auth);

    useEffect(() => {
        if (data) {
            setPost(data.post);
            setContent(data.content);
            setImage(data.image);
            console.log(data.image, 'here');
        }
    }, [data]);

    const handleRemoveImage = () => {
        setImage('');
    }

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
				await editPost({id: postId,body: formData}).unwrap()
				.then((payload) => console.log('fulfilled', payload))
			} catch (err) {
				console.error('Failed to edit: ', err)
			}
		}
	};

	useEffect(() => {
		if (isSuccess) {
			navigate('/')
		}
	}, [navigate, isSuccess]);

	return (
        <Container component="main" maxWidth="xs">
			<CssBaseline />
		<form className={classes.form} noValidate onSubmit={handleSubmit}>
        {postId ? (
            <>
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
                            onChange={e => setContent(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="image"
                            type="file"
                            onChange={e => setImage(e.target.files[0])}
                        />
                        {image && <button onClick={handleRemoveImage}>Remove Image</button>}
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Edit Post'}
                </Button>
            </>
        ) : (
            <Spinner />
        )}
    </form>
    </Container>
	);
}

export default EditPost;