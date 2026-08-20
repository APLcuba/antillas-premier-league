import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function StadiumsEdit({ stadium }) {
    const { data, setData, put, processing, errors } = useForm({
        name: stadium.name,
        capacity: stadium.capacity || '',
        location: stadium.location || '',
        image_path: stadium.image_path || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/stadiums/${stadium.id}`);
    };

    return (
        <AdminLayout title={`Editar: ${stadium.name}`}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Editar Estadio: {stadium.name}</h1>
                <Link
                    href="/admin/stadiums"
                    className="bg-[#1A2A4A] text-gray-300 px-4 py-2 rounded-lg hover:bg-[#2A3A5A] transition"
                >
                    ← Volver
                </Link>
            </div>

            <div className="bg-[#1A2A4A] rounded-xl p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nombre */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Nombre *</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                required
                            />
                            {errors.name && <div className="text-red-400 text-sm mt-1">{errors.name}</div>}
                        </div>

                        {/* Capacidad */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Capacidad</label>
                            <input
                                type="number"
                                value={data.capacity}
                                onChange={(e) => setData('capacity', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                min="100"
                            />
                            {errors.capacity && <div className="text-red-400 text-sm mt-1">{errors.capacity}</div>}
                        </div>

                        {/* Ubicación */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Ubicación</label>
                            <input
                                type="text"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            />
                            {errors.location && <div className="text-red-400 text-sm mt-1">{errors.location}</div>}
                        </div>

                        {/* Imagen */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">URL de Imagen</label>
                            <input
                                type="text"
                                value={data.image_path}
                                onChange={(e) => setData('image_path', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#2A3A5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            />
                            {errors.image_path && <div className="text-red-400 text-sm mt-1">{errors.image_path}</div>}
                        </div>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#F5C518] text-[#0A1628] px-6 py-2 rounded-lg font-semibold hover:bg-[#e0b000] transition disabled:opacity-50"
                        >
                            {processing ? 'Actualizando...' : 'Actualizar Estadio'}
                        </button>
                        <Link
                            href="/admin/stadiums"
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