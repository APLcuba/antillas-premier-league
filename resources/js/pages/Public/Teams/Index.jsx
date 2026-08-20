import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';

export default function TeamsIndex({ teams }) {
    return (
        <PublicLayout title="Equipos - Antillas Premier League">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Equipos</h1>
                    <p className="text-gray-400 mt-2">
                        Conoce a los clubes que componen la Antillas Premier League
                    </p>
                </div>

                {/* Grid de equipos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {teams.length > 0 ? (
                        teams.map((team) => (
                            <Link
                                key={team.id}
                                href={`/equipos/${team.slug}`}
                                className="bg-[#1A2A4A] rounded-xl p-6 hover:bg-[#2A3A5A] transition group"
                            >
                                <div className="flex flex-col items-center text-center">
                                    {/* Escudo placeholder */}
                                    <div className="w-24 h-24 bg-[#0A1628] rounded-full flex items-center justify-center mb-4 group-hover:ring-2 group-hover:ring-[#F5C518] transition">
                                        <span className="text-3xl font-bold text-[#F5C518]">
                                            {team.name.charAt(0)}
                                        </span>
                                    </div>

                                    <h3 className="text-white font-semibold text-lg">{team.name}</h3>
                                    <p className="text-gray-400 text-sm">{team.city || 'Ciudad no especificada'}</p>

                                    {team.founded_year && (
                                        <span className="text-gray-500 text-xs mt-2">
                                            Fundado: {team.founded_year}
                                        </span>
                                    )}

                                    <div className="mt-4 flex gap-2">
                                        {team.primary_color && (
                                            <div
                                                className="w-6 h-6 rounded-full border border-gray-600"
                                                style={{ backgroundColor: team.primary_color }}
                                            />
                                        )}
                                        {team.secondary_color && (
                                            <div
                                                className="w-6 h-6 rounded-full border border-gray-600"
                                                style={{ backgroundColor: team.secondary_color }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-400">
                            No hay equipos registrados.
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}