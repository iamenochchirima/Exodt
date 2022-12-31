import React, { useEffect, useState } from 'react';
import List from './List'
import withListLoading from './withListLoading';
import { POSTS_URL } from '../constants/'

function Posts() {
  const ListLoading = withListLoading(List);
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
    <div className='Posts'>
      <div className='container'>
        <h1>Posts</h1>
      </div>
      <div className='repo-container'>
        <ListLoading isLoading={appState.loading} posts={appState.posts} />
      </div>
    </div>
  );
}
export default Posts;
