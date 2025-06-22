 import { useState } from 'react';
 import NewPost from './NewPost';
 import Post from './Post';
 import Modal from './Modal';
 import classes from './PostsList.module.css';

 function PostsList({isPosting, onStopPosting}) {
 const [posts, setPosts] = useState([]);

 function addPostHandler(postData) {
  fetch('http://localhost:8080/posts', {
    method: 'POST'
  });
  setPosts((existingPosts) => [postData, ...existingPosts]);
 }

 return (
  <>
  {isPosting && (
    <Modal onClose={onStopPosting}>
      <NewPost
      onCancel={onStopPosting} onAddPost={addPostHandler}
      />
      </ Modal>
  )}
  {posts.length > 0 && (
  <ul className={classes.posts}>
{posts.map((post) =>(
<Post key={post.body} author={post.author} body={post.body} />
))}
  </ul>
)}
{posts.length === 0 && (
<div style={{textAlign: 'centre' , color: 'pink' }}>
  <h2> Never Gonnna Give You Up. </h2>
  <p>Start Working towards it</p>
   </div>
)}
  </>
 );
}

export default PostsList;