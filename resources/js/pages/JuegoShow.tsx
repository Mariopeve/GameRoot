import React from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';

interface JuegoShowProps {
  juego: {
    nombre: string;
    descripcion_larga: string;
    imagen: string;
    desarrollador: string;
  };
}

export default function JuegoShow({ juego }: JuegoShowProps) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
      {/* Botón logo */}
      <Link
        href="/"
        tabIndex={0}
        aria-label="Ir a la página principal"
        className="block w-fit mx-auto mt-8 mb-8"
      >
        <AppLogoIcon className="h-12 w-12 cursor-pointer hover:opacity-80 transition" />
      </Link>
      
      <Link
        href="/"
        className="fixed bottom-6 right-28 z-40 bg-teal-600 hover:bg-teal-500 text-white text-sm px-4 py-2 rounded-full shadow-lg transition"
      >
        Volver a la tienda
      </Link>

      {/* Cuadro de información */}
      <div className="max-w-xl w-full bg-rose-950 p-6 rounded-lg shadow-lg text-center">
        <img
          src={`/images/${juego.imagen}`}
          alt={juego.nombre}
          className="mx-auto mb-4 rounded"
          style={{ maxHeight: 300 }}
        />
        <h1 className="text-3xl font-bold text-white mb-2">{juego.nombre}</h1>
        <p className="text-lg text-stone-300">{juego.descripcion_larga}</p>
        <p className="text-lg text-stone-300">Desarrollado por: {juego.desarrollador}</p>
      </div>
    </div>
  );
}

