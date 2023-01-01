import React, { useEffect, useState } from 'react';
import PostsList from './PostsList'
import PostLoadingComponent from './PostLoading';
import { POSTS_URL } from '../constants/'

function Post() {
  const PostLoading = PostLoadingComponent(PostsList);
  const [appState, setAppState] = useState({
    loading: false,
    posts: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    fetch(POSTS_URL)
      .then((res) => res.json())
      .then((posts) => {
        setAppState({ loading: false, posts: posts });
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
