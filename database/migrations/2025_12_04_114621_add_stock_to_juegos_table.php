<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddStockToJuegosTable extends Migration
{
    public function up()
    {
        Schema::table('juegos', function (Blueprint $table) {
            $table->integer('stock')->default(100)->after('ventas');
        });
    }

    public function down()
    {
        Schema::table('juegos', function (Blueprint $table) {
            $table->dropColumn('stock');
        });
    }
}
