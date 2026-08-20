import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';

export default function Show({ player }) {
    const positions = {
        GK: 'Portero',
        DF: 'Defensa',
        MF: 'Mediocampista',
        FW: 'Delantero'
    };

    return (
        <AdminLayout title={`${player.first_name} ${player.last_name}`}>
            <div className="bg-[#1A2A4A] rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">
                        {player.first_name} {player.last_name}
                    </h1>
                    <div className="flex gap-2">
                        <Link
                            href={`/admin/players/${player.id}/edit`}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                        >
                            Editar
                        </Link>
                        <Link
                            href="/admin/players"
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                        >
                            ← Volver
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Información Personal */}
                    <div className="bg-[#0D1B3E] rounded-lg p-4">
                        <h2 className="text-white font-semibold text-lg mb-4">Información Personal</h2>
                        <div className="space-y-2">
                            <p className="text-gray-300">
                                <span className="text-gray-500">Nombre completo:</span> {player.first_name} {player.last_name}
                            </p>
                            <p className="text-gray-300">
                                <span className="text-gray-500">Fecha de nacimiento:</span> {player.date_of_birth || 'No especificada'}
                            </p>
                            <p className="text-gray-300">
                                <span className="text-gray-500">Nacionalidad:</span> {player.nationality || 'No especificada'}
                            </p>
                            <p className="text-gray-300">
                                <span className="text-gray-500">Altura:</span> {player.height ? `${player.height} cm` : 'No especificada'}
                            </p>
                            <p className="text-gray-300">
                                <span className="text-gray-500">Peso:</span> {player.weight ? `${player.weight} kg` : 'No especificado'}
                            </p>
                            <p className="text-gray-300">
                                <span className="text-gray-500">Estado:</span>
                                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${player.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {player.is_active ? 'Activo' : 'Inactivo'}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Información Deportiva */}
                    <div className="bg-[#0D1B3E] rounded-lg p-4">
                        <h2 className="text-white font-semibold text-lg mb-4">Información Deportiva</h2>
                        <div className="space-y-2">
                            <p className="text-gray-300">
                                <span className="text-gray-500">Equipo:</span> {player.team?.name || 'Sin equipo'}
                            </p>
                            <p className="text-gray-300">
                                <span className="text-gray-500">Dorsal:</span> {player.dorsal || 'No asignado'}
                            </p>
                            <p className="text-gray-300">
                                <span className="text-gray-500">Posición:</span> {positions[player.position] || player.position || 'No especificada'}
                            </p>
                        </div>
                    </div>

                    {/* Biografía */}
                    {player.biography && (
                        <div className="col-span-2 bg-[#0D1B3E] rounded-lg p-4">
                            <h2 className="text-white font-semibold text-lg mb-4">Biografía</h2>
                            <p className="text-gray-300 whitespace-pre-line">{player.biography}</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}