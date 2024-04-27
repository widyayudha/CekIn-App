<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('weather_data', function (Blueprint $table) {
            $table->id();
            $table->integer('temperature');
            $table->integer('humidity');
            $table->string('temperature');
            $table->decimal('wind_speed');

            $table->timestamps();
            $table->foreignId('weather_source_id')->constrained('weather_source');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weather_data');
    }
};
