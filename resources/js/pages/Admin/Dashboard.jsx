import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminDashboard({ stats }) {
    const cards = [
        { label: 'Equipos', value: stats.teams, icon: '🏟️', color: 'border-blue-500' },
        { label: 'Jugadores', value: stats.players, icon: '⚽', color: 'border-green-500' },
        { label: 'Partidos', value: stats.matches, icon: '📅', color: 'border-yellow-500' },
        { label: 'Noticias', value: stats.news, icon: '📰', color: 'border-purple-500' },
    ];

    return (
        <AdminLayout title="Dashboard">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {cards.map((card) => (
                    <div
                        key={card.label}
                        className={`bg-[#1A2A4A] rounded-xl p-6 border-t-4 ${card.color}`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-3xl font-bold text-white">{card.value}</div>
                                <div className="text-gray-400 text-sm">{card.label}</div>
                            </div>
                            <span className="text-4xl">{card.icon}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Próximos Partidos */}
                <div className="bg-[#1A2A4A] rounded-xl p-6">
                    <h2 className="text-white font-bold text-lg mb-4">📅 Próximos Partidos</h2>
                    {stats.upcomingMatches && stats.upcomingMatches.length > 0 ? (
                        <div className="space-y-3">
                            {stats.upcomingMatches.map((match) => (
                                <div key={match.id} className="bg-[#0A1628] rounded-lg p-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-white">{match.home_team.name}</span>
                                        <span className="text-gray-500">vs</span>
                                        <span className="text-white">{match.away_team.name}</span>
                                    </div>
                                    <div className="text-center text-xs text-gray-500 mt-1">
                                        {new Date(match.scheduled_date).toLocaleDateString('es-ES')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-center py-4">No hay partidos programados</p>
                    )}
                </div>

                {/* Últimas Noticias */}
                <div className="bg-[#1A2A4A] rounded-xl p-6">
                    <h2 className="text-white font-bold text-lg mb-4">📰 Últimas Noticias</h2>
                    {stats.latestNews && stats.latestNews.length > 0 ? (
                        <div className="space-y-3">
                            {stats.latestNews.map((news) => (
                                <div key={news.id} className="bg-[#0A1628] rounded-lg p-3">
                                    <h3 className="text-white text-sm font-medium">{news.title}</h3>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {new Date(news.published_at).toLocaleDateString('es-ES')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-center py-4">No hay noticias</p>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}