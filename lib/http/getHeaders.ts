export const getHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('acces_token');

    return {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
    };
};

export const extractFilename = (response: Response, defaultFilename: string): string => {
    const contentDisposition = response.headers.get('Content-Disposition');

    if (contentDisposition) {
        // Intentar diferentes patrones de filename
        const patterns = [
            /filename\*=UTF-8''([^;]+)/, // RFC 5987
            /filename="([^"]+)"/, // Quoted
            /filename=([^;]+)/, // Unquoted
        ];

        for (const pattern of patterns) {
            const match = contentDisposition.match(pattern);
            if (match && match[1]) {
                // Decodificar URI si es necesario
                try {
                    return decodeURIComponent(match[1]);
                } catch {
                    return match[1];
                }
            }
        }
    }

    // Fallback: usar defaultFilename o generar uno
    return defaultFilename || `download_${new Date().toISOString().split('T')[0]}.file`;
};
