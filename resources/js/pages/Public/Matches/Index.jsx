import PublicLayout from '@/Layouts/PublicLayout';
import { Link, useForm } from '@inertiajs/react';

export default function MatchesIndex({ matches, teams, seasons, statuses, filters }) {
    const { data, setData, get } = useForm({
        status: filters.status || '',
        team: filters.team || '',
        season: filters.season || '',
        date_from: filters.date_from || '',
        date_to: filters.date_to || '',
    });

    const handleFilter = (e) => {
        e.preventDefault();
        get('/partidos', { preserveState: true });
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
        <PublicLayout title="Partidos - Antillas Premier League">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Partidos</h1>
                    <p className="text-gray-400 mt-2">
                        Calendario completo de la Antillas Premier League
                    </p>
                </div>

                {/* Filtros */}
                <form onSubmit={handleFilter} className="bg-[#1A2A4A] rounded-xl p-4 mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Temporada</label>
                            <select
                                value={data.season}
                                onChange={(e) => setData('season', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            >
                                {seasons.map((season) => (
                                    <option key={season.id} value={season.id}>{season.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Estado</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            >
                                <option value="">Todos</option>
                                {Object.entries(statuses).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Equipo</label>
                            <select
                                value={data.team}
                                onChange={(e) => setData('team', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            >
                                <option value="">Todos</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Desde</label>
                            <input
                                type="date"
                                value={data.date_from}
                                onChange={(e) => setData('date_from', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Hasta</label>
                            <input
                                type="date"
                                value={data.date_to}
                                onChange={(e) => setData('date_to', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="bg-[#F5C518] text-[#0A1628] px-6 py-2 rounded-lg font-semibold hover:bg-[#e0b000] transition"
                        >
                            Filtrar
                        </button>
                    </div>
                </form>

                {/* Listado de partidos */}
                <div className="space-y-4">
                    {matches.length > 0 ? (
                        matches.map((match) => (
                            <Link
                                key={match.id}
                                href={`/partidos/${match.id}`}
                                className="block bg-[#1A2A4A] rounded-xl p-4 hover:bg-[#2A3A5A] transition"
                            >
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    {/* Fecha y hora */}
                                    <div className="text-center md:text-left min-w-[120px]">
                                        <div className="text-white font-semibold">
                                            {new Date(match.scheduled_date).toLocaleDateString('es-ES', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            {match.scheduled_time ? match.scheduled_time.substring(0, 5) : '--:--'}
                                        </div>
                                    </div>

                                    {/* Equipos y resultado */}
                                    <div className="flex items-center gap-3 flex-1 justify-center">
                                        <div className="text-right">
                                            <div className="text-white font-medium">{match.home_team.name}</div>
                                            <div className="text-gray-400 text-xs">Local</div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="text-[#F5C518] font-bold text-xl">
                                                {match.status === 'finished' ? match.home_score : '-'}
                                            </span>
                                            <span className="text-gray-500 font-bold">vs</span>
                                            <span className="text-[#F5C518] font-bold text-xl">
                                                {match.status === 'finished' ? match.away_score : '-'}
                                            </span>
                                        </div>

                                        <div className="text-left">
                                            <div className="text-white font-medium">{match.away_team.name}</div>
                                            <div className="text-gray-400 text-xs">Visitante</div>
                                        </div>
                                    </div>

                                    {/* Estado y estadio */}
                                    <div className="text-right min-w-[120px]">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[match.status] || 'bg-gray-600/30 text-gray-400'}`}>
                                            {statusLabels[match.status] || match.status}
                                        </span>
                                        {match.stadium && (
                                            <div className="text-gray-400 text-xs mt-1">🏟️ {match.stadium.name}</div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-400">
                            No hay partidos que coincidan con los filtros.
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}