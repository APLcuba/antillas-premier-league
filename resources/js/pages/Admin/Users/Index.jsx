import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';

export default function UsersIndex({ users }) {
    return (
        <AdminLayout title="Usuarios">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">👥 Usuarios</h1>
                <span className="text-sm text-gray-400">
                    Total: {users.length} usuarios
                </span>
            </div>

            {users && users.length > 0 ? (
                <div className="bg-[#1A2A4A] rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-[#0A1628] text-gray-400 text-sm">
                                    <th className="px-6 py-3 text-left">ID</th>
                                    <th className="px-6 py-3 text-left">Nombre</th>
                                    <th className="px-6 py-3 text-left">Email</th>
                                    <th className="px-6 py-3 text-left">Rol</th>
                                    <th className="px-6 py-3 text-left">Estado</th>
                                    <th className="px-6 py-3 text-left">Equipo Favorito</th>
                                    <th className="px-6 py-3 text-left">Verificado</th>
                                    <th className="px-6 py-3 text-left">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-t border-[#1A2F5A] hover:bg-[#1A2F5A] transition">
                                        <td className="px-6 py-3 text-white">{user.id}</td>
                                        <td className="px-6 py-3 text-white">
                                            {user.name} {user.last_name}
                                        </td>
                                        <td className="px-6 py-3 text-gray-300">{user.email}</td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                user.role === 'admin' 
                                                    ? 'bg-[#F5C518]/20 text-[#F5C518]' 
                                                    : 'bg-gray-600/30 text-gray-400'
                                            }`}>
                                                {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                user.is_active 
                                                    ? 'bg-green-600/30 text-green-400' 
                                                    : 'bg-red-600/30 text-red-400'
                                            }`}>
                                                {user.is_active ? 'Activo' : 'Bloqueado'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-gray-300">
                                            {user.favorite_team?.name || 'Ninguno'}
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                user.email_verified_at 
                                                    ? 'bg-green-600/30 text-green-400' 
                                                    : 'bg-yellow-600/30 text-yellow-400'
                                            }`}>
                                                {user.email_verified_at ? '✅ Verificado' : '⏳ Pendiente'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/admin/users/${user.id}/edit`}
                                                    className="text-blue-400 hover:text-blue-300 transition text-sm"
                                                >
                                                    Editar
                                                </Link>
                                                {user.id !== 1 && (
                                                    <>
                                                        <span className="text-gray-600">|</span>
                                                        <Link
                                                            href={`/admin/users/${user.id}`}
                                                            method="delete"
                                                            as="button"
                                                            className="text-red-400 hover:text-red-300 transition text-sm"
                                                            onClick={(e) => {
                                                                if (!confirm('¿Seguro que quieres eliminar este usuario?')) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                        >
                                                            Eliminar
                                                        </Link>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-[#1A2A4A] rounded-xl p-12 text-center text-gray-400">
                    No hay usuarios registrados.
                </div>
            )}
        </AdminLayout>
    );
}