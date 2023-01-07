import React, { useEffect, useState } from 'react';
import PostsList from './PostsList'
import PostLoadingComponent from './PostLoading';
import axiosInstance from '../../Axios';


function Post() {
  const PostLoading = PostLoadingComponent(PostsList);
  const [appState, setAppState] = useState({
    loading: false,
    posts: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
		axiosInstance.get().then((res) => {
			const allPosts = res.data;
			console.log(res.data);
			setAppState({ loading: false, posts: allPosts });
			console.log(res.data);
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
export default Post;
