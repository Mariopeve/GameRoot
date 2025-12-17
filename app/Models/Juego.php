<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Juego extends Model
{
    protected $table = 'juegos';

    protected $fillable = [
        'nombre',
        'slug',
        'descripcion',
        'descripcion_larga',
        'precio',
        'categoria_id',
        'desarrollador',
        'imagen',
    ];

    //Generador de slug
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($juego) {
            if (empty($juego->slug)) {
                $juego->slug = Str::slug($juego->nombre);
            }
        });

        static::updating(function ($juego) {
            if (empty($juego->slug)) {
                $juego->slug = Str::slug($juego->nombre);
            }
        });
    }

    // Relación con categoría
    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'categoria_id');
    }
}
