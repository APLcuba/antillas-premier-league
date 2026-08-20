<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\MatchController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Admin\PlayerController;
use App\Http\Controllers\Admin\StadiumController;
use App\Http\Controllers\Admin\TeamController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;

// ============================================
// RUTA PRINCIPAL
// ============================================
Route::get('/', [PublicController::class, 'home'])->name('home');

// ============================================
// RUTAS DE AUTENTICACIÓN (Breeze)
// ============================================
Route::get('/dashboard', function () {
    return redirect('/');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ============================================
// RUTAS DE VERIFICACIÓN DE EMAIL
// ============================================
Route::middleware('auth')->group(function () {
    Route::get('/verify-email', [EmailVerificationPromptController::class, '__invoke'])
        ->name('verification.notice');

    Route::get('/verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');
});

// ============================================
// RUTAS PÚBLICAS
// ============================================
Route::get('/equipos', [PublicController::class, 'teams'])->name('public.teams');
Route::get('/equipos/{team:slug}', [PublicController::class, 'teamShow'])->name('public.team.show');

Route::get('/jugadores', [PublicController::class, 'players'])->name('public.players');
Route::get('/jugadores/{player}', [PublicController::class, 'playerShow'])->name('public.player.show');

Route::get('/partidos', [PublicController::class, 'matches'])->name('public.matches');
Route::get('/partidos/{game}', [PublicController::class, 'matchShow'])->name('public.match.show');

Route::get('/noticias', [PublicController::class, 'news'])->name('public.news');
Route::get('/noticias/{news:slug}', [PublicController::class, 'newsShow'])->name('public.news.show');

Route::get('/tabla-posiciones', [PublicController::class, 'standings'])->name('public.standings');

Route::get('/patrocinadores', [PublicController::class, 'sponsors'])->name('public.sponsors');
Route::get('/reglamento', [PublicController::class, 'regulations'])->name('public.regulations');

// Ruta para obtener notificaciones en JSON (para la campana)
Route::get('/api/notifications-data', [NotificationController::class, 'getNotificationsData'])->middleware('auth');

// ============================================
// RUTAS DE NOTIFICACIONES Y COMENTARIOS (SOLO UNA VEZ)
// ============================================
Route::middleware('auth')->group(function () {
    // Notificaciones
    Route::get('/notificaciones', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notificaciones/marcar/{id}', [NotificationController::class, 'markAsRead'])->name('notifications.mark');
    Route::post('/notificaciones/marcar-todas', [NotificationController::class, 'markAllAsRead'])->name('notifications.markAll');
    Route::get('/notificaciones/no-leidas', [NotificationController::class, 'unreadCount'])->name('notifications.unread');

    // Comentarios (SOLO UNA VEZ, sin duplicar)
    Route::post('/comentarios', [CommentController::class, 'store'])->name('comments.store');
    Route::delete('/comentarios/{id}', [CommentController::class, 'destroy'])->name('comments.destroy');
});

// ============================================
// RUTAS DEL PANEL DE ADMINISTRACIÓN
// ============================================
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::resource('teams', TeamController::class);
    Route::resource('players', PlayerController::class);
    Route::resource('matches', MatchController::class);
    Route::resource('news', NewsController::class);
    Route::resource('stadiums', StadiumController::class);
    Route::resource('users', UserController::class);
});

// ============================================
// RUTAS DE AUTENTICACIÓN (Breeze)
// ============================================
require __DIR__.'/auth.php';