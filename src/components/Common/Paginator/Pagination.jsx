import React, { useState } from "react";
import styles from "./Pagination.module.css";

const Pagination = (props) => {
  let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }
  let portionSize = 10;
  let portionCount = Math.ceil(pageCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPageNumber = (portionNumber - 1) * portionSize + 1;
  let righttPageNumber = portionNumber * portionSize;

  return (
    <div>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          Prev
        </button>
      )}
      {pages
        .filter((p) => p >= leftPageNumber && p <= righttPageNumber)
        .map((p) => {
          return (
            <span
              className={
                props.currentPage === p
                  ? styles.selectedPage
                  : styles.pageNumber
              }
              onClick={(e) => {
                props.onChangePage(p);
              }}
              key={p}
            >
              {p}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
