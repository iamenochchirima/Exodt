import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import { useGetPostsQuery } from '../../redux/features/api/authApi';
import Spinner from '../../components/Spinner';

const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));

const PostList = () => {
	
	const {
		data: posts,
		isLoading,
		isSuccess,
		isError,
		error
	  } = useGetPostsQuery()

	const classes = useStyles();

	console.log(posts)

	let content

	if (isLoading) {
		content = <Spinner/>
	}  else if (!posts || posts.length === 0){
		<p>Can not find any posts, sorry</p>
	} else if (isError) {
		content = <div>{error.toString()}</div>
	} else if (isSuccess) {
		content = (
			<React.Fragment>
				<Container maxWidth="md" component="main">
					<Grid container spacing={5} alignItems="flex-end">
						{posts.map((post) => {
							return (
								// Enterprise card is full width at sm breakpoint
								<Grid item key={post.id} xs={12} md={4}>
									<Card className={classes.card}>
										<Link
											color="textPrimary"
											href={'post/' + post.id}
											className={classes.link}
										>
											<CardMedia
												className={classes.cardMedia}
												image={post.image}
												title="Image title"
											/>
										</Link>
										<CardContent className={classes.cardContent}>
											<Typography
												gutterBottom
												variant="h6"
												component="h2"
												className={classes.postTitle}
											>
												{post.content.substr(0, 50)}...
											</Typography>
											<div className={classes.postText}>
												<Typography
													component="p"
													color="textPrimary"
												></Typography>
												<Typography variant="p" color="textSecondary">
													{post.created.substr(0, 60)}...
												</Typography>
											</div>
										</CardContent>
									</Card>
								</Grid>
							);
						})}
					</Grid>
				</Container>
			</React.Fragment>
		);
	}
	

	return content;
};
export default PostList;