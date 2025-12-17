<?php

namespace App\Http\Controllers;

use App\Models\Juego;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    //Mostramos el panel
    public function panel()
    {
        return Inertia::render('Admin/Panel', [
            'juegos' => Juego::orderBy('id','asc')->get(['id','nombre','precio','stock','ventas']),
            'usuarios' => User::orderBy('id','asc')->get(['id','name','email','is_admin','created_at']),
        ]);
    }

    //Actualizamos el cambio en la base de datos
    public function updateJuego(Request $request, Juego $juego)
    {
        $data = $request->validate([
            'stock' => ['required','integer','min:0'],
            'precio' => ['required','numeric','min:0'],
        ]);

        $juego->update($data);

        return back()->with('success', 'Juego actualizado');
    }

    //Igual pero para los usuarios
    public function updateUsuario(Request $request, User $user)
    {
        $data = $request->validate([
            'is_admin' => ['required','boolean'],
        ]);

        //Evita que no te quites admin a ti mismo
        if ($user->id === $request->user()->id && ! $data['is_admin']) {
            return back()->with('error', 'No puedes quitarte tu propio rol de admin');
        }

        $user->update($data);

        return back()->with('success', 'Usuario actualizado');
    }
}
