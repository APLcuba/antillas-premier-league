import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';

export default function MatchShow({ match }) {
    const eventIcons = {
        goal: '⚽',
        own_goal: '⚽ (en propia)',
        penalty_goal: '⚽ (penal)',
        penalty_miss: '❌ (penal fallado)',
        yellow_card: '🟨',
        red_card: '🟥',
        substitution_in: '↩️',
        substitution_out: '↪️',
        injury: '🩺',
        assist: '🎯'
    };

    const statusColors = {
        scheduled: 'bg-yellow-600/30 text-yellow-400',
        live: 'bg-red-600/30 text-red-400 animate-pulse',
        finished: 'bg-green-600/30 text-green-400',
        postponed: 'bg-blue-600/30 text-blue-400',
        cancelled: 'bg-gray-600/30 text-gray-400',
    };

    const statusLabels = {
        scheduled: 'Programado',
        live: '🔴 En Vivo',
        finished: 'Finalizado',
        postponed: 'Aplazado',
        cancelled: 'Cancelado',
    };

    return (
        <PublicLayout title={`${match.home_team.name} vs ${match.away_team.name} - Antillas Premier League`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Cabecera del partido */}
                <div className="bg-[#1A2A4A] rounded-xl p-6 mb-8">
                    <div className="flex flex-col items-center">
                        {/* Estado */}
                        <span className={`px-4 py-1 rounded-full text-sm font-medium mb-4 ${statusColors[match.status] || 'bg-gray-600/30 text-gray-400'}`}>
                            {statusLabels[match.status] || match.status}
                        </span>

                        {/* Equipos y resultado */}
                        <div className="flex items-center justify-center gap-4 md:gap-12 w-full">
                            {/* Local */}
                            <div className="text-center flex-1">
                                <Link href={`/equipos/${match.home_team.slug}`} className="hover:text-[#F5C518] transition">
                                    <div className="text-2xl md:text-3xl font-bold text-white">
                                        {match.home_team.name}
                                    </div>
                                </Link>
                                <div className="text-gray-400 text-sm">Local</div>
                            </div>

                            {/* Marcador */}
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-[#F5C518]">
                                    {match.status === 'finished' ? match.home_score : '-'}
                                    <span className="text-gray-500 mx-2">vs</span>
                                    {match.status === 'finished' ? match.away_score : '-'}
                                </div>
                                {match.stadium && (
                                    <div className="text-gray-400 text-sm mt-2">
                                        🏟️ {match.stadium.name}
                                    </div>
                                )}
                                <div className="text-gray-500 text-xs">
                                    {new Date(match.scheduled_date).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })} - {match.scheduled_time ? match.scheduled_time.substring(0, 5) : '--:--'}
                                </div>
                            </div>

                            {/* Visitante */}
                            <div className="text-center flex-1">
                                <Link href={`/equipos/${match.away_team.slug}`} className="hover:text-[#F5C518] transition">
                                    <div className="text-2xl md:text-3xl font-bold text-white">
                                        {match.away_team.name}
                                    </div>
                                </Link>
                                <div className="text-gray-400 text-sm">Visitante</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Eventos del partido */}
                {match.matchEvents && match.matchEvents.length > 0 && (
                    <div className="bg-[#1A2A4A] rounded-xl p-6">
                        <h2 className="text-xl font-bold text-white mb-4">📋 Eventos del Partido</h2>
                        <div className="space-y-2">
                            {match.matchEvents.map((event) => (
                                <div key={event.id} className="bg-[#0A1628] rounded-lg p-3 flex items-center gap-4">
                                    <span className="text-[#F5C518] font-bold min-w-[50px]">
                                        {event.minute}'
                                        {event.extra_time_minute && `+${event.extra_time_minute}`}
                                    </span>
                                    <span className="text-2xl">{eventIcons[event.type] || '📌'}</span>
                                    <div>
                                        <div className="text-white font-medium">
                                            {event.player ? `${event.player.first_name} ${event.player.last_name}` : 'Jugador'}
                                            {event.assistPlayer && (
                                                <span className="text-gray-400 text-sm">
                                                    {' '}(asistencia de {event.assistPlayer.first_name} {event.assistPlayer.last_name})
                                                </span>
                                            )}
                                        </div>
                                        {event.description && (
                                            <div className="text-gray-400 text-sm">{event.description}</div>
                                        )}
                                    </div>
                                    {event.team && (
                                        <span className="ml-auto text-gray-400 text-sm">{event.team.name}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Si no hay eventos */}
                {(!match.matchEvents || match.matchEvents.length === 0) && match.status === 'scheduled' && (
                    <div className="bg-[#1A2A4A] rounded-xl p-6 text-center">
                        <p className="text-gray-400">El partido aún no ha comenzado. Los eventos se mostrarán aquí.</p>
                    </div>
                )}

                {(!match.matchEvents || match.matchEvents.length === 0) && match.status === 'finished' && (
                    <div className="bg-[#1A2A4A] rounded-xl p-6 text-center">
                        <p className="text-gray-400">No hay eventos registrados para este partido.</p>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}