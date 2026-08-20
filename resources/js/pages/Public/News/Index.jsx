import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';

export default function NewsIndex({ news, categories, currentCategory }) {
    return (
        <PublicLayout title="Noticias - Antillas Premier League">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Noticias</h1>
                    <p className="text-gray-400 mt-2">
                        Mantente informado sobre la Antillas Premier League
                    </p>
                </div>

                {/* Categorías */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <Link
                        href="/noticias"
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            !currentCategory
                                ? 'bg-[#F5C518] text-[#0A1628]'
                                : 'bg-[#1A2A4A] text-gray-300 hover:bg-[#2A3A5A]'
                        }`}
                    >
                        Todas
                    </Link>
                    {categories.map((category) => {
                        const labels = {
                            noticias: '📰 Noticias',
                            equipos: '👥 Equipos',
                            fichajes: '🔄 Fichajes',
                            calendario: '📅 Calendario',
                            resultados: '📊 Resultados',
                            comunicados: '📢 Comunicados'
                        };
                        return (
                            <Link
                                key={category}
                                href={`/noticias?category=${category}`}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    currentCategory === category
                                        ? 'bg-[#F5C518] text-[#0A1628]'
                                        : 'bg-[#1A2A4A] text-gray-300 hover:bg-[#2A3A5A]'
                                }`}
                            >
                                {labels[category] || category}
                            </Link>
                        );
                    })}
                </div>

                {/* Grid de noticias */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.data && news.data.length > 0 ? (
                        news.data.map((item) => (
                            <Link
                                key={item.id}
                                href={`/noticias/${item.slug}`}
                                className="bg-[#1A2A4A] rounded-xl overflow-hidden hover:bg-[#2A3A5A] transition group"
                            >
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-48 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-[#0A1628] flex items-center justify-center">
                                        <span className="text-6xl opacity-20">📰</span>
                                    </div>
                                )}
                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs px-2 py-0.5 bg-[#0A1628] text-gray-400 rounded uppercase">
                                            {item.category}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(item.published_at).toLocaleDateString('es-ES', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#F5C518] transition line-clamp-2">
                                        {item.title}
                                    </h3>
                                    {item.excerpt && (
                                        <p className="text-gray-400 text-sm line-clamp-3">
                                            {item.excerpt}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-400">
                            No hay noticias disponibles.
                        </div>
                    )}
                </div>

                {/* Paginación */}
                {news.links && news.links.length > 3 && (
                    <div className="mt-8 flex justify-center">
                        <div className="flex gap-2">
                            {news.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-lg text-sm transition ${
                                        link.active
                                            ? 'bg-[#F5C518] text-[#0A1628]'
                                            : link.url
                                            ? 'bg-[#1A2A4A] text-gray-300 hover:bg-[#2A3A5A]'
                                            : 'text-gray-600 cursor-default'
                                    }`}
                                    dangerouslySetInnerHTML={link.url ? { __html: link.label } : undefined}
                                >
                                    {!link.url && link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}