// src/components/PostListItem.js
import React from "react";
import { Link } from "react-router-dom";

function PostListItem({ post, onTagClick }) {
  return (
    <div>
      <h2>
        <Link to={`/post/${post.slug}`}>{post.title}</Link>
      </h2>
      <p> {post.introduction.substring(0, 100)}...</p>
      <p>
        <i> - By {post.author}, {post.date} </i>
      </p>
    </div>
  );
}

export default PostListItem;