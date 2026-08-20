import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';

export default function UsersShow({ user }) {
    return (
        <AdminLayout title={`Usuario: ${user.name} ${user.last_name}`}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">
                    👤 {user.name} {user.last_name}
                </h1>
                <Link
                    href="/admin/users"
                    className="bg-[#1A2A4A] text-gray-300 px-4 py-2 rounded-lg hover:bg-[#2A3A5A] transition"
                >
                    ← Volver
                </Link>
            </div>

            <div className="bg-[#1A2A4A] rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-gray-400 text-sm">Nombre completo</p>
                        <p className="text-white text-lg font-semibold">{user.name} {user.last_name}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white text-lg">{user.email}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Rol</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin' 
                                ? 'bg-[#F5C518]/20 text-[#F5C518]' 
                                : 'bg-gray-600/30 text-gray-400'
                        }`}>
                            {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                        </span>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Estado</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.is_active 
                                ? 'bg-green-600/30 text-green-400' 
                                : 'bg-red-600/30 text-red-400'
                        }`}>
                            {user.is_active ? 'Activo' : 'Bloqueado'}
                        </span>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Equipo Favorito</p>
                        <p className="text-white">{user.favorite_team?.name || 'Ninguno'}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Email verificado</p>
                        <p className="text-white">{user.email_verified_at ? '✅ Sí' : '❌ No'}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Registrado</p>
                        <p className="text-white">{new Date(user.created_at).toLocaleDateString('es-ES')}</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}