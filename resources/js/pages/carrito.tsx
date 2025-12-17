import React, { useState } from 'react';
import AuthSimpleLayout from '@/layouts/auth-layout';
import AppLogoIcon from '@/components/app-logo-icon';
import AuthLayout from '@/layouts/auth-layout';
import { useCarrito } from '@/contexts/CarritoContext';
import axios from 'axios';
import { Link } from '@inertiajs/react';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

export default function Carrito() {
  const {
    carrito,
    eliminarDelCarrito,
    incrementarCantidad,
    decrementarCantidad,
    totalPrecio,
  } = useCarrito();

  const handlePagar = async () => {
    try {
      const res = await axios.post('/api/comprar', { carrito });
      alert(res.data.message);  // Mostrar mensaje de éxito
    } catch (error) {
      alert('Error al procesar la compra');
    }
  };

  return (
    <AuthLayout
      title="Vuelve cuando quieras"
      description="Disfruta de lo que te lleves"
    >
    
      <Link
        href="/"
        className="fixed bottom-6 right-28 z-40 bg-teal-600 hover:bg-teal-500 text-white text-sm px-4 py-2 rounded-full shadow-lg transition"
      >
        Volver a la tienda
      </Link>

    <div className="max-w-md w-full mx-auto bg-slate-950 p-8 rounded-lg shadow-lg flex flex-col items-center gap-6">
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
        <ul className="w-full">
          {carrito.map(producto => (
            <li key={producto.id} className="flex items-center justify-between mb-2">
              <span className="flex-grow">{producto.nombre}</span>
              <div className="flex items-center space-x-2">
                <button onClick={() => decrementarCantidad(producto.id)} className="ml-4 px-2 bg-slate-950 rounded">-</button>
                <span>{producto.cantidad}</span>
                <button onClick={() => incrementarCantidad(producto.id)} className="px-2 bg-slate-950 rounded">+</button>
              </div>
              <span className="w-20 text-right">${(producto.precio * producto.cantidad).toFixed(2)}</span>
              <button onClick={() => eliminarDelCarrito(producto.id)} className="ml-8 text-red-600 hover:text-red-800">×</button>
            </li>
          ))}
        </ul>

      <div className="mt-4 font-bold text-right w-full">
        Total: ${totalPrecio().toFixed(2)}
      </div>
                  <button
              onClick={handlePagar}
              disabled={carrito.length === 0}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Pagar
            </button>
          </>
        )}
    </div>
    </AuthLayout>
  );
}

