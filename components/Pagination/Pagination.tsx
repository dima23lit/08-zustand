import ReactPaginate from 'react-paginate';
import css from '@/components/Pagination/Pagination.module.css'

interface PaginationProps {
    onPageChange: (event: { selected: number }) => void,
    totalPages: number,
    forcePage: number
}

export default function Pagination({ onPageChange, totalPages, forcePage }: PaginationProps) {
    return (
        <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={onPageChange}
        forcePage={forcePage}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />
    )
}