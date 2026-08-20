import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';

export default function Home({ standings, upcomingMatches, latestNews }) {
    return (
        <PublicLayout title="Antillas Premier League">
            {/* HERO BANNER */}
            <section className="relative bg-gradient-to-r from-[#0D1B3E] via-[#E31837] to-[#0D1B3E] py-20 border-b-4 border-[#E31837]">
                <div className="absolute inset-0 opacity-10">
                    <img
                        src="/images/liga/banner.jpg"
                        alt="Antillas Premier League"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-8 md:mb-0 text-center md:text-left">
                            <img
                                src="/images/liga/escudo.jpg"
                                alt="Antillas Premier League"
                                className="h-24 w-auto mx-auto md:mx-0 mb-4"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Antillas <span className="text-[#F5C518]">Premier League</span>
                            </h1>
                            <p className="text-gray-200 text-lg max-w-xl">
                                La nueva era del fútbol cubano. Pasión, talento y emoción en el Caribe.
                            </p>
                            <div className="mt-6 flex gap-4 justify-center md:justify-start">
                                <Link
                                    href="/tabla-posiciones"
                                    className="bg-[#F5C518] text-[#0D1B3E] px-6 py-3 rounded-lg font-semibold hover:bg-[#e0b000] transition shadow-lg"
                                >
                                    Ver Tabla
                                </Link>
                                <Link
                                    href="/partidos"
                                    className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
                                >
                                    Calendario
                                </Link>
                            </div>
                        </div>
                        <div className="text-center">
                            <img
                                src="/images/liga/escudo.jpg"
                                alt="APL"
                                className="h-28 w-auto mx-auto mb-2"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <span className="text-gray-200 text-sm">Temporada 2026-2027</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 📣 BANNER DE PATROCINIO - LLAMATIVO */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link
                    href="/patrocinadores"
                    className="block relative overflow-hidden rounded-xl bg-gradient-to-r from-[#E31837] via-[#F5C518] to-[#E31837] p-8 hover:scale-[1.01] transition-transform duration-300 shadow-xl shadow-[#E31837]/20 group"
                >
                    {/* Fondo decorativo */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                <span className="text-4xl animate-pulse">🔥</span>
                                <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full text-white">
                                    Oportunidad Única
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                ¡Conviértete en <span className="text-[#0D1B3E]">Patrocinador</span> de la APL!
                            </h2>
                            <p className="text-white/90 text-sm md:text-base max-w-xl mx-auto md:mx-0">
                                Sé parte de la nueva era del fútbol cubano. Lleva tu marca al siguiente nivel con la Antillas Premier League.
                            </p>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3">
                                <span className="flex items-center gap-1 text-white/80 text-xs">
                                    <span className="text-[#F5C518]">✓</span> Visibilidad Masiva
                                </span>
                                <span className="flex items-center gap-1 text-white/80 text-xs">
                                    <span className="text-[#F5C518]">✓</span> Asociación Estratégica
                                </span>
                                <span className="flex items-center gap-1 text-white/80 text-xs">
                                    <span className="text-[#F5C518]">✓</span> Prestigio y Reconocimiento
                                </span>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <span className="inline-flex items-center gap-2 bg-[#0D1B3E] text-white px-6 py-3 rounded-full font-bold hover:bg-[#1A2F5A] transition group-hover:shadow-lg group-hover:shadow-[#F5C518]/30">
                                Conoce más
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Resto del contenido */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* TABLA DE POSICIONES */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#162550] rounded-xl overflow-hidden border border-[#E31837] shadow-xl">
                            <div className="p-6 bg-gradient-to-r from-[#0D1B3E] to-[#162550]">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span className="text-[#F5C518]">🏆</span> Tabla de Posiciones
                                </h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-[#E31837] text-white text-sm">
                                            <th className="px-4 py-3 text-left">#</th>
                                            <th className="px-4 py-3 text-left">Equipo</th>
                                            <th className="px-4 py-3 text-center">PJ</th>
                                            <th className="px-4 py-3 text-center">G</th>
                                            <th className="px-4 py-3 text-center">E</th>
                                            <th className="px-4 py-3 text-center">P</th>
                                            <th className="px-4 py-3 text-center">GF</th>
                                            <th className="px-4 py-3 text-center">GC</th>
                                            <th className="px-4 py-3 text-center">DG</th>
                                            <th className="px-4 py-3 text-center font-bold text-[#F5C518]">PTS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {standings && standings.length > 0 ? (
                                            standings.map((standing, index) => (
                                                <tr key={standing.id} className="border-t border-[#1A2F5A] hover:bg-[#1A2F5A] transition">
                                                    <td className="px-4 py-3 text-white font-semibold">{index + 1}</td>
                                                    <td className="px-4 py-3">
                                                        <Link href={`/equipos/${standing.team.slug}`} className="flex items-center gap-3 text-white hover:text-[#E31837] transition">
                                                            <div className="w-8 h-8 bg-[#0D1B3E] rounded-full flex items-center justify-center text-xs font-bold text-[#F5C518]">
                                                                {standing.team.name.charAt(0)}
                                                            </div>
                                                            {standing.team.name}
                                                        </Link>
                                                    </td>
                                                    <td className="px-4 py-3 text-center text-white">{standing.matches_played}</td>
                                                    <td className="px-4 py-3 text-center text-green-400">{standing.wins}</td>
                                                    <td className="px-4 py-3 text-center text-yellow-400">{standing.draws}</td>
                                                    <td className="px-4 py-3 text-center text-red-400">{standing.losses}</td>
                                                    <td className="px-4 py-3 text-center text-white">{standing.goals_for}</td>
                                                    <td className="px-4 py-3 text-center text-white">{standing.goals_against}</td>
                                                    <td className="px-4 py-3 text-center text-white">{standing.goal_difference}</td>
                                                    <td className="px-4 py-3 text-center font-bold text-[#F5C518] text-lg">{standing.points}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="10" className="px-4 py-8 text-center text-gray-400">
                                                    No hay datos disponibles. Los partidos comenzarán pronto.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* PRÓXIMOS PARTIDOS Y NOTICIAS */}
                    <div className="space-y-8">
                        {/* Próximos Partidos */}
                        <div className="bg-[#162550] rounded-xl p-6 border border-[#E31837] shadow-xl">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                                <span className="text-[#F5C518]">⚽</span> Próximos Partidos
                            </h2>
                            {upcomingMatches && upcomingMatches.length > 0 ? (
                                <div className="space-y-3">
                                    {upcomingMatches.map((match) => (
                                        <Link
                                            key={match.id}
                                            href={`/partidos/${match.id}`}
                                            className="block bg-[#0D1B3E] rounded-lg p-4 hover:bg-[#1A2F5A] transition border border-[#1A2F5A]"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-white font-medium text-sm">{match.home_team.name}</span>
                                                <span className="text-gray-400 text-xs">vs</span>
                                                <span className="text-white font-medium text-sm">{match.away_team.name}</span>
                                            </div>
                                            <div className="flex justify-between mt-2 text-xs text-gray-400">
                                                <span>{new Date(match.scheduled_date).toLocaleDateString('es-ES')}</span>
                                                <span>{match.scheduled_time ? match.scheduled_time.substring(0, 5) : '--:--'}</span>
                                                <span className="px-2 py-0.5 bg-yellow-600/30 text-yellow-400 rounded text-xs">Programado</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-center py-4">No hay partidos programados.</p>
                            )}
                            <Link
                                href="/partidos"
                                className="block text-center mt-4 text-[#E31837] hover:underline text-sm font-medium"
                            >
                                Ver todos los partidos →
                            </Link>
                        </div>

                        {/* Últimas Noticias */}
                        <div className="bg-[#162550] rounded-xl p-6 border border-[#E31837] shadow-xl">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                                <span className="text-[#F5C518]">📰</span> Últimas Noticias
                            </h2>
                            {latestNews && latestNews.length > 0 ? (
                                <div className="space-y-3">
                                    {latestNews.slice(0, 3).map((news) => (
                                        <Link
                                            key={news.id}
                                            href={`/noticias/${news.slug}`}
                                            className="block bg-[#0D1B3E] rounded-lg p-4 hover:bg-[#1A2F5A] transition border border-[#1A2F5A]"
                                        >
                                            <h3 className="text-white font-medium text-sm line-clamp-2">{news.title}</h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-xs text-gray-500">
                                                    {new Date(news.published_at).toLocaleDateString('es-ES')}
                                                </span>
                                                <span className="text-[10px] px-2 py-0.5 bg-[#1A2F5A] text-gray-400 rounded uppercase">
                                                    {news.category}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-center py-4">No hay noticias disponibles.</p>
                            )}
                            <Link
                                href="/noticias"
                                className="block text-center mt-4 text-[#E31837] hover:underline text-sm font-medium"
                            >
                                Ver todas las noticias →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}