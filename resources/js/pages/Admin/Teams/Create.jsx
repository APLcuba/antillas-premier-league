import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function TeamsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        city: '',
        founded_year: '',
        primary_color: '#000000',
        secondary_color: '#FFFFFF',
        history: '',
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/teams');
    };

    return (
        <AdminLayout title="Crear Equipo">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Crear Equipo</h1>
                <Link
                    href="/admin/teams"
                    className="bg-[#1A2A4A] text-gray-300 px-4 py-2 rounded-lg hover:bg-[#2A3A5A] transition"
                >
                    ← Volver
                </Link>
            </div>

            <div className="bg-[#1A2A4A] rounded-xl p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Nombre del Equipo *</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                placeholder="Ej: Real Santiago"
                                required
                            />
                            {errors.name && <div className="text-red-400 text-sm mt-1">{errors.name}</div>}
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Ciudad</label>
                            <input
                                type="text"
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                placeholder="Ej: La Habana"
                            />
                            {errors.city && <div className="text-red-400 text-sm mt-1">{errors.city}</div>}
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Año de Fundación</label>
                            <input
                                type="number"
                                value={data.founded_year}
                                onChange={(e) => setData('founded_year', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                placeholder="Ej: 1995"
                                min="1800"
                                max={new Date().getFullYear()}
                            />
                            {errors.founded_year && <div className="text-red-400 text-sm mt-1">{errors.founded_year}</div>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Color Principal</label>
                                <input
                                    type="color"
                                    value={data.primary_color}
                                    onChange={(e) => setData('primary_color', e.target.value)}
                                    className="w-full bg-[#0A1628] border border-[#2A3A5A] rounded-lg p-1 h-12 focus:outline-none focus:border-[#F5C518]"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Color Secundario</label>
                                <input
                                    type="color"
                                    value={data.secondary_color}
                                    onChange={(e) => setData('secondary_color', e.target.value)}
                                    className="w-full bg-[#0A1628] border border-[#2A3A5A] rounded-lg p-1 h-12 focus:outline-none focus:border-[#F5C518]"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-gray-300 text-sm font-medium mb-2">Historia</label>
                            <textarea
                                value={data.history}
                                onChange={(e) => setData('history', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                rows="4"
                                placeholder="Historia del equipo..."
                            />
                            {errors.history && <div className="text-red-400 text-sm mt-1">{errors.history}</div>}
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="w-4 h-4 bg-[#0A1628] border border-[#2A3A5A] rounded focus:outline-none focus:border-[#F5C518]"
                                />
                                Activo
                            </label>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#F5C518] text-[#0A1628] px-6 py-2 rounded-lg font-semibold hover:bg-[#e0b000] transition disabled:opacity-50"
                        >
                            {processing ? 'Guardando...' : 'Crear Equipo'}
                        </button>
                        <Link
                            href="/admin/teams"
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