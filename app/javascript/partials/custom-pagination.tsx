import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../components/pagination"
export function CustomPagination({ page, next, prev, last }) {


    const prevClassNameHiddenButton = prev && (prev!=='0') ? '' : 'hidden';
    const prevClassNameHidden = prev && (prev!=='0' && prev!=='1') ? '' : 'hidden';
    const nextClassNameHidden = next && (next!=='0' && next!==last) ? '' : 'hidden';
    const nextClassNameHiddenButton = next && (next!=='0') ? '' : 'hidden';

    return (
        <Pagination className="mb-8 mt-8">
            <PaginationContent>
                <PaginationItem className={prevClassNameHiddenButton}>
                    <PaginationPrevious href={`/tasks?page=${prev}`} />
                </PaginationItem>
                <PaginationItem className={prevClassNameHidden} >
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink  href={`/tasks?page=${prev}`}>{prev}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        {page}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href={`/tasks?page=${next}`}>{next}</PaginationLink>
                </PaginationItem>
                <PaginationItem className={nextClassNameHidden} >
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem className={nextClassNameHiddenButton}>
                    <PaginationNext href={`/tasks?page=${next}`} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>)

}