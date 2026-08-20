import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function NewsEdit({ news }) {
    const { data, setData, put, processing, errors } = useForm({
        title: news.title,
        content: news.content,
        excerpt: news.excerpt || '',
        category: news.category,
        image: news.image || '',
        is_published: news.is_published,
        published_at: news.published_at ? news.published_at.split('T')[0] : new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/news/${news.id}`);
    };

    const categories = [
        { value: 'noticias', label: '📰 Noticias' },
        { value: 'equipos', label: '👥 Equipos' },
        { value: 'fichajes', label: '🔄 Fichajes' },
        { value: 'calendario', label: '📅 Calendario' },
        { value: 'resultados', label: '📊 Resultados' },
        { value: 'comunicados', label: '📢 Comunicados' },
    ];

    return (
        <AdminLayout title={`Editar: ${news.title}`}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Editar Noticia</h1>
                <Link
                    href="/admin/news"
                    className="bg-[#1A2A4A] text-gray-300 px-4 py-2 rounded-lg hover:bg-[#2A3A5A] transition"
                >
                    ← Volver
                </Link>
            </div>

            <div className="bg-[#1A2A4A] rounded-xl p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Título */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-300 text-sm font-medium mb-2">Título *</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                required
                            />
                            {errors.title && <div className="text-red-400 text-sm mt-1">{errors.title}</div>}
                        </div>

                        {/* Categoría */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Categoría *</label>
                            <select
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                required
                            >
                                {categories.map((cat) => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                            {errors.category && <div className="text-red-400 text-sm mt-1">{errors.category}</div>}
                        </div>

                        {/* Publicado */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Fecha de Publicación</label>
                            <input
                                type="date"
                                value={data.published_at}
                                onChange={(e) => setData('published_at', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            />
                            {errors.published_at && <div className="text-red-400 text-sm mt-1">{errors.published_at}</div>}
                        </div>

                        {/* Imagen */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">URL de Imagen</label>
                            <input
                                type="text"
                                value={data.image}
                                onChange={(e) => setData('image', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            />
                            {errors.image && <div className="text-red-400 text-sm mt-1">{errors.image}</div>}
                        </div>

                        {/* Extracto */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-300 text-sm font-medium mb-2">Extracto (resumen)</label>
                            <textarea
                                value={data.excerpt}
                                onChange={(e) => setData('excerpt', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                rows="3"
                            />
                            {errors.excerpt && <div className="text-red-400 text-sm mt-1">{errors.excerpt}</div>}
                        </div>

                        {/* Contenido */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-300 text-sm font-medium mb-2">Contenido *</label>
                            <textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                rows="10"
                                required
                            />
                            {errors.content && <div className="text-red-400 text-sm mt-1">{errors.content}</div>}
                        </div>

                        {/* Publicar */}
                        <div>
                            <label className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                                <input
                                    type="checkbox"
                                    checked={data.is_published}
                                    onChange={(e) => setData('is_published', e.target.checked)}
                                    className="w-4 h-4 bg-[#0A1628] border border-[#2A3A5A] rounded focus:outline-none focus:border-[#F5C518]"
                                />
                                Publicado
                            </label>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#F5C518] text-[#0A1628] px-6 py-2 rounded-lg font-semibold hover:bg-[#e0b000] transition disabled:opacity-50"
                        >
                            {processing ? 'Actualizando...' : 'Actualizar Noticia'}
                        </button>
                        <Link
                            href="/admin/news"
                            className="bg-[#1A2A4A] text-gray-300 px-6 py-2 rounded-lg hover:bg-[#2A3A5A] transition"
                        >
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}