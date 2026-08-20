<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->nullable()->constrained('teams')->onDelete('set null');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('full_name')->virtualAs('CONCAT(first_name, " ", last_name)');
            $table->enum('role', [
                'head_coach',       // Entrenador principal
                'assistant_coach',  // Asistente
                'physio',           // Fisioterapeuta
                'doctor',           // Médico
                'analyst',          // Analista de video
                'other'             // Otros
            ])->default('other');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->string('photo_path')->nullable();
            $table->text('biography')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('staff');
    }
};