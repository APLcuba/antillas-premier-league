import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function MatchesCreate({ teams, seasons, stadiums }) {
    const { data, setData, post, processing, errors } = useForm({
        season_id: seasons.length > 0 ? seasons[0].id : '',
        home_team_id: '',
        away_team_id: '',
        stadium_id: '',
        scheduled_date: '',
        scheduled_time: '',
        status: 'scheduled',
        home_score: 0,
        away_score: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/matches');
    };

    const statusOptions = [
        { value: 'scheduled', label: 'Programado' },
        { value: 'live', label: 'En Vivo' },
        { value: 'finished', label: 'Finalizado' },
        { value: 'postponed', label: 'Aplazado' },
        { value: 'cancelled', label: 'Cancelado' },
    ];

    return (
        <AdminLayout title="Crear Partido">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Crear Partido</h1>
                <Link
                    href="/admin/matches"
                    className="bg-[#1A2A4A] text-gray-300 px-4 py-2 rounded-lg hover:bg-[#2A3A5A] transition"
                >
                    ← Volver
                </Link>
            </div>

            <div className="bg-[#1A2A4A] rounded-xl p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Temporada */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Temporada *</label>
                            <select
                                value={data.season_id}
                                onChange={(e) => setData('season_id', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                required
                            >
                                <option value="">Seleccionar temporada</option>
                                {seasons.map((season) => (
                                    <option key={season.id} value={season.id}>{season.name}</option>
                                ))}
                            </select>
                            {errors.season_id && <div className="text-red-400 text-sm mt-1">{errors.season_id}</div>}
                        </div>

                        {/* Estado */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Estado *</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                required
                            >
                                {statusOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            {errors.status && <div className="text-red-400 text-sm mt-1">{errors.status}</div>}
                        </div>

                        {/* Equipo Local */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Equipo Local *</label>
                            <select
                                value={data.home_team_id}
                                onChange={(e) => setData('home_team_id', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                required
                            >
                                <option value="">Seleccionar equipo</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                            </select>
                            {errors.home_team_id && <div className="text-red-400 text-sm mt-1">{errors.home_team_id}</div>}
                        </div>

                        {/* Equipo Visitante */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Equipo Visitante *</label>
                            <select
                                value={data.away_team_id}
                                onChange={(e) => setData('away_team_id', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                required
                            >
                                <option value="">Seleccionar equipo</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                            </select>
                            {errors.away_team_id && <div className="text-red-400 text-sm mt-1">{errors.away_team_id}</div>}
                        </div>

                        {/* Estadio */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Estadio</label>
                            <select
                                value={data.stadium_id}
                                onChange={(e) => setData('stadium_id', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            >
                                <option value="">Sin estadio</option>
                                {stadiums.map((stadium) => (
                                    <option key={stadium.id} value={stadium.id}>{stadium.name}</option>
                                ))}
                            </select>
                            {errors.stadium_id && <div className="text-red-400 text-sm mt-1">{errors.stadium_id}</div>}
                        </div>

                        {/* Fecha */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Fecha *</label>
                            <input
                                type="date"
                                value={data.scheduled_date}
                                onChange={(e) => setData('scheduled_date', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                required
                            />
                            {errors.scheduled_date && <div className="text-red-400 text-sm mt-1">{errors.scheduled_date}</div>}
                        </div>

                        {/* Hora */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Hora</label>
                            <input
                                type="time"
                                value={data.scheduled_time}
                                onChange={(e) => setData('scheduled_time', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            />
                            {errors.scheduled_time && <div className="text-red-400 text-sm mt-1">{errors.scheduled_time}</div>}
                        </div>

                        {/* Goles Local */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Goles Local</label>
                            <input
                                type="number"
                                value={data.home_score}
                                onChange={(e) => setData('home_score', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                min="0"
                            />
                            {errors.home_score && <div className="text-red-400 text-sm mt-1">{errors.home_score}</div>}
                        </div>

                        {/* Goles Visitante */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Goles Visitante</label>
                            <input
                                type="number"
                                value={data.away_score}
                                onChange={(e) => setData('away_score', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                min="0"
                            />
                            {errors.away_score && <div className="text-red-400 text-sm mt-1">{errors.away_score}</div>}
                        </div>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#F5C518] text-[#0A1628] px-6 py-2 rounded-lg font-semibold hover:bg-[#e0b000] transition disabled:opacity-50"
                        >
                            {processing ? 'Guardando...' : 'Crear Partido'}
                        </button>
                        <Link
                            href="/admin/matches"
                            className="bg-[#1A2A4A] text-gray-300 px-6 py-2 rounded-lg hover:bg-[#2A3A5A] transition"
                        >
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}