<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Verificamos si hay usuario logueado y si es admin
        if (!Auth::check() || !Auth::user()->is_admin) {
            // Si no es admin, lo mandamos al inicio o mostramos error 403
            return redirect('/')->with('error', 'No tienes permiso para entrar ahí.');
        }

        return $next($request);
    }
}