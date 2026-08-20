import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';
import CommentSection from '@/Components/CommentSection';

export default function NewsShow({ news, relatedNews, comments }) {
    const categoryLabels = {
        noticias: '📰 Noticias',
        equipos: '👥 Equipos',
        fichajes: '🔄 Fichajes',
        calendario: '📅 Calendario',
        resultados: '📊 Resultados',
        comunicados: '📢 Comunicados'
    };

    return (
        <PublicLayout title={`${news.title} - Antillas Premier League`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contenido principal */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#1A2A4A] rounded-xl overflow-hidden">
                            {news.image ? (
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-full h-64 md:h-80 object-cover"
                                />
                            ) : (
                                <div className="w-full h-64 md:h-80 bg-[#0A1628] flex items-center justify-center">
                                    <span className="text-8xl opacity-20">📰</span>
                                </div>
                            )}
                            <div className="p-6">
                                {/* Categoría y fecha */}
                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                    <span className="text-xs px-3 py-1 bg-[#0A1628] text-gray-300 rounded-full uppercase">
                                        {categoryLabels[news.category] || news.category}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {new Date(news.published_at).toLocaleDateString('es-ES', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </span>
                                    {news.author && (
                                        <span className="text-xs text-gray-500">
                                            Por {news.author.name}
                                        </span>
                                    )}
                                </div>

                                {/* Título */}
                                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                    {news.title}
                                </h1>

                                {/* Contenido */}
                                {news.excerpt && (
                                    <div className="text-gray-400 text-lg font-medium mb-4 border-l-4 border-[#F5C518] pl-4">
                                        {news.excerpt}
                                    </div>
                                )}

                                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                                    {news.content}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Noticias relacionadas */}
                    <div>
                        {relatedNews.length > 0 && (
                            <div className="bg-[#1A2A4A] rounded-xl p-6">
                                <h3 className="text-white font-semibold text-lg mb-4">
                                    📰 Noticias Relacionadas
                                </h3>
                                <div className="space-y-4">
                                    {relatedNews.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/noticias/${item.slug}`}
                                            className="block bg-[#0A1628] rounded-lg p-4 hover:bg-[#2A3A5A] transition"
                                        >
                                            <h4 className="text-white font-medium text-sm hover:text-[#F5C518] transition line-clamp-2">
                                                {item.title}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-xs text-gray-500">
                                                    {new Date(item.published_at).toLocaleDateString('es-ES')}
                                                </span>
                                                <span className="text-[10px] px-2 py-0.5 bg-[#1A2A4A] text-gray-400 rounded uppercase">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Volver a noticias */}
                        <Link
                            href="/noticias"
                            className="block mt-4 text-center bg-[#1A2A4A] rounded-xl p-4 text-gray-400 hover:text-[#F5C518] transition"
                        >
                            ← Ver todas las noticias
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <CommentSection 
                    commentableType="App\Models\News"
                    commentableId={news.id}
                    comments={comments || []}
                />
            </div>

        </PublicLayout>
    );
}