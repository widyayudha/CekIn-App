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
        Schema::create('weather', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('city_name');
            $table->string('image_path')->nullable();
            $table->string('condition')->nullable();
            $table->longText('description')->nullable();
            $table->float('temperature')->nullable();
            $table->integer('pressure')->nullable();
            $table->integer('humidity')->nullable();
            $table->float('wind_speed')->nullable();
            $table->foreignId('assigned_user_id')->constrained('users');
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weather');
    }
};
