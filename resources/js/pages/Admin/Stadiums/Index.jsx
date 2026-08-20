import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';

export default function StadiumsIndex({ stadiums }) {
    return (
        <AdminLayout title="Estadios">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Estadios</h1>
                <Link
                    href="/admin/stadiums/create"
                    className="bg-[#F5C518] text-[#0A1628] px-4 py-2 rounded-lg font-semibold hover:bg-[#e0b000] transition"
                >
                    + Crear Estadio
                </Link>
            </div>

            {stadiums && stadiums.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stadiums.map((stadium) => (
                        <div key={stadium.id} className="bg-[#1A2A4A] rounded-xl p-6 hover:bg-[#2A3A5A] transition">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-white font-semibold text-lg">{stadium.name}</h3>
                                    {stadium.location && (
                                        <p className="text-gray-400 text-sm">📍 {stadium.location}</p>
                                    )}
                                    {stadium.capacity && (
                                        <p className="text-gray-400 text-sm">🏟️ Capacidad: {stadium.capacity.toLocaleString()}</p>
                                    )}
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <Link
                                    href={`/admin/stadiums/${stadium.id}/edit`}
                                    className="text-blue-400 hover:text-blue-300 transition text-sm"
                                >
                                    Editar
                                </Link>
                                <span className="text-gray-600">|</span>
                                <button
                                    onClick={() => {
                                        if (confirm('¿Seguro que quieres eliminar este estadio?')) {
                                            fetch(`/admin/stadiums/${stadium.id}`, {
                                                method: 'DELETE',
                                                headers: {
                                                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                                                },
                                            }).then(() => {
                                                window.location.reload();
                                            });
                                        }
                                    }}
                                    className="text-red-400 hover:text-red-300 transition text-sm"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-[#1A2A4A] rounded-xl p-12 text-center text-gray-400">
                    No hay estadios registrados. ¡Crea el primero!
                </div>
            )}
        </AdminLayout>
    );
}