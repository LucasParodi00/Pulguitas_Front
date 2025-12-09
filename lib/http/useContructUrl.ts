type ParamValue = string | number | boolean;

const parametrosValidos = (param: unknown): param is ParamValue =>
    ['string', 'number', 'boolean'].includes(typeof param);

export const useConstructUrl = (baseURL: string, path = '', params: Record<string, unknown> = {}): URL => {
    const url = new URL(`${baseURL}${path}`);
    Object.keys(params).forEach(key => {
        const value = params[key];
        if (parametrosValidos(value)) {
            url.searchParams.append(key, String(value));
        }
    });
    return url;
};
