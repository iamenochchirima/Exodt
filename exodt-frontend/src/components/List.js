import React from 'react';
const List = (props) => {
  const { posts } = props;
  if (!posts || posts.length === 0) return <p>No posts, sorry</p>;
  return (
    <ul>
      <h2 className='list-head'>All Posts</h2>
      {posts.map((post) => {
        return (
          <li key={post.id} className='list'>
            <span className='post-text'>{post.content} </span>
            <span className='post-description'>{post.description}</span>
          </li>
        );
      })}
    </ul>
  );
};
export default List;
