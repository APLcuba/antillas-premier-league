import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';

export default function MatchesIndex({ matches }) {
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

    return (
        <AdminLayout title="Partidos">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Partidos</h1>
                <Link
                    href="/admin/matches/create"
                    className="bg-[#F5C518] text-[#0A1628] px-4 py-2 rounded-lg font-semibold hover:bg-[#e0b000] transition"
                >
                    + Crear Partido
                </Link>
            </div>

            {matches.length > 0 ? (
                <div className="bg-[#1A2A4A] rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-[#0A1628] text-gray-400 text-sm">
                                    <th className="px-6 py-3 text-left">ID</th>
                                    <th className="px-6 py-3 text-left">Local</th>
                                    <th className="px-6 py-3 text-left">Resultado</th>
                                    <th className="px-6 py-3 text-left">Visitante</th>
                                    <th className="px-6 py-3 text-left">Fecha</th>
                                    <th className="px-6 py-3 text-left">Estado</th>
                                    <th className="px-6 py-3 text-left">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matches.map((match) => (
                                    <tr key={match.id} className="border-t border-[#0A1628] hover:bg-[#2A3A5A] transition">
                                        <td className="px-6 py-3 text-white">{match.id}</td>
                                        <td className="px-6 py-3 text-white">{match.home_team?.name || 'N/A'}</td>
                                        <td className="px-6 py-3 text-[#F5C518] font-bold">
                                            {match.status === 'finished' ? `${match.home_score} - ${match.away_score}` : '-'}
                                        </td>
                                        <td className="px-6 py-3 text-white">{match.away_team?.name || 'N/A'}</td>
                                        <td className="px-6 py-3 text-gray-300">
                                            {new Date(match.scheduled_date).toLocaleDateString('es-ES')}
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[match.status] || 'bg-gray-600/30 text-gray-400'}`}>
                                                {statusLabels[match.status] || match.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/admin/matches/${match.id}`}
                                                    className="text-green-400 hover:text-green-300 transition text-sm"
                                                >
                                                    Ver
                                                </Link>
                                                <span className="text-gray-600">|</span>
                                                <Link
                                                    href={`/admin/matches/${match.id}/edit`}
                                                    className="text-blue-400 hover:text-blue-300 transition text-sm"
                                                >
                                                    Editar
                                                </Link>
                                                <span className="text-gray-600">|</span>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('¿Seguro que quieres eliminar este partido?')) {
                                                            // Usar Inertia delete
                                                            window.location.href = `/admin/matches/${match.id}`;
                                                        }
                                                    }}
                                                    className="text-red-400 hover:text-red-300 transition text-sm"
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
            ) : (
                <div className="bg-[#1A2A4A] rounded-xl p-12 text-center text-gray-400">
                    No hay partidos registrados. ¡Crea el primero!
                </div>
            )}
        </AdminLayout>
    );
}