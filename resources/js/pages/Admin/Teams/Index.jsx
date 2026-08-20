import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';

export default function TeamsIndex({ teams }) {
    return (
        <AdminLayout title="Equipos">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Equipos</h1>
                <Link
                    href="/admin/teams/create"
                    className="bg-[#F5C518] text-[#0A1628] px-4 py-2 rounded-lg font-semibold hover:bg-[#e0b000] transition"
                >
                    + Crear Equipo
                </Link>
            </div>

            {/* Listado */}
            {teams.length > 0 ? (
                <div className="bg-[#1A2A4A] rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[#0A1628] text-gray-400 text-sm">
                                <th className="px-6 py-3 text-left">ID</th>
                                <th className="px-6 py-3 text-left">Nombre</th>
                                <th className="px-6 py-3 text-left">Ciudad</th>
                                <th className="px-6 py-3 text-left">Año</th>
                                <th className="px-6 py-3 text-left">Estado</th>
                                <th className="px-6 py-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team) => (
                                <tr key={team.id} className="border-t border-[#0A1628] hover:bg-[#2A3A5A] transition">
                                    <td className="px-6 py-3 text-white">{team.id}</td>
                                    <td className="px-6 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-[#0A1628] rounded-full flex items-center justify-center text-xs font-bold text-[#F5C518]">
                                                {team.name.charAt(0)}
                                            </div>
                                            <span className="text-white">{team.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-gray-300">{team.city || '-'}</td>
                                    <td className="px-6 py-3 text-gray-300">{team.founded_year || '-'}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${team.is_active ? 'bg-green-600/30 text-green-400' : 'bg-red-600/30 text-red-400'}`}>
                                            {team.is_active ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/admin/teams/${team.id}/edit`}
                                                className="text-blue-400 hover:text-blue-300 transition text-sm"
                                            >
                                                Editar
                                            </Link>
                                            <span className="text-gray-600">|</span>
                                            <button
                                                onClick={() => {
                                                    if (confirm('¿Seguro que quieres eliminar este equipo?')) {
                                                        window.location.href = `/admin/teams/${team.id}`;
                                                        // Usar Inertia delete
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
            ) : (
                <div className="bg-[#1A2A4A] rounded-xl p-12 text-center text-gray-400">
                    No hay equipos registrados. ¡Crea el primero!
                </div>
            )}
        </AdminLayout>
    );
}