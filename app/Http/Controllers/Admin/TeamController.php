<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::all();
        return inertia('Admin/Teams/Index', [
            'teams' => $teams,
        ]);
    }

    public function create()
    {
        return inertia('Admin/Teams/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:teams',
            'city' => 'nullable',
            'founded_year' => 'nullable|integer|min:1800|max:' . date('Y'),
            'primary_color' => 'nullable',
            'secondary_color' => 'nullable',
            'history' => 'nullable',
        ]);

        Team::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'city' => $request->city,
            'founded_year' => $request->founded_year,
            'primary_color' => $request->primary_color,
            'secondary_color' => $request->secondary_color,
            'history' => $request->history,
            'is_active' => $request->has('is_active'),
        ]);

        return redirect()->route('admin.teams.index')
            ->with('success', 'Equipo creado correctamente.');
    }

    public function show(Team $team)
    {
        return inertia('Admin/Teams/Show', [
            'team' => $team,
        ]);
    }

    public function edit(Team $team)
    {
        return inertia('Admin/Teams/Edit', [
            'team' => $team,
        ]);
    }

    public function update(Request $request, Team $team)
    {
        $request->validate([
            'name' => 'required|unique:teams,name,' . $team->id,
            'city' => 'nullable',
            'founded_year' => 'nullable|integer|min:1800|max:' . date('Y'),
            'primary_color' => 'nullable',
            'secondary_color' => 'nullable',
            'history' => 'nullable',
        ]);

        $team->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'city' => $request->city,
            'founded_year' => $request->founded_year,
            'primary_color' => $request->primary_color,
            'secondary_color' => $request->secondary_color,
            'history' => $request->history,
            'is_active' => $request->has('is_active'),
        ]);

        return redirect()->route('admin.teams.index')
            ->with('success', 'Equipo actualizado correctamente.');
    }

    public function destroy(Team $team)
    {
        $team->delete();
        return redirect()->route('admin.teams.index')
            ->with('success', 'Equipo eliminado correctamente.');
    }
}