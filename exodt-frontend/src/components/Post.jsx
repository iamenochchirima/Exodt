import React, { useEffect, useState } from 'react';
import PostsList from './PostsList'
import PostLoadingComponent from './PostLoading';
import { POSTS_URL } from '../constants'
import axios from 'axios'


function Post() {
  const PostLoading = PostLoadingComponent(PostsList);
  const [appState, setAppState] = useState({
    loading: false,
    posts: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    axios.get(POSTS_URL).then((posts) => {
      const allPosts = posts.data;
        setAppState({ loading: false, posts: allPosts });
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
