<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JuegoController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\AsistenteController;
use App\Http\Controllers\AdminController;
use App\Models\Juego;
use App\Models\User;

/*
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');
*/


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::middleware(['auth'])->group(function () {
    Route::get('/usuario', function () {
        $user = Auth::user();
        return Inertia::render('UsuarioPerfil', [
            'nombre' => $user->name,
            'email' => $user->email,
            'fecha_registro' => $user->created_at->format('d/m/Y'),
        ]);
    })->name('usuario');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/carrito', function () {
        $user = Auth::user();
        return Inertia::render('carrito', [
            'nombre' => $user->name,
        ]);
    })->name('carrito');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('Admin/Panel', [
            'juegos' => Juego::orderBy('nombre')->get(['id','nombre','precio','stock','ventas']),
            'usuarios' => User::orderBy('created_at','desc')->get(['id','name','email','is_admin','created_at']),
        ]);
    })->name('admin');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'panel'])->name('admin');

    Route::patch('/admin/juegos/{juego}', [AdminController::class, 'updateJuego'])
        ->name('admin.juegos.update');

    Route::patch('/admin/usuarios/{user}', [AdminController::class, 'updateUsuario'])
        ->name('admin.usuarios.update');
});

Route::get('/juegos/{slug}', [JuegoController::class, 'show'])->name('juegos.show');

Route::get('/', [HomeController::class, 'index'])->name('home');


Route::post('/api/comprar', [CompraController::class, 'procesarCompra'])->middleware('auth');


Route::post('/api/asistente/chat', [AsistenteController::class, 'chat'])->name('chat.asistente');


require __DIR__.'/settings.php';
