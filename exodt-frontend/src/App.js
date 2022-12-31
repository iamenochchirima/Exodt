import React, { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
import Header from './components/Header'
import withListLoading from './components/withListLoading';
function App() {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    posts: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `http://localhost:8000/api/`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((posts) => {
        setAppState({ loading: false, posts: posts });
        console.log(posts);
      });
  }, [setAppState]);
  return (
    <div className='App'>
      <Header/>
      <div className='container'>
        <h1>Posts</h1>
      </div>
      <div className='repo-container'>
        <ListLoading isLoading={appState.loading} posts={appState.posts} />
      </div>
      <footer>
        <div className='footer'>
          Built{' '}
          <span role='img' aria-label='love'>
            💚
          </span>{' '}
          with by Shedrack Akintayo
        </div>
      </footer>
    </div>
  );
}
export default App;
