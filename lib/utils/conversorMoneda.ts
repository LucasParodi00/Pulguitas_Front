export const convertirMoneda = (value: number): string => {
    if (isNaN(value)) {
        console.error(`Conversor de moneda : valor inválido →`, value);
        return '$ 0,00';
    }

    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    }).format(value);
};
