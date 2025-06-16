"use client"

import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { togglePostLikedStatus } from '@/app/actions/posts';
import { useOptimistic } from 'react';

// Single post component — like a digital postcard showing a post
// Shows image, title, author, date, content, and a like button
function Post({ post, action }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            {/* Like button inside a form — toggles like on click */}
            <form 
              action={action.bind(null, post.id)} 
              className={post.isLiked ? 'liked' : ''}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

// Main Posts component — shows a list of posts with likes you can toggle
// Uses React's useOptimistic to update UI instantly when liking/unliking
export default function Posts({ posts }) {
  // Set up optimistic state for posts (updates UI before server responds)
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, updatedPostId) => {
      // Find the post that was liked/unliked
      const updatedPostIndex = prevPosts.findIndex(
        post => post.id === updatedPostId
      );

      if (updatedPostIndex === -1) return prevPosts;

      // Toggle like count and status
      const updatedPost = { ...prevPosts[updatedPostIndex] };
      updatedPost.likes += updatedPost.isLiked ? -1 : 1;
      updatedPost.isLiked = !updatedPost.isLiked;

      // Return updated posts array
      return [
        ...prevPosts.slice(0, updatedPostIndex),
        updatedPost,
        ...prevPosts.slice(updatedPostIndex + 1)
      ];
    }
  );

  // If no posts, show this message
  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  // Handle like/unlike button clicks with optimistic UI update
  async function updatePost(postId) {
    updateOptimisticPosts(postId);  // Update UI right away
    await togglePostLikedStatus(postId);  // Then update on server
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
