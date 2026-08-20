import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';

export default function Index({ players }) {
    return (
        <AdminLayout title="Jugadores">
            <div className="bg-[#1A2A4A] rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">Jugadores</h1>
                    <Link
                        href="/admin/players/create"
                        className="bg-[#F5C518] text-[#0D1B3E] px-4 py-2 rounded-lg font-semibold hover:bg-[#e0b000] transition"
                    >
                        + Crear Jugador
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#0D1B3E]">
                            <tr>
                                <th className="px-4 py-3 text-left text-gray-300 text-sm">#</th>
                                <th className="px-4 py-3 text-left text-gray-300 text-sm">Nombre</th>
                                <th className="px-4 py-3 text-left text-gray-300 text-sm">Equipo</th>
                                <th className="px-4 py-3 text-left text-gray-300 text-sm">Posición</th>
                                <th className="px-4 py-3 text-left text-gray-300 text-sm">Dorsal</th>
                                <th className="px-4 py-3 text-left text-gray-300 text-sm">Estado</th>
                                <th className="px-4 py-3 text-left text-gray-300 text-sm">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player, index) => (
                                <tr key={player.id} className="border-b border-[#1A2F5A]">
                                    <td className="px-4 py-3 text-white">{index + 1}</td>
                                    <td className="px-4 py-3 text-white">
                                        {player.first_name} {player.last_name}
                                    </td>
                                    <td className="px-4 py-3 text-gray-300">
                                        {player.team?.name || 'Sin equipo'}
                                    </td>
                                    <td className="px-4 py-3 text-gray-300">
                                        {player.position || 'Sin posición'}
                                    </td>
                                    <td className="px-4 py-3 text-gray-300">
                                        {player.dorsal || 'N/A'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 text-xs rounded-full ${player.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {player.is_active ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/admin/players/${player.id}`}
                                                className="text-blue-400 hover:text-blue-300 text-sm"
                                            >
                                                Ver
                                            </Link>
                                            <Link
                                                href={`/admin/players/${player.id}/edit`}
                                                className="text-yellow-400 hover:text-yellow-300 text-sm"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`¿Estás seguro de eliminar a ${player.first_name} ${player.last_name}?`)) {
                                                        router.delete(`/admin/players/${player.id}`, {
                                                            onSuccess: () => {
                                                                // El jugador fue eliminado
                                                            },
                                                            onError: (errors) => {
                                                                alert('Error al eliminar el jugador: ' + (errors.message || 'Error desconocido'));
                                                            }
                                                        });
                                                    }
                                                }}
                                                className="text-red-400 hover:text-red-300 text-sm"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}