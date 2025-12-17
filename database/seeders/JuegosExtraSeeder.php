<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Juego;

class JuegosExtraSeeder extends Seeder
{
    public function run(): void
    {
        $juegos = [
            [
                'nombre' => 'Expedition 33',
                'descripcion' => 'Aventura de exploración táctica en un mundo misterioso.',
                'descripcion_larga' => 'Una expedición épica donde cada decisión cuenta y el entorno es tu mayor desafío.',
                'precio' => 59.99,
                'categoria_id' => 2,
                'desarrollador' => 'Estudio Expedition',
                'imagen' => 'expedition_33.jpg',
            ],
            [
                'nombre' => 'Minecraft',
                'descripcion' => 'Juego de construcción y supervivencia en mundo abierto.',
                'descripcion_larga' => 'Crea, explora y sobrevive en mundos generados de forma procedural, solo o con amigos.',
                'precio' => 19.99,
                'categoria_id' => 2,
                'desarrollador' => 'Mojang Studios',
                'imagen' => 'minecraft.jpg',
            ],
            [
                'nombre' => 'The Elder Scrolls V: Skyrim',
                'descripcion' => 'RPG de mundo abierto ambientado en la región de Skyrim.',
                'descripcion_larga' => 'Forja tu destino como Sangre de Dragón mientras exploras mazmorras, ciudades y montañas nevadas.',
                'precio' => 29.99,
                'categoria_id' => 4,
                'desarrollador' => 'Bethesda Game Studios',
                'imagen' => 'skyrim.jpg',
            ],
            [
                'nombre' => 'The Last of Us',
                'descripcion' => 'Aventura narrativa en un mundo postapocalíptico.',
                'descripcion_larga' => 'Acompaña a Joel y Ellie en un viaje emocional lleno de peligro, pérdida y esperanza.',
                'precio' => 39.99,
                'categoria_id' => 2,
                'desarrollador' => 'Naughty Dog',
                'imagen' => 'the_last_of_us_1.jpg',
            ],
            [
                'nombre' => 'The Last of Us Part II',
                'descripcion' => 'Secuela del aclamado juego de acción y aventura.',
                'descripcion_larga' => 'Sigue la historia de Ellie en una búsqueda de venganza que pondrá a prueba sus límites.',
                'precio' => 49.99,
                'categoria_id' => 2,
                'desarrollador' => 'Naughty Dog',
                'imagen' => 'the_last_of_us_2.jpg',
            ],
            [
                'nombre' => 'Overcooked',
                'descripcion' => 'Caótica experiencia culinaria cooperativa.',
                'descripcion_larga' => 'Coordínate con tus amigos para preparar platos a contrarreloj en cocinas imposibles.',
                'precio' => 14.99,
                'categoria_id' => 3,
                'desarrollador' => 'Ghost Town Games',
                'imagen' => 'overcooked.jpg',
            ],
        ];

        foreach ($juegos as $data) {
            Juego::create($data); //Genera el slug
        }
    }
}
