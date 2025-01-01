import React from 'react';
import PostListItem from './PostListItem';

function PostList({ posts }) {
    return (
        <div>
            {posts.map(post => (
                <PostListItem key={post.id} post={post} />
            ))}
        </div>
    );
}

export default PostList;