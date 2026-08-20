<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('match_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('game_id')->constrained('games')->onDelete('cascade');
            $table->foreignId('team_id')->nullable()->constrained('teams')->onDelete('cascade');
            $table->foreignId('player_id')->nullable()->constrained('players')->onDelete('cascade');
            $table->foreignId('assist_player_id')->nullable()->constrained('players')->onDelete('set null');
            $table->enum('type', [
                'goal',
                'own_goal',
                'penalty_goal',
                'penalty_miss',
                'yellow_card',
                'red_card',
                'substitution_in',
                'substitution_out',
                'injury',
                'assist'
            ]);
            $table->integer('minute');
            $table->integer('extra_time_minute')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('match_events');
    }
};