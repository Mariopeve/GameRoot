<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\DetalleCompra;
use App\Models\Juego;
use App\Mail\CompraConfirmacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CompraController extends Controller
{
    //Generamos el código de manera aleatoria
    private function generarCodigoJuego($longitud = 12) {
        $caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $codigo = '';
        for ($i = 0; $i < $longitud; $i++) {
            $codigo .= $caracteres[rand(0, strlen($caracteres) - 1)];
        }
        return $codigo;
    }


    public function procesarCompra(Request $request)
    {
        $usuario = Auth::user();    //Obliga al usuario a estar logueado
        $carrito = $request->input('carrito');

        if (!$carrito || count($carrito) === 0) {
            return response()->json(['status' => 'error', 'message' => 'El carrito está vacío'], 400);
        }

        try {
            DB::beginTransaction();

            // Crear la Compra
            $nuevaCompra = Compra::create([
                'user_id' => $usuario->id,
                'total'   => 0,
            ]);

            $totalCompra = 0;
            $codigosArray = [];

            foreach ($carrito as $item) {
                // Buscamos el juego en BD para asegurar precio y stock reales
                $juegoModel = Juego::lockForUpdate()->find($item['id']);

                if (!$juegoModel) {
                    throw new \Exception("El juego {$item['nombre']} ya no existe.");
                }

                if ($juegoModel->stock < $item['cantidad']) {
                    throw new \Exception("Stock insuficiente para: " . $juegoModel->nombre);
                }

                // Generamos códigos según la cantidad
                for ($i = 0; $i < $item['cantidad']; $i++) {
                    $codigoUnico = $this->generarCodigoJuego();

                    // Guardamos en Base de Datos
                    DetalleCompra::create([
                        'compra_id'       => $nuevaCompra->id,
                        'juego_id'        => $juegoModel->id,
                        'cantidad'        => 1,
                        'precio_unitario' => $juegoModel->precio,
                        'codigo_generado' => $codigoUnico
                    ]);

                    $codigosArray[] = "{$juegoModel->nombre}: $codigoUnico";
                }

                
                $totalCompra += $juegoModel->precio * $item['cantidad'];

                // Actualizar stock y ventas
                $juegoModel->decrement('stock', $item['cantidad']);
                $juegoModel->increment('ventas', $item['cantidad']);
            }

            // Actualizar total final en BD
            $nuevaCompra->update(['total' => $totalCompra]);

            DB::commit();

            $codigosString = implode("\n", $codigosArray);

            // Mandamos el correo al email del usuario
            Mail::to($usuario->email)->send(new CompraConfirmacion($totalCompra, $codigosString));

            return response()->json([
                'status' => 'ok', 
                'message' => 'Compra realizada y guardada correctamente'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            // Guardamos los errores
            Log::error("Error en compra: " . $e->getMessage());
            
            return response()->json([
                'status' => 'error', 
                'message' => 'Error al procesar la compra: ' . $e->getMessage()
            ], 500);
        }
    }
}