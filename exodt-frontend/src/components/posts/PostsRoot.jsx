import React, { useEffect, useState } from 'react';
import PostsList from './PostsList'
import PostLoadingComponent from './PostLoading';
import axiosInstance from '../../Axios';
import { connect } from 'react-redux'
import { load_posts } from '../../redux/actions/auth';


function Post({ load_posts }) {
  const PostLoading = PostLoadingComponent(PostsList);
  const [appState, setAppState] = useState({
    loading: false,
    posts: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
		load_posts().then((res) => {
			const allPosts = res.posts;
			setAppState({ loading: false, posts: allPosts });
			console.log(allPosts, 'The data youre looking for');
		});
	}, [setAppState]);
  return (
    <div className='Post'>
      <div className='repo-container'>
        <PostLoading isLoading={appState.loading} posts={appState.posts} />
      </div>
    </div>
  );
}
export default connect(null, { load_posts })(Post);
