import React from 'react';
import { ShoppingCartIcon, UserIcon, BookOpenIcon, PowerIcon } from '@heroicons/react/24/solid';
import { Link, usePage, router,  } from '@inertiajs/react';
import { useCarrito } from '@/contexts/CarritoContext';
import { useState } from 'react';

//Interfaces

interface Juego {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  stock: number;
  slug: string;
  desarrollador: string;
}

interface Props {
  masPopulares: Juego[];
  masRecientes: Juego[];
  q?: string;
}

//Logo
const logoUrl = '/favicon.ico';

export default function Home({ masPopulares, masRecientes, q = ''  }: Props) {
  const page = usePage();
  const auth = (page.props as any).auth || { user: null };

  const [search, setSearch] = useState(q); //Muestra solo lo que se ha buscado

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/', { q: search }, { preserveState: true, replace: true });
  };

  //Depende si es admin o usuario normal para redirigir
  const hrefUser = auth.user
    ? (auth.user.is_admin ? '/admin' : '/usuario')
    : '/login';

  //Cerrar sesión
  const handleLogout = (event: React.MouseEvent) => {
    event.preventDefault();
    router.post('/logout');
  };

  const { agregarAlCarrito } = useCarrito();

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Barra superior */}
      <header className="bg-rose-950 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={logoUrl} alt="GameRoot Logo" className="h-12 w-auto" />
          <div className="text-2xl font-bold">GameRoot</div>
        </div>

        <form onSubmit={handleSearch} className="flex-grow mx-4">
          <input
            type="search"
            placeholder="Buscar juegos..."
            className="w-full rounded px-4 py-2 text-white bg-slate-950"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className="flex space-x-6">
          <Link href="/carrito">
          <ShoppingCartIcon className="h-6 w-6 cursor-pointer hover:text-teal-200" />
          </Link>
          
          <Link href={hrefUser}>
            <UserIcon className="h-6 w-6 cursor-pointer hover:text-teal-200" />
          </Link>

          {auth.user ? (
            <button
              onClick={handleLogout}
              className="h-6 w-6 text-red-400 hover:text-red-300 bg-transparent border-none cursor-pointer"
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <PowerIcon className="h-6 w-6" />
            </button>
          ) : (
            <Link href="/register">
              <BookOpenIcon className="h-6 w-6 cursor-pointer hover:text-teal-200" />
            </Link>
          )}
          
        </div>
      </header>

      <main className="p-6 space-y-10">
      {/* Más populares */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Más Populares</h2>
        <div className="flex overflow-x-auto space-x-6 scrollbar-thin scrollbar-thumb-teal-400 scrollbar-track-gray-200">
          {masPopulares.map(juego => {
            const sinStock = juego.stock <= 0;
            const bajoStock = !sinStock && juego.stock < 10;

            return (
              <div
                key={juego.id}
                className="bg-rose-950 rounded shadow p-4 flex-shrink-0 flex flex-col"
                style={{ width: '200px' }}
              >
                <Link href={`/juegos/${juego.slug}`}>
                  <img
                    src={`/images/${juego.imagen}`}
                    alt={juego.nombre}
                    className="rounded mb-2"
                    style={{
                      width: '65%',
                      height: 'auto',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      display: 'block',
                    }}
                  />
                  <h3 className="font-bold text-center text-white">{juego.nombre}</h3>
                  <p className="text-sm text-stone-400 text-center mb-4">
                    Por {juego.precio} €
                  </p>

                  <p
                    className={`text-sm text-center mb-4 font-semibold ${
                      sinStock
                        ? 'text-gray-400'
                        : bajoStock
                        ? 'text-red-400 bg-red-900/30 px-2 py-1 rounded'
                        : 'text-stone-400'
                    }`}
                  >
                    {sinStock
                      ? 'Agotado'
                      : bajoStock
                      ? `¡Últimas unidades: ${juego.stock}!`
                      : `Solo quedan ${juego.stock}`}
                  </p>
                </Link>

                <button
                  className={`mt-auto w-full py-2 rounded font-semibold transition ${
                    sinStock
                      ? 'bg-gray-500 text-gray-200 cursor-not-allowed'
                      : bajoStock
                      ? 'bg-red-600 hover:bg-red-500 text-white'
                      : 'bg-teal-600 hover:bg-teal-400 text-white'
                  }`}
                  disabled={sinStock}
                  onClick={() =>
                    !sinStock &&
                    agregarAlCarrito({
                      id: juego.id,
                      nombre: juego.nombre,
                      precio: juego.precio ?? 0,
                      cantidad: 1,
                      imagen: juego.imagen,
                    })
                  }
                >
                  {sinStock
                    ? 'Agotado'
                    : bajoStock
                    ? '¡Comprar ya!'
                    : 'Añadir al carrito'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

        {/* Más recientes */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Más recientes</h2>
          <div className="flex overflow-x-auto space-x-6 scrollbar-thin scrollbar-thumb-teal-400 scrollbar-track-gray-200">
            {masRecientes.map(juego => {
              const sinStock = juego.stock <= 0;
              const bajoStock = !sinStock && juego.stock < 10;

              return (
                <div
                  key={juego.id}
                  className="bg-rose-950 rounded shadow p-4 flex-shrink-0 flex flex-col"
                  style={{ width: '200px' }}
                >
                  <Link href={`/juegos/${juego.slug}`}>
                    <img
                      src={`/images/${juego.imagen}`}
                      alt={juego.nombre}
                      className="rounded mb-2"
                      style={{
                        width: '65%',
                        height: 'auto',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        display: 'block',
                      }}
                    />
                    <h3 className="font-bold text-center text-white">{juego.nombre}</h3>
                    <p className="text-sm text-stone-400 text-center mb-4">
                      Por {juego.precio} €
                    </p>

                    <p
                      className={`text-sm text-center mb-4 font-semibold ${
                        sinStock
                          ? 'text-gray-400'
                          : bajoStock
                          ? 'text-red-400 bg-red-900/30 px-2 py-1 rounded'
                          : 'text-stone-400'
                      }`}
                    >
                      {sinStock
                        ? 'Agotado'
                        : bajoStock
                        ? `¡Últimas unidades: ${juego.stock}!`
                        : `Solo quedan ${juego.stock}`}
                    </p>
                  </Link>

                  <button
                    className={`mt-auto w-full py-2 rounded font-semibold transition ${
                      sinStock
                        ? 'bg-gray-500 text-gray-200 cursor-not-allowed'
                        : bajoStock
                        ? 'bg-red-600 hover:bg-red-500 text-white'
                        : 'bg-teal-600 hover:bg-teal-400 text-white'
                    }`}
                    disabled={sinStock}
                    onClick={() =>
                      !sinStock &&
                      agregarAlCarrito({
                        id: juego.id,
                        nombre: juego.nombre,
                        precio: juego.precio ?? 0,
                        cantidad: 1,
                        imagen: juego.imagen,
                      })
                    }
                  >
                    {sinStock
                      ? 'Agotado'
                      : bajoStock
                      ? '¡Comprar ya!'
                      : 'Añadir al carrito'}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}
