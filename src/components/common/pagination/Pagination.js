import React from "react";
import { Link } from "react-router-dom";

export default function Pagination({
  hasPrevGroup,
  prevGroupStartPageNo,
  groupStartPageNo,
  groupEndPageNo,
  pageNo,
  hasNextGroup,
  nextGroupStartPageNo,
  groupCount,
  onPageChange,
}) {
  const handlePageChange = (page) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const pages = [];
  for (let p = groupStartPageNo; p <= groupEndPageNo; p++) {
    pages.push(p);
  }

  return (
    <>
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {hasPrevGroup && (
            <>
              <li className="page-item first">
                <Link
                  className="page-link"
                  to="#"
                  onClick={() => handlePageChange(0)}
                >
                  <img src="/images/chevron-double-left.svg" alt="First" />
                </Link>
              </li>
              <li className="page-item prev">
                <Link
                  className="page-link"
                  to="#"
                  onClick={() => handlePageChange(prevGroupStartPageNo)}
                >
                  <img src="/images/chevron-left.svg" alt="Previous" />
                </Link>
              </li>
            </>
          )}
          {pages.map((p) => (
            <li key={p} className={`page-item ${pageNo === p ? "active" : ""}`}>
              <Link
                className="page-link"
                to="#"
                onClick={() => handlePageChange(p)}
              >
                {p + 1}
              </Link>
            </li>
          ))}
          {hasNextGroup && (
            <>
              <li className="page-item next">
                <Link
                  className="page-link"
                  to="#"
                  onClick={() => handlePageChange(nextGroupStartPageNo)}
                >
                  <img src="/images/chevron-right.svg" alt="Next" />
                </Link>
              </li>
              <li className="page-item last">
                <Link
                  className="page-link"
                  to="#"
                  onClick={() => handlePageChange(groupCount - 1)}
                >
                  <img src="/images/chevron-double-right.svg" alt="Last" />
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
