<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetalleCompra extends Model
{
    protected $fillable = [
        'compra_id', 
        'juego_id', 
        'cantidad', 
        'precio_unitario', 
        'codigo_generado'
    ];
}