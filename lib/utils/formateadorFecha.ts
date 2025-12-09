export type DateFormat = 'short' | 'long';

interface FormatDateOptions {
    formato?: DateFormat;
    local?: string;
}

export const formateadorFecha = (fecha: Date | string, opciones: FormatDateOptions = {}): string => {
    const { formato = 'short', local = 'es-AR' } = opciones;

    const d = typeof fecha === 'string' ? new Date(fecha) : fecha;

    if (isNaN(d.getTime())) {
        console.error(`Formateador de fecha: fecha inválida →`, fecha);
        return '';
    }

    const fechaFormateada =
        formato === 'short'
            ? new Intl.DateTimeFormat(local)
            : new Intl.DateTimeFormat(local, {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
              });

    return fechaFormateada.format(d);
};
