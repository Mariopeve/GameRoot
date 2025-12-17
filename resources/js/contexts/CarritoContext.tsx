import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define la forma del juego que estará en el carrito
export interface JuegoCarrito {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string;
}

// Define la forma del contexto
interface CarritoContextProps {
  carrito: JuegoCarrito[];
  agregarAlCarrito: (juego: JuegoCarrito) => void;
  eliminarDelCarrito: (id: number) => void;
  limpiarCarrito: () => void;
  totalPrecio: () => number;
  incrementarCantidad: (id: number) => void;
  decrementarCantidad: (id: number) => void;
}

// Crea el contexto con valor inicial undefined
const CarritoContext = createContext<CarritoContextProps | undefined>(undefined);

// Provider que envuelve a la app y provee el estado y funciones del carrito
export function CarritoProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<JuegoCarrito[]>([]);

  // Añade un juego al carrito o incrementa cantidad si ya existe
  const agregarAlCarrito = (juego: JuegoCarrito) => {
    setCarrito((prev) => {
      const existe = prev.find((prod) => prod.id === juego.id);
      if (existe) {
        return prev.map((prod) =>
          prod.id === juego.id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
        );
      }
      return [...prev, { ...juego, cantidad: 1 }];
    });
  };

  // Elimina un juego del carrito por su id
  const eliminarDelCarrito = (id: number) => {
    setCarrito((prev) => prev.filter((prod) => prod.id !== id));
  };

  // Limpia todo el carrito
  const limpiarCarrito = () => {
    setCarrito([]);
  };

  // Calcula el total del precio del carrito
  const totalPrecio = () => {
    return carrito.reduce((total, prod) => total + prod.precio * prod.cantidad, 0);
  };

    const incrementarCantidad = (id: number) => {
    setCarrito((prev) =>
        prev.map((prod) =>
        prod.id === id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
        )
    );
    };
    const decrementarCantidad = (id: number) => {
    setCarrito((prev) =>
        prev.map((prod) =>
        prod.id === id && prod.cantidad > 0
            ? { ...prod, cantidad: prod.cantidad - 1 }
            : prod
        )
    );
    };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito, incrementarCantidad, decrementarCantidad, limpiarCarrito, totalPrecio }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

// Hook para consumir el contexto con seguridad
export function useCarrito() {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
  }
  return context;
}
