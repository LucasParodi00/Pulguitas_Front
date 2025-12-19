import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginadorProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Paginador({ currentPage, totalPages, onPageChange }: PaginadorProps) {
    const handlePageClick = (e: React.MouseEvent, page: number) => {
        e.preventDefault();
        onPageChange(page);
    };

    // Generar array de páginas
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('ellipsis');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('ellipsis');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('ellipsis');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('ellipsis');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <Pagination className="mt-8">
            <PaginationContent className="flex-wrap justify-center gap-1">
                {/* BOTÓN ANTERIOR */}
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={e => {
                            e.preventDefault();
                            if (currentPage > 1) onPageChange(currentPage - 1);
                        }}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        aria-label="Página anterior"
                    />
                </PaginationItem>

                {/* NÚMEROS DE PÁGINA */}
                {getPageNumbers().map((page, index) => {
                    const isCurrent = page === currentPage;

                    // Lógica Responsive:
                    // Siempre mostramos la página actual.
                    // En pantallas 'sm' (tablet/desktop) mostramos todo.
                    // En pantallas muy pequeñas (mobile), ocultamos los que no son el actual.
                    return (
                        <PaginationItem
                            key={`${page}-${index}`}
                            className={!isCurrent && typeof page === 'number' ? 'hidden sm:block' : ''}
                        >
                            {page === 'ellipsis' ? (
                                <PaginationEllipsis className="hidden sm:flex" />
                            ) : (
                                <PaginationLink
                                    href="#"
                                    onClick={e => handlePageClick(e, page as number)}
                                    isActive={isCurrent}
                                    className="cursor-pointer"
                                >
                                    {page}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    );
                })}

                {/* BOTÓN SIGUIENTE */}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={e => {
                            e.preventDefault();
                            if (currentPage < totalPages) onPageChange(currentPage + 1);
                        }}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        aria-label="Página siguiente"
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
