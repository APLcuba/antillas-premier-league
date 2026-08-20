import PublicLayout from '@/Layouts/PublicLayout';
import { Link, useForm } from '@inertiajs/react';

export default function PlayersIndex({ players, teams, positions, filters }) {
    const { data, setData, get } = useForm({
        team: filters.team || '',
        position: filters.position || '',
    });

    const handleFilter = (e) => {
        e.preventDefault();
        get('/jugadores', { preserveState: true });
    };

    return (
        <PublicLayout title="Jugadores - Antillas Premier League">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Jugadores</h1>
                    <p className="text-gray-400 mt-2">
                        Conoce a los futbolistas de la Antillas Premier League
                    </p>
                </div>

                {/* Filtros */}
                <form onSubmit={handleFilter} className="bg-[#1A2A4A] rounded-xl p-4 mb-8">
                    <div className="flex flex-wrap items-end gap-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Equipo</label>
                            <select
                                value={data.team}
                                onChange={(e) => setData('team', e.target.value)}
                                className="bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            >
                                <option value="">Todos</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Posición</label>
                            <select
                                value={data.position}
                                onChange={(e) => setData('position', e.target.value)}
                                className="bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            >
                                <option value="">Todas</option>
                                {Object.entries(positions).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="bg-[#F5C518] text-[#0A1628] px-6 py-2 rounded-lg font-semibold hover:bg-[#e0b000] transition"
                        >
                            Filtrar
                        </button>
                    </div>
                </form>

                {/* Grid de jugadores */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {players.length > 0 ? (
                        players.map((player) => (
                            <Link
                                key={player.id}
                                href={`/jugadores/${player.id}`}
                                className="bg-[#1A2A4A] rounded-xl p-6 hover:bg-[#2A3A5A] transition group"
                            >
                                <div className="flex flex-col items-center text-center">
                                    {/* Foto placeholder */}
                                    <div className="w-20 h-20 bg-[#0A1628] rounded-full flex items-center justify-center mb-3 group-hover:ring-2 group-hover:ring-[#F5C518] transition">
                                        <span className="text-2xl font-bold text-[#F5C518]">
                                            {player.first_name.charAt(0)}{player.last_name.charAt(0)}
                                        </span>
                                    </div>

                                    <h3 className="text-white font-semibold">
                                        {player.first_name} {player.last_name}
                                    </h3>

                                    {player.dorsal && (
                                        <span className="text-[#F5C518] text-sm font-bold">#{player.dorsal}</span>
                                    )}

                                    <div className="flex items-center gap-2 mt-1">
                                        {player.position && (
                                            <span className="text-xs px-2 py-0.5 bg-[#0A1628] text-gray-300 rounded">
                                                {positions[player.position] || player.position}
                                            </span>
                                        )}
                                        {player.team && (
                                            <span className="text-xs text-gray-500">
                                                {player.team.name}
                                            </span>
                                        )}
                                    </div>

                                    {player.nationality && (
                                        <span className="text-gray-400 text-xs mt-2">
                                            🇨🇺 {player.nationality}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-400">
                            No hay jugadores que coincidan con los filtros.
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}