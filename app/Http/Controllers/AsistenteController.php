<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AsistenteController extends Controller
{
    public function chat(Request $request)
    {
        // 1. Validar entrada
        $request->validate([
            'mensajes' => 'required|array',
        ]);

        $historial = $request->input('mensajes');
        $apiKey = env('GEMINI_API_KEY');

        // 2. Personalidad
        $systemInstruction = "Eres GameBot, un vendedor experto de GameRoot. 
        Recomienda juegos, consolas y periféricos. 
        Tono: Gamer, divertido y breve. Usa emojis.
        Si preguntan algo que no sea de juegos, di que 'ese DLC no está instalado'.";

        // 3. Formatear historial
        $contents = [];
        foreach ($historial as $msg) {
            $role = ($msg['from'] === 'user') ? 'user' : 'model';
            $contents[] = [
                'role' => $role,
                'parts' => [
                    ['text' => $msg['text']]
                ]
            ];
        }

        try {
            $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}";
            // 4. Petición a Google Gemini
            $response = Http::withoutVerifying()
                ->withHeaders([
                    'Content-Type' => 'application/json',
                ])
                ->post($url, [
                    'system_instruction' => [
                        'parts' => ['text' => $systemInstruction]
                    ],
                    'contents' => $contents,
                    'generationConfig' => [
                        'temperature' => 0.7,
                        'maxOutputTokens' => 500,
                    ]
                ]);

            if ($response->successful()) {
                $data = $response->json();
                $textoRespuesta = $data['candidates'][0]['content']['parts'][0]['text'] ?? 'La IA se quedó cargando texturas...';
                return response()->json(['respuesta' => $textoRespuesta]);
            } else {
                Log::error('Error Gemini API: ' . $response->body());
                return response()->json(['respuesta' => 'Error de conexión con el servidor (Game Over).'], 500);
            }

        } catch (\Exception $e) {
            Log::error('Error Controlador: ' . $e->getMessage());
            return response()->json(['respuesta' => 'Error crítico del sistema.'], 500);
        }
    }
}