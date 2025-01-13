import React, { useState } from "react";
import PostList from "../components/PostList";
import blogPostData from "../data";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Number of posts to display per page

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Sort posts by date (newest to oldest)
  const sortedPosts = [...blogPostData].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const filteredPosts = sortedPosts.filter((post) => {
    const titleMatch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const tagMatch =
      post.tags &&
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return titleMatch || tagMatch;
  });

  // Get current posts for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="post-list">
        <PostList posts={currentPosts} />
      </div>

      {/* Pagination */}
      <ul className="pagination">
        {filteredPosts.length > postsPerPage &&
          Array.from(
            { length: Math.ceil(filteredPosts.length / postsPerPage) },
            (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <a
                  onClick={() => paginate(i + 1)}
                  href="#!"
                  className="page-link"
                >
                  {i + 1}
                </a>
              </li>
            )
          )}
      </ul>
    </div>
  );
}

export default HomePage;