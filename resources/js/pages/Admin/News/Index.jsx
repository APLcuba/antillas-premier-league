import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';

export default function NewsIndex({ news }) {
    const categoryLabels = {
        noticias: '📰 Noticias',
        equipos: '👥 Equipos',
        fichajes: '🔄 Fichajes',
        calendario: '📅 Calendario',
        resultados: '📊 Resultados',
        comunicados: '📢 Comunicados'
    };

    return (
        <AdminLayout title="Noticias">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Noticias</h1>
                <Link
                    href="/admin/news/create"
                    className="bg-[#F5C518] text-[#0A1628] px-4 py-2 rounded-lg font-semibold hover:bg-[#e0b000] transition"
                >
                    + Crear Noticia
                </Link>
            </div>

            {news && news.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {news.map((item) => (
                        <div key={item.id} className="bg-[#1A2A4A] rounded-xl p-4 hover:bg-[#2A3A5A] transition">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h3 className="text-white font-semibold">{item.title}</h3>
                                        <span className="text-xs px-2 py-0.5 bg-[#0A1628] text-gray-400 rounded">
                                            {categoryLabels[item.category] || item.category}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-400 flex-wrap">
                                        <span>
                                            {new Date(item.published_at).toLocaleDateString('es-ES')}
                                        </span>
                                        {item.author && (
                                            <span>Por {item.author.name}</span>
                                        )}
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.is_published ? 'bg-green-600/30 text-green-400' : 'bg-red-600/30 text-red-400'}`}>
                                            {item.is_published ? 'Publicada' : 'Borrador'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={`/admin/news/${item.id}/edit`}
                                        className="text-blue-400 hover:text-blue-300 transition text-sm"
                                    >
                                        Editar
                                    </Link>
                                    <span className="text-gray-600">|</span>
                                    <button
                                        onClick={() => {
                                            if (confirm('¿Seguro que quieres eliminar esta noticia?')) {
                                                // Usar fetch para eliminar
                                                fetch(`/admin/news/${item.id}`, {
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
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-[#1A2A4A] rounded-xl p-12 text-center text-gray-400">
                    No hay noticias registradas. ¡Crea la primera!
                </div>
            )}
        </AdminLayout>
    );
}