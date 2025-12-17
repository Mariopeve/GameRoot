<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CompraConfirmacion extends Mailable
{
    use Queueable, SerializesModels;

    public $total;
    public $codigos;

    public function __construct($total, $codigos)
    {
        $this->total = $total;
        $this->codigos = $codigos;
    }

    //Crea el mensaje que vamos a mandar con el total y los códigos
    public function build()
    {
        return $this->subject('Confirmación de compra en GameRoot')
                    ->view('emails.compra_confirmacion')
                    ->with([
                        'total' => $this->total,
                        'codigos' => $this->codigos,
                    ]);
    }
}
