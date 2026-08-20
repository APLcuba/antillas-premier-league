<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('standings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained('teams')->onDelete('cascade');
            $table->foreignId('season_id')->constrained('seasons')->onDelete('cascade');
            $table->integer('points')->default(0);
            $table->integer('wins')->default(0);
            $table->integer('draws')->default(0);
            $table->integer('losses')->default(0);
            $table->integer('goals_for')->default(0);
            $table->integer('goals_against')->default(0);
            $table->integer('goal_difference')->virtualAs('goals_for - goals_against');
            $table->integer('matches_played')->default(0);
            $table->timestamps();

            // Para evitar duplicados (un equipo solo puede tener un registro por temporada)
            $table->unique(['team_id', 'season_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('standings');
    }
};