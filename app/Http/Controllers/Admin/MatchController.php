<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\Season;
use App\Models\Stadium;
use App\Models\Team;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    public function index()
    {
        $matches = Game::with(['homeTeam', 'awayTeam', 'stadium', 'season'])
            ->orderBy('scheduled_date', 'desc')
            ->get();

        return inertia('Admin/Matches/Index', [
            'matches' => $matches,
        ]);
    }

    public function create()
    {
        $teams = Team::where('is_active', true)->orderBy('name')->get();
        $seasons = Season::orderBy('name', 'desc')->get();
        $stadiums = Stadium::orderBy('name')->get();

        return inertia('Admin/Matches/Create', [
            'teams' => $teams,
            'seasons' => $seasons,
            'stadiums' => $stadiums,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'season_id' => 'required|exists:seasons,id',
            'home_team_id' => 'required|exists:teams,id',
            'away_team_id' => 'required|exists:teams,id|different:home_team_id',
            'stadium_id' => 'nullable|exists:stadiums,id',
            'scheduled_date' => 'required|date',
            'scheduled_time' => 'nullable',
            'status' => 'required|in:scheduled,live,finished,postponed,cancelled',
            'home_score' => 'nullable|integer|min:0',
            'away_score' => 'nullable|integer|min:0',
        ]);

        Game::create($request->all());

        return redirect()->route('admin.matches.index')
            ->with('success', 'Partido creado correctamente.');
    }

    public function show(Game $match)
    {
        $match->load(['homeTeam', 'awayTeam', 'stadium', 'season', 'matchEvents' => function($query) {
            $query->with(['player', 'assistPlayer', 'team'])->orderBy('minute');
        }]);

        return inertia('Admin/Matches/Show', [
            'match' => $match,
        ]);
    }

    public function edit(Game $match)
    {
        $teams = Team::where('is_active', true)->orderBy('name')->get();
        $seasons = Season::orderBy('name', 'desc')->get();
        $stadiums = Stadium::orderBy('name')->get();

        return inertia('Admin/Matches/Edit', [
            'match' => $match,
            'teams' => $teams,
            'seasons' => $seasons,
            'stadiums' => $stadiums,
        ]);
    }

    public function update(Request $request, Game $match)
    {
        $request->validate([
            'season_id' => 'required|exists:seasons,id',
            'home_team_id' => 'required|exists:teams,id',
            'away_team_id' => 'required|exists:teams,id|different:home_team_id',
            'stadium_id' => 'nullable|exists:stadiums,id',
            'scheduled_date' => 'required|date',
            'scheduled_time' => 'nullable',
            'status' => 'required|in:scheduled,live,finished,postponed,cancelled',
            'home_score' => 'nullable|integer|min:0',
            'away_score' => 'nullable|integer|min:0',
        ]);

        $match->update($request->all());

        return redirect()->route('admin.matches.index')
            ->with('success', 'Partido actualizado correctamente.');
    }

    public function destroy(Game $match)
    {
        $match->delete();
        return redirect()->route('admin.matches.index')
            ->with('success', 'Partido eliminado correctamente.');
    }
}