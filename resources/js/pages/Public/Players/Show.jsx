import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';

export default function PlayerShow({ player, stats, matches }) {
    const positionLabels = {
        GK: 'Portero',
        DF: 'Defensa',
        MF: 'Mediocampista',
        FW: 'Delantero'
    };

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <PublicLayout title={`${player.first_name} ${player.last_name} - Antillas Premier League`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Perfil del jugador */}
                <div className="bg-[#1A2A4A] rounded-xl p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* Foto placeholder */}
                        <div className="w-32 h-32 bg-[#0A1628] rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-4xl font-bold text-[#F5C518]">
                                {player.first_name.charAt(0)}{player.last_name.charAt(0)}
                            </span>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-white">
                                {player.first_name} {player.last_name}
                            </h1>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
                                {player.dorsal && (
                                    <span className="text-[#F5C518] font-bold">#{player.dorsal}</span>
                                )}
                                {player.position && (
                                    <span className="px-3 py-1 bg-[#0A1628] text-gray-300 rounded-lg text-sm">
                                        {positionLabels[player.position] || player.position}
                                    </span>
                                )}
                                {player.team && (
                                    <Link href={`/equipos/${player.team.slug}`} className="text-[#F5C518] hover:underline text-sm">
                                        {player.team.name}
                                    </Link>
                                )}
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 max-w-2xl">
                                {player.date_of_birth && (
                                    <div className="bg-[#0A1628] rounded-lg p-3 text-center">
                                        <div className="text-white font-semibold">{calculateAge(player.date_of_birth)} años</div>
                                        <div className="text-gray-400 text-xs">Edad</div>
                                    </div>
                                )}
                                {player.nationality && (
                                    <div className="bg-[#0A1628] rounded-lg p-3 text-center">
                                        <div className="text-white font-semibold">{player.nationality}</div>
                                        <div className="text-gray-400 text-xs">Nacionalidad</div>
                                    </div>
                                )}
                                {player.height && (
                                    <div className="bg-[#0A1628] rounded-lg p-3 text-center">
                                        <div className="text-white font-semibold">{player.height} cm</div>
                                        <div className="text-gray-400 text-xs">Altura</div>
                                    </div>
                                )}
                                {player.weight && (
                                    <div className="bg-[#0A1628] rounded-lg p-3 text-center">
                                        <div className="text-white font-semibold">{player.weight} kg</div>
                                        <div className="text-gray-400 text-xs">Peso</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Estadísticas rápidas */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 bg-[#0A1628] rounded-lg p-4">
                        <div className="text-center">
                            <div className="text-[#F5C518] text-2xl font-bold">{stats.goals}</div>
                            <div className="text-gray-400 text-xs">Goles</div>
                        </div>
                        <div className="text-center">
                            <div className="text-green-400 text-2xl font-bold">{stats.assists}</div>
                            <div className="text-gray-400 text-xs">Asistencias</div>
                        </div>
                        <div className="text-center">
                            <div className="text-yellow-400 text-2xl font-bold">{stats.yellow_cards}</div>
                            <div className="text-gray-400 text-xs">Tarjetas Amarillas</div>
                        </div>
                        <div className="text-center">
                            <div className="text-red-400 text-2xl font-bold">{stats.red_cards}</div>
                            <div className="text-gray-400 text-xs">Tarjetas Rojas</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Biografía */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#1A2A4A] rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Biografía</h2>
                            {player.biography ? (
                                <p className="text-gray-300 leading-relaxed">{player.biography}</p>
                            ) : (
                                <p className="text-gray-400">No hay biografía disponible para este jugador.</p>
                            )}
                        </div>

                        {/* Últimos partidos */}
                        {matches.length > 0 && (
                            <div className="bg-[#1A2A4A] rounded-xl p-6 mt-6">
                                <h2 className="text-xl font-bold text-white mb-4">Últimos Partidos</h2>
                                <div className="space-y-3">
                                    {matches.map((match) => (
                                        <Link
                                            key={match.id}
                                            href={`/partidos/${match.id}`}
                                            className="block bg-[#0A1628] rounded-lg p-3 hover:bg-[#2A3A5A] transition"
                                        >
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
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Información adicional */}
                    <div>
                        <div className="bg-[#1A2A4A] rounded-xl p-6">
                            <h3 className="text-white font-semibold mb-4">Información</h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="text-gray-400">Nombre completo:</span>
                                    <p className="text-white">{player.first_name} {player.last_name}</p>
                                </div>
                                {player.date_of_birth && (
                                    <div>
                                        <span className="text-gray-400">Fecha de nacimiento:</span>
                                        <p className="text-white">{new Date(player.date_of_birth).toLocaleDateString('es-ES')}</p>
                                    </div>
                                )}
                                {player.team && (
                                    <div>
                                        <span className="text-gray-400">Equipo:</span>
                                        <p className="text-[#F5C518]">{player.team.name}</p>
                                    </div>
                                )}
                                <div>
                                    <span className="text-gray-400">Estado:</span>
                                    <p className={player.is_active ? 'text-green-400' : 'text-red-400'}>
                                        {player.is_active ? 'Activo' : 'Inactivo'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}