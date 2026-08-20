import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';

export default function MatchesShow({ match }) {
    const statusColors = {
        scheduled: 'bg-yellow-600/30 text-yellow-400',
        live: 'bg-red-600/30 text-red-400',
        finished: 'bg-green-600/30 text-green-400',
        postponed: 'bg-blue-600/30 text-blue-400',
        cancelled: 'bg-gray-600/30 text-gray-400',
    };

    const statusLabels = {
        scheduled: 'Programado',
        live: 'En Vivo',
        finished: 'Finalizado',
        postponed: 'Aplazado',
        cancelled: 'Cancelado',
    };

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

    return (
        <AdminLayout title={`Partido #${match.id}`}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">
                    Partido: {match.home_team?.name} vs {match.away_team?.name}
                </h1>
                <Link
                    href="/admin/matches"
                    className="bg-[#1A2A4A] text-gray-300 px-4 py-2 rounded-lg hover:bg-[#2A3A5A] transition"
                >
                    ← Volver
                </Link>
            </div>

            {/* Información del partido */}
            <div className="bg-[#1A2A4A] rounded-xl p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="text-gray-400 text-sm">Temporada</div>
                        <div className="text-white font-semibold">{match.season?.name || 'N/A'}</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-sm">Estado</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[match.status] || 'bg-gray-600/30 text-gray-400'}`}>
                            {statusLabels[match.status] || match.status}
                        </span>
                    </div>
                    <div>
                        <div className="text-gray-400 text-sm">Fecha</div>
                        <div className="text-white font-semibold">
                            {new Date(match.scheduled_date).toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-sm">Hora</div>
                        <div className="text-white font-semibold">{match.scheduled_time || '--:--'}</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-sm">Estadio</div>
                        <div className="text-white font-semibold">{match.stadium?.name || 'Sin estadio'}</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-sm">Resultado</div>
                        <div className="text-[#F5C518] font-bold text-xl">
                            {match.status === 'finished' ? `${match.home_score} - ${match.away_score}` : 'Aún no disputado'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Eventos del partido */}
            <div className="bg-[#1A2A4A] rounded-xl p-6">
                <h2 className="text-white font-bold text-lg mb-4">📋 Eventos del Partido</h2>

                {match.matchEvents && match.matchEvents.length > 0 ? (
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
                ) : (
                    <p className="text-gray-400 text-center py-8">No hay eventos registrados para este partido.</p>
                )}

                <div className="mt-4 flex justify-end">
                    <Link
                        href={`/admin/matches/${match.id}/edit`}
                        className="bg-[#F5C518] text-[#0A1628] px-6 py-2 rounded-lg font-semibold hover:bg-[#e0b000] transition"
                    >
                        Editar Partido
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}