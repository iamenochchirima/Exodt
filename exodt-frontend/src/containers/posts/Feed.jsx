import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';

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
				<Box flex={5} sx={{margin: 5}}>
					<Grid container spacing={5} alignItems="flex-end">
						{posts.map((post) => {
							console.log(post)
							return (
								// Enterprise card is full width at sm breakpoint
								<Grid item key={post.id} xs={12} md={12}>
									<Card className={classes.root}>
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
												<MoreVertIcon />
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
											<FavoriteIcon />
											</IconButton>
											<IconButton aria-label="share">
											<ShareIcon />
											</IconButton>
										</CardActions>
										</Card>
									{/* <Card className={classes.card}>
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
									</Card> */}
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