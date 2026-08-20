<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Player;
use App\Models\Team;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    public function index()
    {
        $players = Player::with('team')->get();
        return inertia('Admin/Players/Index', [
            'players' => $players,
        ]);
    }

    public function create()
    {
        $teams = Team::orderBy('name')->get();
        return inertia('Admin/Players/Create', [
            'teams' => $teams,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'team_id' => 'nullable|exists:teams,id',
            'dorsal' => 'nullable|integer|min:1|max:99',
            'position' => 'nullable|in:GK,DF,MF,FW',
            'date_of_birth' => 'nullable|date',
            'nationality' => 'nullable|string|max:100',
            'height' => 'nullable|integer|min:100|max:250',
            'weight' => 'nullable|integer|min:30|max:200',
            'biography' => 'nullable|string',
        ]);

        Player::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'team_id' => $request->team_id,
            'dorsal' => $request->dorsal,
            'position' => $request->position,
            'date_of_birth' => $request->date_of_birth,
            'nationality' => $request->nationality,
            'height' => $request->height,
            'weight' => $request->weight,
            'biography' => $request->biography,
            'is_active' => $request->has('is_active'),
        ]);

        return redirect()->route('admin.players.index')
            ->with('success', 'Jugador creado correctamente.');
    }

    public function show(Player $player)
    {
        $player->load('team');
        return inertia('Admin/Players/Show', [
            'player' => $player,
        ]);
    }

    public function edit(Player $player)
    {
        $teams = Team::orderBy('name')->get();
        return inertia('Admin/Players/Edit', [
            'player' => $player,
            'teams' => $teams,
        ]);
    }

    public function update(Request $request, Player $player)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'team_id' => 'nullable|exists:teams,id',
            'dorsal' => 'nullable|integer|min:1|max:99',
            'position' => 'nullable|in:GK,DF,MF,FW',
            'date_of_birth' => 'nullable|date',
            'nationality' => 'nullable|string|max:100',
            'height' => 'nullable|integer|min:100|max:250',
            'weight' => 'nullable|integer|min:30|max:200',
            'biography' => 'nullable|string',
        ]);

        $player->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'team_id' => $request->team_id,
            'dorsal' => $request->dorsal,
            'position' => $request->position,
            'date_of_birth' => $request->date_of_birth,
            'nationality' => $request->nationality,
            'height' => $request->height,
            'weight' => $request->weight,
            'biography' => $request->biography,
            'is_active' => $request->has('is_active'),
        ]);

        return redirect()->route('admin.players.index')
            ->with('success', 'Jugador actualizado correctamente.');
    }

    public function destroy(Player $player)
    {
        $player->delete();
        return redirect()->route('admin.players.index')
            ->with('success', 'Jugador eliminado correctamente.');
    }
}