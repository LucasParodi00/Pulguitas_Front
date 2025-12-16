'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export const useQueryParams = () => {
    const searchParams = useSearchParams();

    return useMemo(() => {
        const obj: any = {};

        for (const [key, value] of searchParams.entries()) {
            // Transformar números automáticamente
            const numberValue = Number(value);
            obj[key] = isNaN(numberValue) ? value : numberValue;
        }

        return obj;
    }, [searchParams]);
};
