<?php

namespace App\Http\Controllers;

use App\Models\Juego;
use Inertia\Inertia;

class JuegoController extends Controller{
    public function show($slug)
    {
        //Muestra el juego con su slug
        $juego = Juego::where('slug', $slug)->firstOrFail();

        return Inertia::render('JuegoShow', [
            'juego' => $juego,
        ]);
    }
}