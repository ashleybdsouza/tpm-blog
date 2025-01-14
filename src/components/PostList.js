import React from 'react';
import PostListItem from './PostListItem';

function PostList({ posts, onTagClick }) {
    return (
         <div>
          {posts.map((post) => (
            <PostListItem key={post.id} post={post} onTagClick={onTagClick} />
          ))}
        </div>
    );
}

export default PostList;