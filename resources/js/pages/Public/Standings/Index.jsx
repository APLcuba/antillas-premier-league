import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function StandingsIndex({ standings, players }) {
    const [activeTab, setActiveTab] = useState('equipos');

    // Función para obtener el color de la posición
    const getPositionColor = (index) => {
        if (index === 0) return 'text-[#F5C518]';
        if (index === 1) return 'text-gray-300';
        if (index === 2) return 'text-amber-600';
        return 'text-white';
    };

    // Función para obtener la medalla
    const getMedal = (index) => {
        if (index === 0) return '🥇';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return `${index + 1}`;
    };

    // Posiciones
    const positionLabels = {
        GK: 'Portero',
        DF: 'Defensa',
        MF: 'Mediocampista',
        FW: 'Delantero'
    };

    return (
        <PublicLayout title="Estadísticas - Antillas Premier League">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        📊 <span className="text-[#F5C518]">Estadísticas</span> de la Liga
                    </h1>
                    <p className="text-gray-400">
                        Análisis completo de equipos y jugadores de la Antillas Premier League
                    </p>
                </div>

                {/* Pestañas principales */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('equipos')}
                        className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300
                            ${activeTab === 'equipos' 
                                ? 'bg-[#F5C518] text-[#0D1B3E] shadow-lg shadow-[#F5C518]/30' 
                                : 'bg-[#162550] text-white hover:bg-[#1A2F5A]'
                            }`}
                    >
                        📊 Por Equipos
                    </button>
                    <button
                        onClick={() => setActiveTab('jugadores')}
                        className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300
                            ${activeTab === 'jugadores' 
                                ? 'bg-[#F5C518] text-[#0D1B3E] shadow-lg shadow-[#F5C518]/30' 
                                : 'bg-[#162550] text-white hover:bg-[#1A2F5A]'
                            }`}
                    >
                        👤 Por Jugadores
                    </button>
                </div>

                {/* ============================================================ */}
                {/* TABLA DE EQUIPOS */}
                {/* ============================================================ */}
                {activeTab === 'equipos' && (
                    <div className="bg-[#162550] rounded-xl overflow-hidden border border-[#E31837] shadow-xl">
                        <div className="p-4 bg-gradient-to-r from-[#0D1B3E] to-[#162550]">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="text-[#F5C518]">🏆</span> Clasificación de Equipos
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#E31837] text-white text-xs uppercase tracking-wider">
                                        <th className="px-3 py-3 text-center">#</th>
                                        <th className="px-3 py-3 text-left">Equipo</th>
                                        <th className="px-3 py-3 text-center">PJ</th>
                                        <th className="px-3 py-3 text-center">G</th>
                                        <th className="px-3 py-3 text-center">E</th>
                                        <th className="px-3 py-3 text-center">P</th>
                                        <th className="px-3 py-3 text-center">GF</th>
                                        <th className="px-3 py-3 text-center">GC</th>
                                        <th className="px-3 py-3 text-center">DG</th>
                                        <th className="px-3 py-3 text-center font-bold text-[#F5C518]">PTS</th>
                                        <th className="px-3 py-3 text-center">%</th>
                                        <th className="px-3 py-3 text-center">Racha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {standings && standings.length > 0 ? (
                                        standings.map((standing, index) => (
                                            <tr key={standing.id} className={`border-t border-[#1A2F5A] hover:bg-[#1A2F5A] transition ${index < 4 ? 'bg-[#0D1B3E]/30' : ''}`}>
                                                <td className={`px-3 py-3 text-center font-bold text-lg ${getPositionColor(index)}`}>
                                                    {getMedal(index)}
                                                </td>
                                                <td className="px-3 py-3">
                                                    <Link href={`/equipos/${standing.team.slug}`} className="flex items-center gap-3 text-white hover:text-[#E31837] transition">
                                                        <div className="w-8 h-8 bg-[#0D1B3E] rounded-full flex items-center justify-center text-xs font-bold text-[#F5C518] border border-[#E31837]">
                                                            {standing.team.name.charAt(0)}
                                                        </div>
                                                        <span className="font-medium">{standing.team.name}</span>
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-3 text-center text-white">{standing.matches_played}</td>
                                                <td className="px-3 py-3 text-center text-green-400 font-semibold">{standing.wins}</td>
                                                <td className="px-3 py-3 text-center text-yellow-400 font-semibold">{standing.draws}</td>
                                                <td className="px-3 py-3 text-center text-red-400 font-semibold">{standing.losses}</td>
                                                <td className="px-3 py-3 text-center text-white">{standing.goals_for}</td>
                                                <td className="px-3 py-3 text-center text-white">{standing.goals_against}</td>
                                                <td className={`px-3 py-3 text-center font-bold ${standing.goal_difference > 0 ? 'text-green-400' : standing.goal_difference < 0 ? 'text-red-400' : 'text-white'}`}>
                                                    {standing.goal_difference}
                                                </td>
                                                <td className="px-3 py-3 text-center font-bold text-[#F5C518] text-xl">{standing.points}</td>
                                                <td className="px-3 py-3 text-center text-white">
                                                    {standing.points_percentage}%
                                                </td>
                                                <td className="px-3 py-3 text-center text-sm tracking-wider">
                                                    {standing.streak && standing.streak.map((s, i) => (
                                                        <span key={i} className="mx-0.5">{s}</span>
                                                    ))}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="12" className="px-4 py-8 text-center text-gray-400">
                                                No hay datos disponibles. Los partidos comenzarán pronto.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Leyenda */}
                        <div className="p-4 border-t border-[#1A2F5A] flex flex-wrap items-center gap-6 text-sm text-gray-400">
                            <span className="flex items-center gap-2">
                                <span className="text-green-400">✅</span> Victoria
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-yellow-400">➖</span> Empate
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-red-400">❌</span> Derrota
                            </span>
                            <span className="text-gray-500 text-xs">(Últimos 5 partidos)</span>
                            <span className="text-gray-500 text-xs ml-auto">🥇 🥈 🥉 = Medallas</span>
                        </div>
                    </div>
                )}

                {/* ============================================================ */}
                {/* TABLA DE JUGADORES */}
                {/* ============================================================ */}
                {activeTab === 'jugadores' && (
                    <div className="bg-[#162550] rounded-xl overflow-hidden border border-[#E31837] shadow-xl">
                        <div className="p-4 bg-gradient-to-r from-[#0D1B3E] to-[#162550]">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="text-[#F5C518]">⚽</span> Estadísticas de Jugadores
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#E31837] text-white text-xs uppercase tracking-wider">
                                        <th className="px-3 py-3 text-left">Jugador</th>
                                        <th className="px-3 py-3 text-left">Equipo</th>
                                        <th className="px-3 py-3 text-center">Pos.</th>
                                        <th className="px-3 py-3 text-center">PJ</th>
                                        <th className="px-3 py-3 text-center font-bold text-[#F5C518]">Goles</th>
                                        <th className="px-3 py-3 text-center font-bold text-green-400">Asist.</th>
                                        <th className="px-3 py-3 text-center text-yellow-400">TA</th>
                                        <th className="px-3 py-3 text-center text-red-400">TR</th>
                                        <th className="px-3 py-3 text-center">G/PJ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {players && players.length > 0 ? (
                                        players.sort((a, b) => b.goals - a.goals).map((player, index) => (
                                            <tr key={player.id} className={`border-t border-[#1A2F5A] hover:bg-[#1A2F5A] transition ${index < 3 ? 'bg-[#0D1B3E]/30' : ''}`}>
                                                <td className="px-3 py-3">
                                                    <Link href={`/jugadores/${player.id}`} className="text-white hover:text-[#E31837] transition font-medium">
                                                        {player.first_name} {player.last_name}
                                                        {index === 0 && <span className="ml-2 text-[#F5C518]">👑</span>}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-3 text-gray-300">
                                                    {player.team ? (
                                                        <Link href={`/equipos/${player.team.slug}`} className="hover:text-[#E31837] transition">
                                                            {player.team.name}
                                                        </Link>
                                                    ) : (
                                                        'Sin equipo'
                                                    )}
                                                </td>
                                                <td className="px-3 py-3 text-center text-gray-400 text-sm">
                                                    {positionLabels[player.position] || player.position || '-'}
                                                </td>
                                                <td className="px-3 py-3 text-center text-white">{player.matches_played || 0}</td>
                                                <td className="px-3 py-3 text-center font-bold text-[#F5C518] text-lg">
                                                    {player.goals || 0}
                                                </td>
                                                <td className="px-3 py-3 text-center font-bold text-green-400 text-lg">
                                                    {player.assists || 0}
                                                </td>
                                                <td className="px-3 py-3 text-center text-yellow-400">
                                                    {player.yellow_cards || 0}
                                                </td>
                                                <td className="px-3 py-3 text-center text-red-400">
                                                    {player.red_cards || 0}
                                                </td>
                                                <td className="px-3 py-3 text-center text-white">
                                                    {player.goals_per_match || 0}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="px-4 py-8 text-center text-gray-400">
                                                No hay datos de jugadores disponibles.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Leyenda */}
                        <div className="p-4 border-t border-[#1A2F5A] flex flex-wrap items-center gap-6 text-sm text-gray-400">
                            <span className="flex items-center gap-2">
                                <span className="text-[#F5C518]">⚽</span> Goles
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-green-400">🎯</span> Asistencias
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-yellow-400">🟨</span> Tarjetas Amarillas
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-red-400">🟥</span> Tarjetas Rojas
                            </span>
                            <span className="text-gray-500 text-xs ml-auto">👑 = Máximo Goleador</span>
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}