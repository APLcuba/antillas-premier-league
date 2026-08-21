<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\News;
use App\Models\Player;
use App\Models\Season;
use App\Models\Standing;
use App\Models\Team;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function home()
    {
        $standings = Standing::with('team')
            ->orderBy('points', 'desc')
            ->orderBy('goal_difference', 'desc')
            ->orderBy('goals_for', 'desc')
            ->get();

        $upcomingMatches = Game::with(['homeTeam', 'awayTeam'])
            ->where('status', 'scheduled')
            ->orderBy('scheduled_date', 'asc')
            ->limit(5)
            ->get();

        $latestNews = News::where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->limit(5)
            ->get();

        return inertia('Home', [
            'standings' => $standings,
            'upcomingMatches' => $upcomingMatches,
            'latestNews' => $latestNews,
        ]);
    }

    // ========== EQUIPOS ==========
    public function teams()
    {
        $teams = Team::where('is_active', true)
            ->orderBy('name')
            ->get();

        return inertia('Public/Teams/Index', [
            'teams' => $teams,
        ]);
    }

    public function teamShow(Team $team)
    {
        $team->load(['players' => function($query) {
            $query->where('is_active', true)->orderBy('dorsal');
        }]);

        $standing = Standing::with('team')
            ->where('team_id', $team->id)
            ->first();

        $upcomingMatches = Game::with(['homeTeam', 'awayTeam'])
            ->where(function($query) use ($team) {
                $query->where('home_team_id', $team->id)
                    ->orWhere('away_team_id', $team->id);
            })
            ->where('status', 'scheduled')
            ->orderBy('scheduled_date', 'asc')
            ->limit(5)
            ->get();

        $recentMatches = Game::with(['homeTeam', 'awayTeam'])
            ->where(function($query) use ($team) {
                $query->where('home_team_id', $team->id)
                    ->orWhere('away_team_id', $team->id);
            })
            ->where('status', 'finished')
            ->orderBy('scheduled_date', 'desc')
            ->limit(5)
            ->get();

        return inertia('Public/Teams/Show', [
            'team' => $team,
            'standing' => $standing,
            'upcomingMatches' => $upcomingMatches,
            'recentMatches' => $recentMatches,
        ]);
    }

    // ========== JUGADORES ==========
    public function players(Request $request)
    {
        $query = Player::with('team')
            ->where('is_active', true);

        if ($request->has('team') && $request->team != '') {
            $query->where('team_id', $request->team);
        }

        if ($request->has('position') && $request->position != '') {
            $query->where('position', $request->position);
        }

        $players = $query->orderBy('last_name')->get();

        $teams = Team::where('is_active', true)->orderBy('name')->get();
        $positions = ['GK' => 'Portero', 'DF' => 'Defensa', 'MF' => 'Mediocampista', 'FW' => 'Delantero'];

        return inertia('Public/Players/Index', [
            'players' => $players,
            'teams' => $teams,
            'positions' => $positions,
            'filters' => [
                'team' => $request->team,
                'position' => $request->position,
            ],
        ]);
    }

    public function playerShow(Player $player)
    {
        $player->load('team');

        $goals = $player->matchEvents()->where('type', 'goal')->count();
        $assists = $player->matchEvents()->where('type', 'assist')->count();
        $yellowCards = $player->matchEvents()->where('type', 'yellow_card')->count();
        $redCards = $player->matchEvents()->where('type', 'red_card')->count();

        $matches = Game::whereHas('matchEvents', function($query) use ($player) {
            $query->where('player_id', $player->id);
        })->with(['homeTeam', 'awayTeam'])
        ->orderBy('scheduled_date', 'desc')
        ->limit(10)
        ->get();

        return inertia('Public/Players/Show', [
            'player' => $player,
            'stats' => [
                'goals' => $goals,
                'assists' => $assists,
                'yellow_cards' => $yellowCards,
                'red_cards' => $redCards,
            ],
            'matches' => $matches,
        ]);
    }

    // ========== PARTIDOS ==========
    public function matches(Request $request)
    {
        $query = Game::with(['homeTeam', 'awayTeam', 'stadium', 'season'])
            ->where('season_id', $request->season ?? 1);

        if ($request->has('status') && $request->status != '') {
            $query->where('status', $request->status);
        }

        if ($request->has('team') && $request->team != '') {
            $query->where(function($q) use ($request) {
                $q->where('home_team_id', $request->team)
                  ->orWhere('away_team_id', $request->team);
            });
        }

        if ($request->has('date_from') && $request->date_from != '') {
            $query->where('scheduled_date', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to != '') {
            $query->where('scheduled_date', '<=', $request->date_to);
        }

        $matches = $query->orderBy('scheduled_date', 'asc')
            ->orderBy('scheduled_time', 'asc')
            ->get();

        $teams = Team::where('is_active', true)->orderBy('name')->get();
        $seasons = Season::orderBy('name', 'desc')->get();
        $statuses = [
            'scheduled' => 'Programado',
            'live' => 'En Vivo',
            'finished' => 'Finalizado',
            'postponed' => 'Aplazado',
            'cancelled' => 'Cancelado'
        ];

        return inertia('Public/Matches/Index', [
            'matches' => $matches,
            'teams' => $teams,
            'seasons' => $seasons,
            'statuses' => $statuses,
            'filters' => [
                'status' => $request->status,
                'team' => $request->team,
                'season' => $request->season ?? 1,
                'date_from' => $request->date_from,
                'date_to' => $request->date_to,
            ],
        ]);
    }

    public function matchShow(Game $game)
    {
        $game->load(['homeTeam', 'awayTeam', 'stadium', 'season', 'matchEvents' => function($query) {
            $query->with(['player', 'assistPlayer', 'team'])->orderBy('minute');
        }]);

        return inertia('Public/Matches/Show', [
            'match' => $game,
        ]);
    }

    // ========== ESTADÍSTICAS COMPLETAS ==========
    public function standings()
    {
        // 1. Tabla de posiciones (equipos)
        $standings = Standing::with('team')
            ->orderBy('points', 'desc')
            ->orderBy('goal_difference', 'desc')
            ->orderBy('goals_for', 'desc')
            ->get()
            ->map(function($standing, $index) {
                // Calcular porcentaje de puntos
                $maxPoints = $standing->matches_played * 3;
                $standing->points_percentage = $maxPoints > 0 ? round(($standing->points / $maxPoints) * 100, 1) : 0;
                
                // Calcular racha (simulada con datos disponibles)
                $streaks = ['✅', '✅', '✅', '➖', '❌', '❌', '✅', '➖'];
                $standing->streak = array_slice($streaks, 0, 5);
                
                return $standing;
            });

        // 2. Estadísticas de jugadores
        $players = Player::with('team')
            ->where('is_active', true)
            ->get()
            ->map(function($player) {
                // Estadísticas del jugador
                $goals = $player->matchEvents()->where('type', 'goal')->count();
                $assists = $player->matchEvents()->where('type', 'assist')->count();
                $yellowCards = $player->matchEvents()->where('type', 'yellow_card')->count();
                $redCards = $player->matchEvents()->where('type', 'red_card')->count();
                
                // Partidos jugados (simulado)
                $matchesPlayed = rand(0, 10);
                
                // Goles por partido
                $goalsPerMatch = $matchesPlayed > 0 ? round($goals / $matchesPlayed, 2) : 0;
                
                return [
                    'id' => $player->id,
                    'first_name' => $player->first_name,
                    'last_name' => $player->last_name,
                    'team' => $player->team,
                    'position' => $player->position,
                    'position_label' => $this->getPositionLabel($player->position),
                    'matches_played' => $matchesPlayed,
                    'goals' => $goals,
                    'assists' => $assists,
                    'yellow_cards' => $yellowCards,
                    'red_cards' => $redCards,
                    'goals_per_match' => $goalsPerMatch,
                ];
            });

        // Ordenar por goles (descendente)
        $topScorers = $players->sortByDesc('goals')->values();
        
        // Ordenar por asistencias (descendente)
        $topAssists = $players->sortByDesc('assists')->values();

        return inertia('Public/Standings/Index', [
            'standings' => $standings,
            'topScorers' => $topScorers,
            'topAssists' => $topAssists,
            'players' => $players,
        ]);
    }

    private function getPositionLabel($position)
    {
        $labels = [
            'GK' => 'Portero',
            'DF' => 'Defensa',
            'MF' => 'Mediocampista',
            'FW' => 'Delantero'
        ];
        return $labels[$position] ?? $position;
    }

    // ========== NOTICIAS ==========
    public function news(Request $request)
    {
        $query = News::where('is_published', true);

        // Filtro por categoría
        if ($request->has('category') && $request->category != '') {
            $query->where('category', $request->category);
        }

        $news = $query->orderBy('published_at', 'desc')
            ->paginate(12);

        // Categorías para el filtro
        $categories = News::where('is_published', true)
            ->select('category')
            ->distinct()
            ->pluck('category');

        return inertia('Public/News/Index', [
            'news' => $news,
            'categories' => $categories,
            'currentCategory' => $request->category,
        ]);
    }

    public function newsShow(News $news)
    {
        if (!$news->is_published) {
            abort(404);
        }

        // Noticias relacionadas (misma categoría)
        $relatedNews = News::where('is_published', true)
            ->where('category', $news->category)
            ->where('id', '!=', $news->id)
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get();

        // 🔴 OBTENER LOS COMENTARIOS CON EL USUARIO
        $comments = $news->comments()->with('user')->latest()->get();

        return inertia('Public/News/Show', [
            'news' => $news,
            'relatedNews' => $relatedNews,
            'comments' => $comments, // 👈 PASAR LOS COMENTARIOS
        ]);
    }

    // ========== PATROCINADORES ==========
    public function sponsors()
    {
        return inertia('Public/Sponsors');
    }

    // ========== REGLAMENTO ==========
    public function regulations()
    {
        return inertia('Public/Regulations');
    }
}