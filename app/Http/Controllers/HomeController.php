<?php

namespace App\Http\Controllers;

use App\Models\Juego;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        //Mira si hay algo en la barra de búsqueda
        $q = $request->get('q');

        //Se ordenan los juegos por ventas
        $masPopulares = Juego::when($q, function ($query, $q) {
                $query->where('nombre', 'LIKE', "%{$q}%");
            })
            ->orderBy('ventas', 'desc')
            ->take(8)
            ->get();

        //Se ordenan los juegos por el momento en el que se han añadido
        $masRecientes = Juego::when($q, function ($query, $q) {
                $query->where('nombre', 'LIKE', "%{$q}%");
            })
            ->orderBy('created_at', 'desc')
            ->take(8)
            ->get();

        //Pasamos los datos al frontend
        return Inertia::render('Home', [
            'masPopulares' => $masPopulares,
            'masRecientes' => $masRecientes,
            'q'            => $q,
        ]);
    }
}
