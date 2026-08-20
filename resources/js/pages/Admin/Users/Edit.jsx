import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function UsersEdit({ user, teams }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        favorite_team_id: user.favorite_team_id || '',
        role: user.role,
        is_active: user.is_active,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    return (
        <AdminLayout title={`Editar Usuario: ${user.name} ${user.last_name}`}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">
                    Editar Usuario: {user.name} {user.last_name}
                </h1>
                <Link
                    href="/admin/users"
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
                                className="w-full bg-[#0A1628] text-white border border-[#1A2F5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                required
                            />
                            {errors.name && <div className="text-red-400 text-sm mt-1">{errors.name}</div>}
                        </div>

                        {/* Apellidos */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Apellidos *</label>
                            <input
                                type="text"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#1A2F5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                required
                            />
                            {errors.last_name && <div className="text-red-400 text-sm mt-1">{errors.last_name}</div>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Email *</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#1A2F5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                                required
                            />
                            {errors.email && <div className="text-red-400 text-sm mt-1">{errors.email}</div>}
                        </div>

                        {/* Equipo Favorito */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">⚽ Equipo Favorito</label>
                            <select
                                value={data.favorite_team_id}
                                onChange={(e) => setData('favorite_team_id', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#1A2F5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            >
                                <option value="">Ninguno</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                            {errors.favorite_team_id && <div className="text-red-400 text-sm mt-1">{errors.favorite_team_id}</div>}
                        </div>

                        {/* Rol */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Rol</label>
                            <select
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="w-full bg-[#0A1628] text-white border border-[#1A2F5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            >
                                <option value="user">Usuario</option>
                                <option value="admin">Administrador</option>
                            </select>
                            {errors.role && <div className="text-red-400 text-sm mt-1">{errors.role}</div>}
                        </div>

                        {/* Estado */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Estado</label>
                            <select
                                value={data.is_active ? '1' : '0'}
                                onChange={(e) => setData('is_active', e.target.value === '1')}
                                className="w-full bg-[#0A1628] text-white border border-[#1A2F5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                            >
                                <option value="1">Activo</option>
                                <option value="0">Bloqueado</option>
                            </select>
                            {errors.is_active && <div className="text-red-400 text-sm mt-1">{errors.is_active}</div>}
                        </div>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#F5C518] text-[#0A1628] px-6 py-2 rounded-lg font-semibold hover:bg-[#e0b000] transition disabled:opacity-50"
                        >
                            {processing ? 'Guardando...' : 'Actualizar Usuario'}
                        </button>
                        <Link
                            href="/admin/users"
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