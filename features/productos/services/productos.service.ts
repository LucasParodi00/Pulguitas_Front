'use client';

import { apiFetch } from '@/lib/http/apiFetch';
import { IHttpQueyParams } from '@/lib/types/http.type';
import { useQuery } from '@tanstack/react-query';

export const useListarProductos = async ({ params = {}, page, offset }: IHttpQueyParams) => {
    return useQuery({
        queryKey: ['data', page, offset],
        queryFn: () => apiFetch({ service: 'productos', params: { ...params, page, offset } }),
    });
};
