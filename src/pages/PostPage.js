import React from 'react';
import { useParams } from 'react-router-dom';
import Post from '../components/Post';
import blogPostData from '../data';

function PostPage() {
    const { id } = useParams();
    const post = blogPostData.find(p => p.id === parseInt(id));

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