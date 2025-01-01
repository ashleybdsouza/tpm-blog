import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
  // State for desktop TOC visibility
  const [showDesktopToc, setShowDesktopToc] = useState(true);

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

  const handleSummaryClick = (event) => {
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

  // Toggle desktop TOC visibility
  const toggleDesktopToc = () => {
    setShowDesktopToc(!showDesktopToc);
  };

  const smoothScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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

      <div className={`content-wrapper ${showDesktopToc ? "" : "full-width"}`}>
        {/* Floating TOC icon for mobile */}
        {isMobile && (
          <div
            className={`floating-toc-icon ${showTocModal ? "open" : ""}`}
            onClick={toggleTocModal}
          >
            <FontAwesomeIcon icon={faBars} />
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

        {/* Show/Hide Desktop TOC Button */}
        {!isMobile && (
          <button className="toggle-desktop-toc" onClick={toggleDesktopToc}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}

        {/* Sticky TOC for desktop */}
        {!isMobile && showDesktopToc && (
          <ul className="table-of-contents sticky-toc">
            {toc.map((section) => (
              <li key={section.id}>
                <details open>
                  <summary
                    onClick={(event) => handleSummaryClick(event, section.id)}
                  >
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

          <h2>Conclusion</h2>
          <ReactMarkdown
            className="preserve-newlines"
            remarkPlugins={[remarkGfm]}
          >
            {post.conclusion}
          </ReactMarkdown>
          {post.conclusionExample && (
            <blockquote>
              <ReactMarkdown
                className="preserve-newlines"
                remarkPlugins={[remarkGfm]}
              >
                {"**Example:** " + post.conclusionExample}
              </ReactMarkdown>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;