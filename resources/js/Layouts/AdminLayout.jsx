import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function AdminLayout({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth } = usePage().props;
    const user = auth?.user;
    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: '📊' },
        { name: 'Equipos', href: '/admin/teams', icon: '🏟️' },
        { name: 'Jugadores', href: '/admin/players', icon: '⚽' },
        { name: 'Partidos', href: '/admin/matches', icon: '📅' },
        { name: 'Noticias', href: '/admin/news', icon: '📰' },
        { name: 'Estadios', href: '/admin/stadiums', icon: '🏗️' },
        { name: 'Usuarios', href: '/admin/users', icon: '👥' },
    ];
    
    // Verificar que sea admin
    if (!user || user.role !== 'admin') {
        // Redirigir al home
        window.location.href = '/';
        return null;
    }

    return (
        <>
            <Head title={`${title} - Admin APL`} />
            
            <div className="min-h-screen bg-[#0D1B3E]">
                {/* Sidebar - Desktop */}
                <aside className="fixed left-0 top-0 h-full w-64 bg-[#0D1B3E] border-r border-[#E31837] hidden lg:block">
                    <div className="flex flex-col h-full">
                        <div className="p-6 border-b border-[#E31837]">
                            <Link href="/admin" className="flex items-center gap-3">
                                <img
                                    src="/images/liga/escudo.jpg"
                                    alt="APL"
                                    className="h-10 w-auto"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                                <div>
                                    <span className="text-white font-bold text-lg">Admin APL</span>
                                    <span className="block text-gray-300 text-xs">Panel de Control</span>
                                </div>
                            </Link>
                        </div>

                        <nav className="flex-1 p-4 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#E31837] hover:text-white transition group"
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            ))}
                        </nav>

                        <div className="p-4 border-t border-[#E31837]">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-[#E31837] hover:text-white transition"
                            >
                                <span className="text-xl">🚪</span>
                                <span className="font-medium">Cerrar Sesión</span>
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="lg:ml-64">
                    <header className="bg-[#0D1B3E] border-b border-[#E31837] px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="lg:hidden text-gray-300 hover:text-white"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                                <h1 className="text-xl font-bold text-white">{title}</h1>
                            </div>
                            <Link href="/" className="text-gray-300 hover:text-[#F5C518] transition text-sm" target="_blank">
                                Ver Sitio
                            </Link>
                        </div>
                    </header>

                    <main className="p-6">{children}</main>
                </div>

                {/* Mobile Sidebar */}
                {sidebarOpen && (
                    <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
                )}
                <aside className={`fixed left-0 top-0 h-full w-64 bg-[#0D1B3E] border-r border-[#E31837] z-50 transform transition-transform duration-300 lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex flex-col h-full">
                        <div className="p-6 border-b border-[#E31837] flex justify-between items-center">
                            <Link href="/admin" className="flex items-center gap-3">
                                <img
                                    src="/images/liga/escudo.jpg"
                                    alt="APL"
                                    className="h-10 w-auto"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                                <span className="text-white font-bold text-lg">Admin APL</span>
                            </Link>
                            <button onClick={() => setSidebarOpen(false)} className="text-gray-300 hover:text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <nav className="flex-1 p-4 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#E31837] hover:text-white transition"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            ))}
                        </nav>

                        <div className="p-4 border-t border-[#E31837]">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-[#E31837] hover:text-white transition"
                            >
                                <span className="text-xl">🚪</span>
                                <span className="font-medium">Cerrar Sesión</span>
                            </Link>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
}