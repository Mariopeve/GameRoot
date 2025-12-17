<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    protected $fillable = ['user_id', 'total', 'fecha_compra'];

    // Una compra tiene muchos detalles (juegos)
    public function detalles()
    {
        return $this->hasMany(DetalleCompra::class);
    }

    // Una compra pertenece a un usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}