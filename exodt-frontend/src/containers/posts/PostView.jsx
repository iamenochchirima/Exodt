import React, { Fragment } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

import { useGetPostDetailsQuery, useDeletePostMutation } from '../../redux/features/api/postsApi';
import Spinner from '../../components/Spinner';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	button: {
		margin: theme.spacing(1),
	  },	
}));

export default function Post() {
	const navigate = useNavigate();
	const { id } = useParams();
	const classes = useStyles();

	const { data: post, isFetching, isSuccess, isError, error  } = useGetPostDetailsQuery(id);
	const { userProfileDetails} = useSelector((state) => state.auth);
	const [deletePost, {isLoading: deleteSuccess}] = useDeletePostMutation();

	let isAuthor = false

	if (userProfileDetails) {
		if (userProfileDetails.user === post.author) {
			isAuthor = true
		}
	}

	const handleDelete = () => {
		deletePost(id);
	}

	useEffect(() => {
		if (deleteSuccess) {
			navigate('/');
		}
	},[navigate, deleteSuccess])

	const authorActions = () => (
		<Fragment>
			<Link
				color="textPrimary"
				to={'/edit-post/' + post.id}
				className={classes.link}
				label="Edit"
			>
				<Button 
					variant="contained" 
					color="primary"
					className={classes.button}
					startIcon={<EditIcon />}
				>
					Edit
				</Button>
			</Link>
			<Button 
					variant="contained" 
					color="primary"
					className={classes.button}
					startIcon={<DeleteIcon />}
					onClick={handleDelete}
				>
					{deleteSuccess? <Spinner/> : 'Delete'}
				</Button>
		</Fragment>
	)
	let content

	if (isFetching) {
		content = <Spinner/>
	} else if (isError) {
		content = <div>{error.toString()}</div>
	} else if (isSuccess) {
		content = (
			<Container component="main" maxWidth="md">
				<CssBaseline />
				<div className={classes.paper}></div>
				<div className={classes.heroContent}>
					<Container maxWidth="sm">
						
						<Typography
							variant="h5"
							align="center"
							color="textSecondary"
							paragraph
						>
							{post.content}
						</Typography>
						{isAuthor ? authorActions() : null }
					</Container>
				</div>
			</Container>
		);
	}

	return content;
}