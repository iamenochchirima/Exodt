import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import {Favorite, MoreVert, Share} from "@mui/icons-material";
import {Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Typography,
  } from "@mui/material";

import { useGetPostsQuery } from '../../redux/features/api/postsApi';
import Spinner from '../../components/Spinner';
import { Box } from '@mui/material';
import { mediaUrl } from '../../constants';

const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	},
	media: {
	  paddingTop: '56.25%', // 16:9
	},
	expand: {
	  transform: 'rotate(0deg)',
	  marginLeft: 'auto',
	  transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	  }),
	},
	expandOpen: {
	  transform: 'rotate(180deg)',
	},
	avatar: {
	  backgroundColor: red[500],
	},
  }));

const Feed = () => {
	const classes = useStyles();

	const [expanded, setExpanded] = useState(false);
  
	const handleExpandClick = () => {
	  setExpanded(!expanded);
	};
	
	const {
		data: posts,
		isLoading,
		isSuccess,
		isError,
		error
	  } = useGetPostsQuery()

	let content

	if (isLoading) {
		content = <Box flex={5} sx={{margin: 5}}><Spinner/></Box>
	}  else if (!posts || posts.length === 0){
		content =<Box flex={5} sx={{margin: 5}}>
					 <center><p>Can not find any posts, sorry</p></center>
					</Box>
	} else if (isError) {
		content = <div>{error.toString()}</div>
	} else if (isSuccess) {
		content = (
			<React.Fragment>
				<Box flex={5} sx={{margin: 5}} >
					<Grid container spacing={5} alignItems="flex-end">
						{posts.map((post) => {
							console.log(post)
							return (
								<Grid item key={post.id} xs={12} md={12}>
									<Card >
										<CardHeader
											avatar={
											<Avatar 
											aria-label="recipe" 
											className={classes.avatar}
											src={mediaUrl + post.author_details.profile_image} 
											alt="Author profile picture" 
											sx={{ width: 24, height: 24 }}
											/>
											}
											action={
											<IconButton aria-label="settings">
												<MoreVert/>
											</IconButton>
											}
											title={post.author_details.first_name + " " + post.author_details.last_name}
											subheader={post.created_formatted}
											/>
											{post.image ? (
											<CardMedia
											className={classes.media}
											image={post.image}
											title="Post Image"
										/>
										) : null}
										<CardContent>
											<Typography variant="body2" color="textSecondary" component="p">
											{post.content}
											</Typography>
										</CardContent>
										<CardActions disableSpacing>
											<IconButton aria-label="add to favorites">
											<Favorite />
											</IconButton>
											<IconButton aria-label="share">
											<Share />
											</IconButton>
										</CardActions>
										</Card>
								</Grid>
							);
						})}
					</Grid>
				</Box>
			</React.Fragment>
		);
	}
	

	return content;
};
export default Feed;