export enum ArticuloTipo {
  Venta = 'venta',
  Prestamo = 'prestamo',
  Intercambio = 'intercambio',
}

export enum ArticuloEstado {
  Disponible = 'disponible',
  Prestado = 'prestado',
}

export enum ArticuloCondicion {
  Nuevo = 'nuevo',
  Usado = 'usado',
}

export default {
  ArticuloTipo,
  ArticuloEstado,
  ArticuloCondicion,
};
