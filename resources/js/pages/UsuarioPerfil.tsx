import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';

interface Props {
  nombre: string;
  email: string;
  fecha_registro: string;
}

export default function UsuarioPerfil({ nombre, email, fecha_registro }: Props) {
  const [editing, setEditing] = useState(false);
  const [nombreEdit, setNombreEdit] = useState(nombre);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
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

      <div className="bg-rose-950 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Perfil de usuario</h1>
        {!editing ? (
          <>
            <p><b>Nombre:</b> {nombre}</p>
            <p><b>Email:</b> {email}</p>
            <p><b>Fecha de registro:</b> {fecha_registro}</p>
            <button className="mt-4 bg-teal-700 px-4 py-2 rounded" onClick={() => setEditing(true)}>Editar perfil</button>
          </>
        ) : (
          <form
            className="flex flex-col gap-3"
            onSubmit={e => {
              e.preventDefault();
              setEditing(false);
            }}
          >
            <input
              className="p-2 rounded text-white"
              type="text"
              value={nombreEdit}
              onChange={e => setNombreEdit(e.target.value)}
            />
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-teal-700 rounded">Guardar</button>
              <button onClick={() => setEditing(false)} className="px-4 py-2 bg-red-700 rounded">Cancelar</button>
            </div>
          </form>
        )}

        <div className="mt-6 mb-4">
          <h2 className="text-lg font-semibold mb-2">Cambiar contraseña</h2>
          <button
            className="px-4 py-2 bg-teal-700 rounded"
            onClick={() => alert('En el futuro se enviará un correo de recuperación.')}
          >
            Enviar correo para cambiar contraseña
          </button>
        </div>
      </div>
    </div>
  );
}
