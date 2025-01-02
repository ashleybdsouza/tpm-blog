import React from 'react';
import PostList from '../components/PostList';
import blogPostData from '../data';

function HomePage() {
    return (
        <div class="post-list">
            <PostList posts={blogPostData} />
        </div>
    );
}

export default HomePage;