import React, { useState, useEffect, useRef } from "react";

function Post({ post }) {
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

  const handleSummaryClick = (event, sectionId) => {
    // Prevent navigation if a details element is being opened or closed
    if (event.target.tagName === "SUMMARY") {
      event.preventDefault();
      // Find the corresponding details element and toggle its open state
      const detailsElement = event.target.closest("details");
      if (detailsElement) {
        detailsElement.open = !detailsElement.open;
      }
    }
  };

  // Close modal when clicking outside of it
  const handleModalClick = (event) => {
    if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
      setShowTocModal(false);
    }
  };

  // Close modal when clicking on a TOC link
  const handleTocLinkClick = () => {
    setShowTocModal(false);
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
                <summary
                  onClick={(event) => handleSummaryClick(event, section.id)}
                >
                  <a href={`#${section.id}`}>{section.title}</a>
                </summary>
                {section.subsections && (
                  <ul>
                    {section.subsections.map((subsection) => (
                      <li key={subsection.id}>
                        <a href={`#${subsection.id}`}>{subsection.title}</a>
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
            {/* Use any icon you prefer */}
            <i className="fas fa-list"></i>
          </div>
        )}

        {/* TOC Modal */}
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
                      <summary
                        onClick={(event) =>
                          handleSummaryClick(event, section.id)
                        }
                      >
                        <a href={`#${section.id}`} onClick={handleTocLinkClick}>
                          {section.title}
                        </a>
                      </summary>
                      {section.subsections && (
                        <ul>
                          {section.subsections.map((subsection) => (
                            <li key={subsection.id}>
                              <a
                                href={`#${subsection.id}`}
                                onClick={handleTocLinkClick}
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
          <ul className="table-of-contents sticky-toc">
            {toc.map((section) => (
              <li key={section.id}>
                <details open>
                  <summary
                    onClick={(event) => handleSummaryClick(event, section.id)}
                  >
                    <a href={`#${section.id}`}>{section.title}</a>
                  </summary>
                  {section.subsections && (
                    <ul>
                      {section.subsections.map((subsection) => (
                        <li key={subsection.id}>
                          <a href={`#${subsection.id}`}>{subsection.title}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </details>
              </li>
            ))}
          </ul>
        )}

        <div className="post-content">
          <p>{post.introduction}</p>

          {/* Rest of the content */}
          {post.sections.map((section) => (
            <div key={section.id}>
              <h2 id={`section-${post.id}-${section.id}`}>
                {section.heading}
              </h2>
              <p>{section.content}</p>
              {section.example && (
                <p>
                  <i>Example:</i> {section.example}
                </p>
              )}

              {section.subsections &&
                section.subsections.map((subsection) => (
                  <div key={subsection.id}>
                    <h3
                      id={`section-${post.id}-${section.id}-subsection-${subsection.id}`}
                    >
                      {subsection.subheading}
                    </h3>
                    <p style={{ whiteSpace: "pre-line" }}>
                      {subsection.content}
                    </p>
                    {subsection.example && (
                      <p>
                        <i>Example:</i> {subsection.example}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          ))}

          <h2>Conclusion</h2>
          <p style={{ whiteSpace: "pre-line" }}>{post.conclusion}</p>
          {post.conclusionExample && (
            <p>
              <i>Example:</i> {post.conclusionExample}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;