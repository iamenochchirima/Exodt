import React, { useEffect, useState } from 'react';
import List from './List'
import PostLoading from './PostLoading';
import { POSTS_URL } from '../constants/'

function Post() {
  const ListLoading = PostLoading(List);
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
      <div className='container'>
        <h1>Post</h1>
      </div>
      <div className='repo-container'>
        <ListLoading isLoading={appState.loading} posts={appState.posts} />
      </div>
    </div>
  );
}
export default Post;
