import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function PlayersEdit({ player, teams }) {
    const { data, setData, put, processing, errors } = useForm({
        first_name: player.first_name,
        last_name: player.last_name,
        team_id: player.team_id || '',
        dorsal: player.dorsal || '',
        position: player.position || '',
        date_of_birth: player.date_of_birth || '',
        nationality: player.nationality || '',
        height: player.height || '',
        weight: player.weight || '',
        biography: player.biography || '',
        is_active: player.is_active,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/players/${player.id}`);
    };

    const positionLabels = {
        GK: 'Portero',
        DF: 'Defensa',
        MF: 'Mediocampista',
        FW: 'Delantero'
    };

    return (
        <AdminLayout title={`Editar: ${player.first_name} ${player.last_name}`}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">
                    Editar Jugador: {player.first_name} {player.last_name}
                </h1>
                <Link
                    href="/admin/players"
                    className="bg-[#1A2A4A] text-gray-300 px-4 py-2 rounded-lg hover:bg-[#2A3A5A] transition"
                >
                    ← Volver
                </Link>
            </div>

            <div className="bg-[#1A2A4A] rounded-xl p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nombre */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Nombre *</label>
                            <input
                                type="text"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                required
                            />
                            {errors.first_name && <div className="text-red-400 text-sm mt-1">{errors.first_name}</div>}
                        </div>

                        {/* Apellido */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Apellido *</label>
                            <input
                                type="text"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                required
                            />
                            {errors.last_name && <div className="text-red-400 text-sm mt-1">{errors.last_name}</div>}
                        </div>

                        {/* Equipo */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Equipo</label>
                            <select
                                value={data.team_id}
                                onChange={(e) => setData('team_id', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            >
                                <option value="">Sin equipo</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                            </select>
                            {errors.team_id && <div className="text-red-400 text-sm mt-1">{errors.team_id}</div>}
                        </div>

                        {/* Dorsal */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Dorsal</label>
                            <input
                                type="number"
                                value={data.dorsal}
                                onChange={(e) => setData('dorsal', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                min="1"
                                max="99"
                            />
                            {errors.dorsal && <div className="text-red-400 text-sm mt-1">{errors.dorsal}</div>}
                        </div>

                        {/* Posición */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Posición</label>
                            <select
                                value={data.position}
                                onChange={(e) => setData('position', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            >
                                <option value="">Seleccionar</option>
                                {Object.entries(positionLabels).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                            {errors.position && <div className="text-red-400 text-sm mt-1">{errors.position}</div>}
                        </div>

                        {/* Fecha de Nacimiento */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Fecha de Nacimiento</label>
                            <input
                                type="date"
                                value={data.date_of_birth}
                                onChange={(e) => setData('date_of_birth', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            />
                            {errors.date_of_birth && <div className="text-red-400 text-sm mt-1">{errors.date_of_birth}</div>}
                        </div>

                        {/* Nacionalidad */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Nacionalidad</label>
                            <input
                                type="text"
                                value={data.nationality}
                                onChange={(e) => setData('nationality', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            />
                            {errors.nationality && <div className="text-red-400 text-sm mt-1">{errors.nationality}</div>}
                        </div>

                        {/* Altura */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Altura (cm)</label>
                            <input
                                type="number"
                                value={data.height}
                                onChange={(e) => setData('height', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                min="100"
                                max="250"
                            />
                            {errors.height && <div className="text-red-400 text-sm mt-1">{errors.height}</div>}
                        </div>

                        {/* Peso */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Peso (kg)</label>
                            <input
                                type="number"
                                value={data.weight}
                                onChange={(e) => setData('weight', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                min="30"
                                max="200"
                            />
                            {errors.weight && <div className="text-red-400 text-sm mt-1">{errors.weight}</div>}
                        </div>

                        {/* Biografía */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-300 text-sm font-medium mb-2">Biografía</label>
                            <textarea
                                value={data.biography}
                                onChange={(e) => setData('biography', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                rows="4"
                            />
                            {errors.biography && <div className="text-red-400 text-sm mt-1">{errors.biography}</div>}
                        </div>

                        {/* Activo */}
                        <div>
                            <label className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="w-4 h-4 bg-[#0A1628] border border-[#2A3A5A] rounded focus:outline-none focus:border-[#F5C518]"
                                />
                                Activo
                            </label>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#F5C518] text-[#0A1628] px-6 py-2 rounded-lg font-semibold hover:bg-[#e0b000] transition disabled:opacity-50"
                        >
                            {processing ? 'Actualizando...' : 'Actualizar Jugador'}
                        </button>
                        <Link
                            href="/admin/players"
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