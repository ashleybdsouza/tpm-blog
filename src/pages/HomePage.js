import React from 'react';
import PostList from '../components/PostList';
import blogPostData from '../data';

function HomePage() {
    return (
        <div>
            <h1>My Blog</h1>
            <PostList posts={blogPostData} />
        </div>
    );
}

export default HomePage;