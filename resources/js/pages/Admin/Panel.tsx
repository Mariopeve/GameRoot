import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';

interface Juego {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  ventas: number;
}

interface Usuario {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  created_at: string;
}

interface Props {
  juegos: Juego[];
  usuarios: Usuario[];
}

export default function Panel({ juegos, usuarios }: Props) {
  const { props } = usePage();
  const flash = (props as any).flash || {};
  const [tab, setTab] = useState<'juegos' | 'usuarios'>('juegos');

  const updateJuego = (id: number, field: 'stock' | 'precio', value: string) => {
    router.patch(
      `/admin/juegos/${id}`,
      { [field]: field === 'stock' ? Number(value) : Number(value) },
      { preserveScroll: true }
    );
  };

  const updateUsuario = (id: number, is_admin: boolean) => {
    router.patch(
      `/admin/usuarios/${id}`,
      { is_admin },
      { preserveScroll: true }
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <Head title="Panel de administración" />

      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Panel de administración</h1>
          <a
            href="/"
            className="text-sm text-teal-300 hover:text-teal-200 underline"
          >
            Volver a la tienda
          </a>
        </header>

        {flash.success && (
          <div className="bg-teal-900/60 border border-teal-500 text-teal-100 px-4 py-2 rounded">
            {flash.success}
          </div>
        )}
        {flash.error && (
          <div className="bg-red-900/60 border border-red-500 text-red-100 px-4 py-2 rounded">
            {flash.error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-slate-700">
          <button
            onClick={() => setTab('juegos')}
            className={`pb-2 px-1 border-b-2 text-sm ${
              tab === 'juegos'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Juegos
          </button>
          <button
            onClick={() => setTab('usuarios')}
            className={`pb-2 px-1 border-b-2 text-sm ${
              tab === 'usuarios'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Usuarios
          </button>
        </div>

        {/* Tabla juegos */}
        {tab === 'juegos' && (
          <div className="bg-rose-950 border border-rose-900 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-rose-900 flex items-center justify-between">
              <h2 className="font-semibold">Juegos</h2>
              <span className="text-xs text-slate-400">
                Total: {juegos.length}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-rose-950">
                  <tr>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Nombre</th>
                    <th className="px-4 py-2 text-left">Precio (€)</th>
                    <th className="px-4 py-2 text-left">Stock</th>
                    <th className="px-4 py-2 text-left">Ventas</th>
                  </tr>
                </thead>
                <tbody>
                  {juegos.map((j) => (
                    <tr key={j.id} className="border-t border-rose-900">
                      <td className="px-4 py-2">{j.id}</td>
                      <td className="px-4 py-2">{j.nombre}</td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          defaultValue={j.precio}
                          min={0}
                          step="0.01"
                          className="w-24 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-right"
                          onBlur={(e) =>
                            updateJuego(j.id, 'precio', e.target.value)
                          }
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          defaultValue={j.stock}
                          min={0}
                          className="w-20 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-right"
                          onBlur={(e) =>
                            updateJuego(j.id, 'stock', e.target.value)
                          }
                        />
                      </td>
                      <td className="px-4 py-2">{j.ventas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tabla usuarios */}
        {tab === 'usuarios' && (
          <div className="bg-rose-950 border border-rose-900 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-rose-900 flex items-center justify-between">
              <h2 className="font-semibold">Usuarios</h2>
              <span className="text-xs text-slate-400">
                Total: {usuarios.length}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-rose-950">
                  <tr>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Nombre</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Admin</th>
                    <th className="px-4 py-2 text-left">Registro</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr key={u.id} className="border-t border-rose-900">
                      <td className="px-4 py-2">{u.id}</td>
                      <td className="px-4 py-2">{u.name}</td>
                      <td className="px-4 py-2">{u.email}</td>
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={u.is_admin}
                          onChange={(e) =>
                            updateUsuario(u.id, e.target.checked)
                          }
                        />
                      </td>
                      <td className="px-4 py-2">
                        {new Date(u.created_at).toLocaleDateString('es-ES')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
