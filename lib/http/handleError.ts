export const handleError = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        let errorMessage = 'Error desconocido. ';
        let errorDetails = 'Sin detalles. ';
        let errorStatusCode = 500;

        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage || errorData.message;
            errorDetails = errorData.data || errorDetails;
            errorStatusCode = errorData.statusCode;
        } catch (err) {}
        throw new Error(`${errorMessage} - ${errorDetails}`);
    }

    return response.json() as Promise<T>;
};

export const handleDownloadError = async (response: Response): Promise<never> => {
    let errorMessage = 'Error al descargar archivo';
    let errorDetails = 'Sin detalles';

    try {
        // Intentar obtener error como JSON
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage || errorData.message;
        errorDetails = errorData.details || errorData.data || errorDetails;
    } catch {
        // Si no es JSON, usar mensaje genérico
        errorMessage = `Error HTTP ${response.status}: ${response.statusText}`;
        errorDetails = 'El servidor no pudo procesar la solicitud';
    }

    throw new Error(`${errorMessage} - ${errorDetails}`);
};
