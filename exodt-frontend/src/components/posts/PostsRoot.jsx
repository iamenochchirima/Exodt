import React, { useEffect, useState } from 'react';
import PostsList from './PostsList'
import PostLoadingComponent from './PostLoading';
import axiosInstance from '../../Axios';
// import { connect } from 'react-redux'
// import { load_posts } from '../../redux/actions/auth';


function Post({ load_posts, posts }) {
  const PostLoading = PostLoadingComponent(PostsList);
  const [appState, setAppState] = useState({
    loading: false,
    posts: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
		// load_posts();
    console.log(posts, 'Here!!!!!!!!!!!!!!!!!!!!!!!!!');
    setAppState({ loading: false, posts: posts });
 

	}, [setAppState]);
  return (
    <div className='Post'>
      <div className='repo-container'>
        <PostLoading isLoading={appState.loading} posts={appState.posts} />
      </div>
    </div>
  );
}


// const mapStateToProps = state => ({
// 	isAuthenticated: state.auth.isAuthenticated
// });

export default Post;
