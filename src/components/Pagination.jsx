import './PaginationStyle.css'

const Pagination = ({onPrevPage, currentPage, onNextPage, totalPages}) => {
  return (
    <div className='pagination'>
        <button onClick={onPrevPage} disabled={currentPage === 1}>
            Previous
        </button>
        <span>{`${currentPage} of ${totalPages}`}</span>
        <button onClick={onNextPage} disabled= {currentPage === totalPages}>
            Next
        </button>
    </div>
  )
}

export default Pagination