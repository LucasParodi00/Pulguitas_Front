import { getBaseUrl, Service } from './getBaseUrl';
import { getHeaders } from './getHeaders';
import { handleError } from './handleError';
import { useConstructUrl } from './useContructUrl';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface FetchOptions<T> {
    service: Service;
    path?: string;
    method?: HttpMethod;
    params?: Record<string, unknown>;
    body?: T;
    headers?: Record<string, string>;
}

export async function apiFetch<TRequest = unknown, TResponse = unknown>({
    service,
    path = '',
    method = 'GET',
    params = {},
    body,
    headers = {},
}: FetchOptions<TRequest>): Promise<TResponse> {
    const baseURL = getBaseUrl(service);
    const url = useConstructUrl(baseURL, path, params);

    const fetchHeaders = {
        ...getHeaders(),
        ...headers,
    };

    const fetchOptions: RequestInit = {
        method,
        headers: fetchHeaders,
    };

    if (body && method !== 'GET') {
        fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url.toString(), fetchOptions);
    return handleError(response);
}
