import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Divide } from 'lucide-react';

interface PaginadorProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Paginador({ currentPage, totalPages, onPageChange }: PaginadorProps) {
    const handlePrevious = (e: React.MouseEvent) => {
        e.preventDefault();
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (e: React.MouseEvent, page: number) => {
        e.preventDefault();
        onPageChange(page);
    };

    // Generar array de páginas a mostrar
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            // Mostrar todas las páginas si son pocas
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Lógica para mostrar páginas con ellipsis
            if (currentPage <= 3) {
                // Inicio: 1 2 3 4 ... última
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Final: 1 ... antepenúltima penúltima última
                pages.push(1);
                pages.push('ellipsis');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Medio: 1 ... actual-1 actual actual+1 ... última
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

    if (totalPages <= 1) {
        return null; // No mostrar paginador si solo hay una página
    }

    return (
        <Pagination className="mt-8 justify-end">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={handlePrevious}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                </PaginationItem>

                {getPageNumbers().map((page, index) => (
                    <PaginationItem key={`${page}-${index}`}>
                        {page === 'ellipsis' ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                href="#"
                                onClick={e => handlePageClick(e, page as number)}
                                isActive={currentPage === page}
                                className="cursor-pointer"
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={handleNext}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
