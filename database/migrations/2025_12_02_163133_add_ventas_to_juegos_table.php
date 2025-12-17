<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddVentasToJuegosTable extends Migration
{
    public function up()
    {
        Schema::table('juegos', function (Blueprint $table) {
            $table->integer('ventas')->default(0)->after('precio');
        });
    }

    public function down()
    {
        Schema::table('juegos', function (Blueprint $table) {
            $table->dropColumn('ventas');
        });
    }
}
