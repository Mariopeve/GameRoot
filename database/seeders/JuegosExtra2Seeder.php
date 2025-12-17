<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Juego;

class JuegosExtra2Seeder extends Seeder
{
    public function run(): void
    {
        $juegos = [
            [
                'nombre' => 'The Forest',
                'descripcion' => 'Supervivencia y horror en una isla remota llena de caníbales.',
                'descripcion_larga' => 'Explora un mundo abierto hostil, construye refugios, caza para sobrevivir y descubre los oscuros secretos que esconde la isla mientras intentas rescatar a tu hijo.',
                'precio' => 19.99,
                'categoria_id' => 1, 
                'desarrollador' => 'Endnight Games',
                'imagen' => 'the_forest.jpg',
            ],
            [
                'nombre' => 'The Crew',
                'descripcion' => 'Carreras de mundo abierto por toda Norteamérica.',
                'descripcion_larga' => 'Recorre miles de kilómetros en un mapa masivo, personaliza tu coche, compite en línea y vive la experiencia definitiva de conducción en un entorno social dinámico.',
                'precio' => 29.99,
                'categoria_id' => 2, 
                'desarrollador' => 'Ubisoft',
                'imagen' => 'the_crew.jpg',
            ],
            [
                'nombre' => 'The Witcher 3: Wild Hunt',
                'descripcion' => 'RPG de mundo abierto en un universo de fantasía oscura.',
                'descripcion_larga' => 'Embárcate en una aventura épica como Geralt de Rivia en un mundo abierto, oscuro y vibrante lleno de monstruos, intrigas y decisiones morales. Recorre vastos paisajes, resuelve misterios, participa en combates trepidantes y experimenta historias profundas en una de las obras maestras del rol moderno.',
                'precio' => 39.99,
                'categoria_id' => 3, 
                'desarrollador' => 'CD Projekt RED',
                'imagen' => 'witcher3.jpg',
            ],
        ];

        foreach ($juegos as $data) {
            Juego::create($data); //Genera el slug
        }
    }
}
