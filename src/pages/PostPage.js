// src/pages/PostPage.js
import React from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import blogPostData from "../data";

function PostPage() {
  const { slug } = useParams(); // Get slug from URL params
  const post = blogPostData.find((p) => p.slug === slug); // Find post by slug

  if (!post) {
    return <div>Post not found!</div>;
  }

  return (
    <div>
      <Post post={post} />
    </div>
  );
}

export default PostPage;