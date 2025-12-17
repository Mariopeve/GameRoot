<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('juegos', function (Illuminate\Database\Schema\Blueprint $table) {
            $table->text('descripcion_larga')->nullable()->after('descripcion');
        });
    }

    public function down()
    {
        Schema::table('juegos', function (Illuminate\Database\Schema\Blueprint $table) {
            $table->dropColumn('descripcion_larga');
        });
    }
};
