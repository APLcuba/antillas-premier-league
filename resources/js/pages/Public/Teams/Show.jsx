import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';

export default function TeamShow({ team, standing, upcomingMatches, recentMatches }) {
    const positionLabels = {
        GK: 'Portero',
        DF: 'Defensa',
        MF: 'Mediocampista',
        FW: 'Delantero'
    };

    return (
        <PublicLayout title={`${team.name} - Antillas Premier League`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header del equipo */}
                <div className="bg-[#1A2A4A] rounded-xl p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* Escudo */}
                        <div className="w-32 h-32 bg-[#0A1628] rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-5xl font-bold text-[#F5C518]">
                                {team.name.charAt(0)}
                            </span>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-white">{team.name}</h1>
                            {team.city && (
                                <p className="text-gray-400">{team.city}</p>
                            )}
                            {team.founded_year && (
                                <p className="text-gray-500 text-sm">Fundado: {team.founded_year}</p>
                            )}
                            {team.history && (
                                <p className="text-gray-400 text-sm mt-2 max-w-2xl">{team.history}</p>
                            )}
                        </div>

                        {/* Estadísticas rápidas */}
                        {standing && (
                            <div className="flex gap-4 text-center bg-[#0A1628] rounded-lg p-4">
                                <div>
                                    <div className="text-[#F5C518] text-2xl font-bold">{standing.points}</div>
                                    <div className="text-gray-400 text-xs">Puntos</div>
                                </div>
                                <div className="w-px bg-[#2A3A5A]" />
                                <div>
                                    <div className="text-white text-2xl font-bold">{standing.matches_played}</div>
                                    <div className="text-gray-400 text-xs">PJ</div>
                                </div>
                                <div className="w-px bg-[#2A3A5A]" />
                                <div>
                                    <div className="text-green-400 text-2xl font-bold">{standing.wins}</div>
                                    <div className="text-gray-400 text-xs">G</div>
                                </div>
                                <div className="w-px bg-[#2A3A5A]" />
                                <div>
                                    <div className="text-yellow-400 text-2xl font-bold">{standing.draws}</div>
                                    <div className="text-gray-400 text-xs">E</div>
                                </div>
                                <div className="w-px bg-[#2A3A5A]" />
                                <div>
                                    <div className="text-red-400 text-2xl font-bold">{standing.losses}</div>
                                    <div className="text-gray-400 text-xs">P</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Plantilla */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#1A2A4A] rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Plantilla</h2>

                            {team.players && team.players.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-gray-400 text-sm border-b border-[#0A1628]">
                                                <th className="px-3 py-2 text-left">Dorsal</th>
                                                <th className="px-3 py-2 text-left">Jugador</th>
                                                <th className="px-3 py-2 text-left">Posición</th>
                                                <th className="px-3 py-2 text-left">Nacionalidad</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {team.players.map((player) => (
                                                <tr key={player.id} className="border-b border-[#0A1628] hover:bg-[#2A3A5A] transition">
                                                    <td className="px-3 py-3 text-white font-bold">
                                                        {player.dorsal || '-'}
                                                    </td>
                                                    <td className="px-3 py-3">
                                                        <Link
                                                            href={`/jugadores/${player.id}`}
                                                            className="text-white hover:text-[#F5C518] transition"
                                                        >
                                                            {player.first_name} {player.last_name}
                                                        </Link>
                                                    </td>
                                                    <td className="px-3 py-3 text-gray-300">
                                                        {player.position ? positionLabels[player.position] || player.position : '-'}
                                                    </td>
                                                    <td className="px-3 py-3 text-gray-400 text-sm">
                                                        {player.nationality || '-'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-400 text-center py-8">No hay jugadores registrados en este equipo.</p>
                            )}
                        </div>
                    </div>

                    {/* Partidos */}
                    <div className="space-y-6">
                        {/* Próximos partidos */}
                        <div className="bg-[#1A2A4A] rounded-xl p-6">
                            <h3 className="text-white font-semibold mb-4">📅 Próximos Partidos</h3>
                            {upcomingMatches.length > 0 ? (
                                <div className="space-y-3">
                                    {upcomingMatches.map((match) => (
                                        <Link
                                            key={match.id}
                                            href={`/partidos/${match.id}`}
                                            className="block bg-[#0A1628] rounded-lg p-3 hover:bg-[#2A3A5A] transition"
                                        >
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-white font-medium">
                                                    {match.home_team_id === team.id ? '🏠' : '✈️'} {match.home_team.name}
                                                </span>
                                                <span className="text-gray-400 text-xs">vs</span>
                                                <span className="text-white font-medium">
                                                    {match.away_team.name} {match.away_team_id === team.id ? '🏠' : '✈️'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                                                <span>{new Date(match.scheduled_date).toLocaleDateString('es-ES')}</span>
                                                <span>{match.scheduled_time?.substring(0, 5) || '--:--'}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-center py-4 text-sm">No hay partidos programados.</p>
                            )}
                        </div>

                        {/* Últimos partidos */}
                        <div className="bg-[#1A2A4A] rounded-xl p-6">
                            <h3 className="text-white font-semibold mb-4">📊 Últimos Resultados</h3>
                            {recentMatches.length > 0 ? (
                                <div className="space-y-3">
                                    {recentMatches.map((match) => (
                                        <div key={match.id} className="bg-[#0A1628] rounded-lg p-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-white text-sm">{match.home_team.name}</span>
                                                <span className="text-[#F5C518] font-bold">
                                                    {match.home_score} - {match.away_score}
                                                </span>
                                                <span className="text-white text-sm">{match.away_team.name}</span>
                                            </div>
                                            <div className="text-center text-xs text-gray-500 mt-1">
                                                {new Date(match.scheduled_date).toLocaleDateString('es-ES')}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-center py-4 text-sm">No hay partidos finalizados.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}