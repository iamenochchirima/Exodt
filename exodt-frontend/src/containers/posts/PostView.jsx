import React from 'react';
import { useParams } from 'react-router-dom';
//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { useGetPostDetailsQuery } from '../../redux/features/api/postsApi';
import Spinner from '../../components/Spinner';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

export default function Post() {
	const { id } = useParams();
	const classes = useStyles();

	const { data: post, isFetching, isSuccess, isError, error  } = useGetPostDetailsQuery(id);

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
					</Container>
				</div>
			</Container>
		);
	}

	return content;
}