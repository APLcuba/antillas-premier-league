import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import NotificationBell from '@/Components/NotificationBell';

export default function PublicLayout({ children, title }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { auth } = usePage().props;

    // Determinar la ruta activa
    const isActive = (path) => {
        if (path === '/' && window.location.pathname === '/') return true;
        if (path !== '/' && window.location.pathname.startsWith(path)) return true;
        return false;
    };

    const user = auth?.user;

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-[#0D1B3E] text-white flex flex-col">
                {/* HEADER */}
                <header className="bg-[#0D1B3E] border-b-4 border-[#E31837] sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
                                <img
                                    src="/images/liga/escudo.jpg"
                                    alt="Antillas Premier League"
                                    className="h-12 w-auto"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }}
                                />
                                <div className="hidden md:block">
                                    <span className="text-lg font-bold text-white whitespace-nowrap">
                                        Antillas Premier League
                                    </span>
                                    <div className="text-[10px] text-[#E31837] font-semibold tracking-wider text-center">FÚTBOL DE ÉLITE</div>
                                </div>
                                <span className="text-xs text-[#E31837] block md:hidden font-bold">APL</span>
                            </Link>

                            {/* NAVEGACIÓN PREMIUM - Desktop */}
                            <nav className="hidden lg:flex items-center space-x-1 bg-white/5 rounded-full px-2 py-1 border border-white/10">
                                <Link 
                                    href="/" 
                                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 
                                        ${isActive('/') 
                                            ? 'bg-[#F5C518] text-[#0D1B3E] shadow-lg shadow-[#F5C518]/30' 
                                            : 'text-white hover:bg-white/10 hover:text-[#F5C518]'
                                        }`}
                                >
                                    Inicio
                                </Link>
                                <Link 
                                    href="/equipos" 
                                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 
                                        ${isActive('/equipos') 
                                            ? 'bg-[#F5C518] text-[#0D1B3E] shadow-lg shadow-[#F5C518]/30' 
                                            : 'text-white hover:bg-white/10 hover:text-[#F5C518]'
                                        }`}
                                >
                                    Equipos
                                </Link>
                                <Link 
                                    href="/jugadores" 
                                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 
                                        ${isActive('/jugadores') 
                                            ? 'bg-[#F5C518] text-[#0D1B3E] shadow-lg shadow-[#F5C518]/30' 
                                            : 'text-white hover:bg-white/10 hover:text-[#F5C518]'
                                        }`}
                                >
                                    Jugadores
                                </Link>
                                <Link 
                                    href="/partidos" 
                                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 
                                        ${isActive('/partidos') 
                                            ? 'bg-[#F5C518] text-[#0D1B3E] shadow-lg shadow-[#F5C518]/30' 
                                            : 'text-white hover:bg-white/10 hover:text-[#F5C518]'
                                        }`}
                                >
                                    Partidos
                                </Link>
                                <Link 
                                    href="/tabla-posiciones" 
                                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 
                                        ${isActive('/tabla-posiciones') 
                                            ? 'bg-[#F5C518] text-[#0D1B3E] shadow-lg shadow-[#F5C518]/30' 
                                            : 'text-white hover:bg-white/10 hover:text-[#F5C518]'
                                        }`}
                                >
                                    Estadísticas
                                </Link>
                                <Link 
                                    href="/noticias" 
                                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 
                                        ${isActive('/noticias') 
                                            ? 'bg-[#F5C518] text-[#0D1B3E] shadow-lg shadow-[#F5C518]/30' 
                                            : 'text-white hover:bg-white/10 hover:text-[#F5C518]'
                                        }`}
                                >
                                    Noticias
                                </Link>
                                <Link 
                                    href="/patrocinadores" 
                                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 
                                        ${isActive('/patrocinadores') 
                                            ? 'bg-[#F5C518] text-[#0D1B3E] shadow-lg shadow-[#F5C518]/30' 
                                            : 'text-white hover:bg-white/10 hover:text-[#F5C518]'
                                        }`}
                                >
                                    Patrocinadores
                                </Link>
                                <Link 
                                    href="/reglamento" 
                                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 
                                        ${isActive('/reglamento') 
                                            ? 'bg-[#F5C518] text-[#0D1B3E] shadow-lg shadow-[#F5C518]/30' 
                                            : 'text-white hover:bg-white/10 hover:text-[#F5C518]'
                                        }`}
                                >
                                    Reglamento
                                </Link>
                            </nav>

                            {/* DERECHA - Botones + Campana + Menú móvil */}
                            <div className="flex items-center gap-2">
                                {/* Botones de autenticación - Desktop */}
                                {!user ? (
                                    <>
                                        <Link 
                                            href="/login" 
                                            className="hidden lg:block px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 text-white hover:bg-white/10 hover:text-[#F5C518]"
                                        >
                                            Iniciar Sesión
                                        </Link>
                                        <Link 
                                            href="/register" 
                                            className="hidden lg:block px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 bg-[#F5C518] text-[#0D1B3E] hover:bg-[#e0b000] shadow-lg shadow-[#F5C518]/30"
                                        >
                                            Registrarse
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link 
                                            href="/profile" 
                                            className="hidden lg:block px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 text-white hover:bg-white/10 hover:text-[#F5C518]"
                                        >
                                            Mi Perfil
                                        </Link>
                                        {/* Solo admin ve Panel Admin */}
                                        {user.role === 'admin' && (
                                            <Link 
                                                href="/admin" 
                                                className="hidden lg:block px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 text-[#F5C518] hover:text-[#e0b000]"
                                            >
                                                Panel Admin
                                            </Link>
                                        )}
                                        <Link 
                                            href={route('logout')} 
                                            method="post" 
                                            as="button"
                                            className="hidden lg:block px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 text-red-400 hover:bg-red-500/20"
                                        >
                                            Cerrar Sesión
                                        </Link>
                                    </>
                                )}

                                {/* 🔔 Campana de notificaciones */}
                                {user && <NotificationBell />}

                                {/* Botón menú móvil */}
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="lg:hidden text-white hover:text-[#E31837] transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="lg:hidden bg-[#0D1B3E] border-t border-[#E31837]">
                            <div className="px-4 py-4 space-y-1">
                                <Link 
                                    href="/" 
                                    className={`block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300
                                        ${isActive('/') 
                                            ? 'bg-[#F5C518] text-[#0D1B3E]' 
                                            : 'text-white hover:bg-white/10 hover:text-[#F5C518]'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Inicio
                                </Link>
                                <Link 
                                    href="/equipos" 
                                    className={`block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300
                                        ${isActive('/equipos') 
                                            ? 'bg-[#F5C518] text-[#0D1B3E]' 
                                            : 'text-white hover:bg-white/10 hover:text-[#F5C518]'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Equipos
                                </Link>
                                <Link 
                                    href="/jugadores" 
                                    className={`block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300
                                        ${isActive('/jugadores') 
                                            ? 'bg-[#F5C518] text-[#0D1B3E]' 
                                            : 'text-white hover:bg-white/10 hover:text-[#F5C518]'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Jugadores
                                </Link>
                                <Link 
                                    href="/partidos" 
                                    className={`block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300
                                        ${isActive('/partidos') 
                                            ? 'bg-[#F5C518] text-[#0D1B3E]' 
                                            : 'text-white hover:bg-white/10 hover:text-[#F5C518]'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Partidos
                                </Link>
                                <Link 
                                    href="/tabla-posiciones" 
                                    className={`block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300
                                        ${isActive('/tabla-posiciones') 
                                            ? 'bg-[#F5C518] text-[#0D1B3E]' 
                                            : 'text-white hover:bg-white/10 hover:text-[#F5C518]'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Estadísticas
                                </Link>
                                <Link 
                                    href="/noticias" 
                                    className={`block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300
                                        ${isActive('/noticias') 
                                            ? 'bg-[#F5C518] text-[#0D1B3E]' 
                                            : 'text-white hover:bg-white/10 hover:text-[#F5C518]'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Noticias
                                </Link>
                                <Link 
                                    href="/patrocinadores" 
                                    className={`block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300
                                        ${isActive('/patrocinadores') 
                                            ? 'bg-[#F5C518] text-[#0D1B3E]' 
                                            : 'text-white hover:bg-white/10 hover:text-[#F5C518]'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Patrocinadores
                                </Link>
                                <Link 
                                    href="/reglamento" 
                                    className={`block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300
                                        ${isActive('/reglamento') 
                                            ? 'bg-[#F5C518] text-[#0D1B3E]' 
                                            : 'text-white hover:bg-white/10 hover:text-[#F5C518]'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Reglamento
                                </Link>

                                {/* Separador */}
                                <div className="border-t border-[#1A2F5A] pt-3 mt-2"></div>

                                {/* Autenticación móvil */}
                                {!user ? (
                                    <>
                                        <Link 
                                            href="/login" 
                                            className="block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 text-white hover:bg-white/10"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Iniciar Sesión
                                        </Link>
                                        <Link 
                                            href="/register" 
                                            className="block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 bg-[#F5C518] text-[#0D1B3E] hover:bg-[#e0b000]"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Registrarse
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link 
                                            href="/profile" 
                                            className="block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 text-white hover:bg-white/10"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Mi Perfil
                                        </Link>
                                        {/* Solo admin ve Panel Admin en móvil */}
                                        {user.role === 'admin' && (
                                            <Link 
                                                href="/admin" 
                                                className="block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 text-[#F5C518]"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Panel Admin
                                            </Link>
                                        )}
                                        <Link 
                                            href={route('logout')} 
                                            method="post" 
                                            as="button"
                                            className="block w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 text-red-400 hover:bg-red-500/20"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Cerrar Sesión
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </header>

                {/* MAIN CONTENT */}
                <main className="flex-1">
                    {children}
                </main>

                {/* FOOTER */}
                <footer className="bg-[#0D1B3E] border-t-4 border-[#E31837] py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <img
                                        src="/images/liga/escudo.jpg"
                                        alt="Antillas Premier League"
                                        className="h-10 w-auto"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                    <h3 className="text-white font-bold text-lg">Antillas Premier League</h3>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    La nueva liga de fútbol profesional de Cuba. Fútbol de alta calidad en el Caribe.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li><Link href="/equipos" className="hover:text-[#E31837] transition">Equipos</Link></li>
                                    <li><Link href="/jugadores" className="hover:text-[#E31837] transition">Jugadores</Link></li>
                                    <li><Link href="/partidos" className="hover:text-[#E31837] transition">Partidos</Link></li>
                                    <li><Link href="/tabla-posiciones" className="hover:text-[#E31837] transition">Estadísticas</Link></li>
                                    <li><Link href="/patrocinadores" className="hover:text-[#E31837] transition">Patrocinadores</Link></li>
                                    <li><Link href="/reglamento" className="hover:text-[#E31837] transition">Reglamento</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-white font-semibold mb-4">Noticias</h4>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li><Link href="/noticias" className="hover:text-[#E31837] transition">Últimas Noticias</Link></li>
                                    <li><Link href="/noticias?categoria=fichajes" className="hover:text-[#E31837] transition">Fichajes</Link></li>
                                    <li><Link href="/noticias?categoria=calendario" className="hover:text-[#E31837] transition">Calendario</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-white font-semibold mb-4">Síguenos</h4>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-gray-400 hover:text-[#E31837] transition">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-[#E31837] transition">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.715-12.355c0-.213-.006-.426-.018-.637A9.935 9.935 0 0024 4.557z"/>
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-[#E31837] transition">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.297 3.434 9.793 8.186 11.382.599.111.793-.26.793-.577v-2.183c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112.017 6c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386C24.005 5.367 18.638.011 12.017.011z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-[#E31837] mt-8 pt-8 text-center text-gray-500 text-sm">
                            &copy; {new Date().getFullYear()} Antillas Premier League. Todos los derechos reservados.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}