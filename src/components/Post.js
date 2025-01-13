import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom"; // import useLocation

function Post({ post }) {
  const location = useLocation();
  const currentPath = location.pathname;
  // Generate TOC data
  const toc = post.sections.map((section) => ({
    id: `section-${post.id}-${section.id}`,
    title: section.heading,
    subsections: section.subsections
      ? section.subsections.map((subsection) => ({
          id: `section-${post.id}-${section.id}-subsection-${subsection.id}`,
          title: subsection.subheading,
        }))
      : [],
  }));

  // State for mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // State for modal visibility
  const [showTocModal, setShowTocModal] = useState(false);

  // Ref for the modal content
  const modalContentRef = useRef(null);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle TOC modal visibility
  const toggleTocModal = () => {
    setShowTocModal(!showTocModal);
  };

  // Close modal when clicking outside of it
  const handleModalClick = (event) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(event.target)
    ) {
      setShowTocModal(false);
    }
  };

  // Close modal when clicking on a TOC link
  const handleTocLinkClick = () => {
    setShowTocModal(false);
  };

  const smoothScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Use the currentPath prop in generating section and subsection IDs
  const getSectionId = (sectionId) =>
    `section-${post.id}-${sectionId}${currentPath}`;
  const getSubsectionId = (sectionId, subsectionId) =>
    `section-${post.id}-${sectionId}-subsection-${subsectionId}${currentPath}`;
  const updateHash = (id) => {
    window.location.hash = id;
  };
  return (
    <div className="post-container">
      <h1>{post.title}</h1>

      {/* Non-floating TOC for mobile (below title) */}
      {isMobile && (
        <ul className="table-of-contents non-sticky-toc">
          {toc.map((section) => (
            <li key={section.id}>
              <details open>
                <summary>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollTo(section.id);
                    }}
                  >
                    {section.title}
                  </a>
                </summary>
                {section.subsections && (
                  <ul>
                    {section.subsections.map((subsection) => (
                      <li key={subsection.id}>
                        <a
                          href={`#${subsection.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            smoothScrollTo(subsection.id);
                          }}
                        >
                          {subsection.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </details>
            </li>
          ))}
        </ul>
      )}

      <div className="content-wrapper">
        {/* Floating TOC icon for mobile */}
        {isMobile && (
          <div
            className={`floating-toc-icon ${showTocModal ? "open" : ""}`}
            onClick={toggleTocModal}
          >
            <FontAwesomeIcon icon={faBars} />
          </div>
        )}

        {/* TOC Modal for mobile */}
        {isMobile && showTocModal && (
          <div className="toc-modal" onClick={handleModalClick}>
            <div className="toc-modal-content" ref={modalContentRef}>
              <button className="close-modal" onClick={toggleTocModal}>
                &times;
              </button>
              <ul className="table-of-contents">
                {toc.map((section) => (
                  <li key={section.id}>
                    <details open>
                      <summary>
                        <a
                          href={`#${section.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleTocLinkClick();
                            smoothScrollTo(section.id);
                          }}
                        >
                          {section.title}
                        </a>
                      </summary>
                      {section.subsections && (
                        <ul>
                          {section.subsections.map((subsection) => (
                            <li key={subsection.id}>
                              <a
                                href={`#${subsection.id}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleTocLinkClick();
                                  smoothScrollTo(subsection.id);
                                }}
                              >
                                {subsection.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Sticky TOC for desktop */}
        {!isMobile && (
          <div className="toc-wrapper">
            <ul className="table-of-contents sticky-toc">
              {toc.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollTo(section.id);
                    }}
                  >
                    {section.title}
                  </a>
                  {section.subsections && (
                    <ul>
                      {section.subsections.map((subsection) => (
                        <li key={subsection.id}>
                          <a
                            href={`#${subsection.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              smoothScrollTo(subsection.id);
                            }}
                          >
                            {subsection.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="post-content">
          <ReactMarkdown
            className="preserve-newlines"
            remarkPlugins={[remarkGfm]}
          >
            {post.introduction}
          </ReactMarkdown>

          {post.sections.map((section) => (
            <div key={section.id}>
              <h2 id={`section-${post.id}-${section.id}`}>
                {section.heading}
              </h2>
              <ReactMarkdown
                className="preserve-newlines"
                remarkPlugins={[remarkGfm]}
              >
                {section.content}
              </ReactMarkdown>
              {section.example && (
                <blockquote>
                  <ReactMarkdown
                    className="preserve-newlines"
                    remarkPlugins={[remarkGfm]}
                  >
                    {"**Example:** " + section.example}
                  </ReactMarkdown>
                </blockquote>
              )}

              {section.subsections &&
                section.subsections.map((subsection) => (
                  <div key={subsection.id}>
                    <h3
                      id={`section-${post.id}-${section.id}-subsection-${subsection.id}`}
                    >
                      {subsection.subheading}
                    </h3>
                    <ReactMarkdown
                      className="preserve-newlines"
                      remarkPlugins={[remarkGfm]}
                    >
                      {subsection.content}
                    </ReactMarkdown>
                    {subsection.example && (
                      <blockquote>
                        <ReactMarkdown
                          className="preserve-newlines"
                          remarkPlugins={[remarkGfm]}
                        >
                          {"**Example:** " + subsection.example}
                        </ReactMarkdown>
                      </blockquote>
                    )}
                  </div>
                ))}
            </div>
          ))}
                <div className="post-tags">
                  <h3>Tags:</h3>
                      {post.tags && post.tags.slice(0, 10).map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
        </div>
      </div>
      {/* Navigation Links */}
      <div className="post-navigation">
        {post.previousPost && (
            <Link to={`/post/${post.previousPost.slug}`} className="previous-post">
            &larr; <b>Previous</b>: {post.previousPost.prevnext}
            </Link>
        )}
        {post.nextPost && (
            <Link to={`/post/${post.nextPost.slug}`} className="next-post"> 
            <b>Next</b>: {post.nextPost.prevnext} &rarr;
            </Link>
        )}
      </div>
      {/* About the Author Section */}
          <div className="author-bio">
            <h3>About the Author</h3>
            
            <p className="preserve-newlines">{post.authorBio}</p>
          </div>
    </div>
  );
}

export default Post;