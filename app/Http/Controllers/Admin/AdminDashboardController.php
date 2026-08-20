<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\News;
use App\Models\Player;
use App\Models\Team;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'teams' => Team::count(),
            'players' => Player::count(),
            'matches' => Game::count(),
            'news' => News::where('is_published', true)->count(),
            'upcomingMatches' => Game::with(['homeTeam', 'awayTeam'])
                ->where('status', 'scheduled')
                ->orderBy('scheduled_date', 'asc')
                ->limit(5)
                ->get(),
            'latestNews' => News::where('is_published', true)
                ->orderBy('published_at', 'desc')
                ->limit(5)
                ->get(),
        ];

        return inertia('Admin/Dashboard', [
            'stats' => $stats,
        ]);
    }
}