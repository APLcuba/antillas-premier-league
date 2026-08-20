<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Agregar last_name como nullable primero
            $table->string('last_name')->nullable()->after('name');
            
            // Agregar los demás campos
            $table->foreignId('favorite_team_id')->nullable()->after('email_verified_at')->constrained('teams')->onDelete('set null');
            $table->enum('role', ['admin', 'user'])->default('user')->after('favorite_team_id');
            $table->boolean('is_active')->default(true)->after('role');
        });

        // Actualizar los registros existentes (si hay)
        DB::table('users')->update(['last_name' => '']);
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['favorite_team_id']);
            $table->dropColumn(['last_name', 'favorite_team_id', 'role', 'is_active']);
        });
    }
};