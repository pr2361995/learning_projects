import classes from "./Pagination.module.css";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      // `?_page=${page}&_per_page=${itemsPerPage}`
      onPageChange(page)
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let pageCount = 1; pageCount <= totalPages; pageCount++) {
      pages.push(
        <button
          key={pageCount}
          className={`${classes.pageButton} ${currentPage === pageCount ? classes.activePage : classes.inactivePage}`}
          onClick={() => handlePageChange(pageCount)}
        >
          {pageCount}
        </button>
      );
    }
    return pages ;
  };

  return (
    <div className={classes.centerContent}>
      <button
        className={classes.pageButton}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        className={classes.pageButton}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination; 
