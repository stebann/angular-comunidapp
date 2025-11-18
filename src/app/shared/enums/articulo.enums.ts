export enum ArticuloCondicion {
  Nuevo = 1,
  Reacondicionado = 2,
}

export enum EstadoArticulo {
  Disponible = 1,
  Prestado = 2,
}

export enum TipoTransaccion {
  Venta = 1,
  Prestamo = 2,
}

export enum EstadoTransaccion {
  Pendiente = 1,
  Aceptada = 2,
  Rechazada = 3,
  DevolucionPendiente = 4,
  Devuelto = 5,
  Cancelado = 6,
}
