<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->nullable()->constrained('teams')->onDelete('set null'); // Equipo al que pertenece
            $table->string('first_name'); // Nombre
            $table->string('last_name'); // Apellidos
            $table->string('full_name')->virtualAs('CONCAT(first_name, " ", last_name)'); // Nombre completo (campo virtual)
            $table->integer('dorsal')->nullable(); // Número de camiseta
            $table->enum('position', ['GK', 'DF', 'MF', 'FW'])->nullable(); // Posición
            $table->date('date_of_birth')->nullable(); // Fecha de nacimiento
            $table->string('nationality')->nullable(); // Nacionalidad
            $table->integer('height')->nullable(); // Altura en cm
            $table->integer('weight')->nullable(); // Peso en kg
            $table->string('photo_path')->nullable(); // Ruta de la foto
            $table->text('biography')->nullable(); // Biografía
            $table->boolean('is_active')->default(true); // Jugador en activo
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};