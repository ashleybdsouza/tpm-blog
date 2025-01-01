import React from 'react';
import { Link } from 'react-router-dom';

function PostListItem({ post }) {
    return (
        <div>
            <h2><Link to={`/post/${post.id}`}>{post.title}</Link></h2>
            <p>{post.introduction.substring(0, 100)}...</p> {/* Short excerpt */}
            <p>By {post.author}, {post.date}</p>
        </div>
    );
}

export default PostListItem;