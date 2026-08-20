import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';

export default function Sponsors() {
    return (
        <PublicLayout title="Patrocinadores - Antillas Premier League">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        🏆 <span className="text-[#F5C518]">Conviértete en Patrocinador</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        La Antillas Premier League está buscando socios estratégicos para construir la nueva era del fútbol cubano.
                    </p>
                </div>

                {/* Beneficios */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-[#162550] rounded-xl p-6 border border-[#E31837] text-center hover:shadow-xl transition">
                        <div className="text-4xl mb-3">📈</div>
                        <h3 className="text-white font-bold text-lg mb-2">Visibilidad Masiva</h3>
                        <p className="text-gray-400 text-sm">
                            Tu marca será vista por miles de aficionados en toda Cuba y el Caribe.
                        </p>
                    </div>
                    <div className="bg-[#162550] rounded-xl p-6 border border-[#E31837] text-center hover:shadow-xl transition">
                        <div className="text-4xl mb-3">🤝</div>
                        <h3 className="text-white font-bold text-lg mb-2">Asociación Estratégica</h3>
                        <p className="text-gray-400 text-sm">
                            Forma parte del crecimiento del fútbol cubano y su proyección internacional.
                        </p>
                    </div>
                    <div className="bg-[#162550] rounded-xl p-6 border border-[#E31837] text-center hover:shadow-xl transition">
                        <div className="text-4xl mb-3">🏅</div>
                        <h3 className="text-white font-bold text-lg mb-2">Prestigio y Reconocimiento</h3>
                        <p className="text-gray-400 text-sm">
                            Asocia tu marca a valores como excelencia, pasión y espíritu deportivo.
                        </p>
                    </div>
                </div>

                {/* Planes de Patrocinio */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white text-center mb-8">
                        📋 Planes de Patrocinio
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Plan Bronce */}
                        <div className="bg-[#162550] rounded-xl p-6 border border-[#E31837] hover:shadow-xl transition">
                            <div className="text-center">
                                <div className="text-3xl mb-2">🥉</div>
                                <h3 className="text-[#F5C518] font-bold text-xl">Bronce</h3>
                                <div className="text-2xl font-bold text-white my-3">$1,000 USD</div>
                                <ul className="text-sm text-gray-400 space-y-2 text-left">
                                    <li>✓ Logo en sitio web</li>
                                    <li>✓ Mención en redes sociales</li>
                                    <li>✓ Publicidad en transmisiones</li>
                                </ul>
                                <button className="mt-4 w-full bg-[#E31837] text-white py-2 rounded-lg font-semibold hover:bg-[#c0102e] transition">
                                    Contactar
                                </button>
                            </div>
                        </div>

                        {/* Plan Plata */}
                        <div className="bg-[#162550] rounded-xl p-6 border-2 border-[#F5C518] hover:shadow-xl transition relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F5C518] text-[#0D1B3E] px-4 py-1 rounded-full text-xs font-bold">
                                RECOMENDADO
                            </div>
                            <div className="text-center">
                                <div className="text-3xl mb-2">🥈</div>
                                <h3 className="text-[#F5C518] font-bold text-xl">Plata</h3>
                                <div className="text-2xl font-bold text-white my-3">$2,500 USD</div>
                                <ul className="text-sm text-gray-400 space-y-2 text-left">
                                    <li>✓ Todo lo del plan Bronce</li>
                                    <li>✓ Logo en camisetas de un equipo</li>
                                    <li>✓ Entrevistas y menciones</li>
                                    <li>✓ Zona VIP en partidos</li>
                                </ul>
                                <button className="mt-4 w-full bg-[#F5C518] text-[#0D1B3E] py-2 rounded-lg font-semibold hover:bg-[#e0b000] transition">
                                    Contactar
                                </button>
                            </div>
                        </div>

                        {/* Plan Oro */}
                        <div className="bg-[#162550] rounded-xl p-6 border border-[#E31837] hover:shadow-xl transition">
                            <div className="text-center">
                                <div className="text-3xl mb-2">🥇</div>
                                <h3 className="text-[#F5C518] font-bold text-xl">Oro</h3>
                                <div className="text-2xl font-bold text-white my-3">$5,000 USD</div>
                                <ul className="text-sm text-gray-400 space-y-2 text-left">
                                    <li>✓ Todo lo del plan Plata</li>
                                    <li>✓ Patrocinador principal de la liga</li>
                                    <li>✓ Logo en todas las camisetas</li>
                                    <li>✓ Naming de un torneo</li>
                                    <li>✓ Exclusividad de categoría</li>
                                </ul>
                                <button className="mt-4 w-full bg-[#E31837] text-white py-2 rounded-lg font-semibold hover:bg-[#c0102e] transition">
                                    Contactar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contacto */}
                <div className="bg-[#162550] rounded-xl p-8 border border-[#E31837]">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white">📧 ¿Interesado en patrocinar la APL?</h2>
                            <p className="text-gray-400 mt-1">
                                Contáctanos y te enviaremos un paquete completo de patrocinio.
                            </p>
                        </div>
                        <a
                            href="mailto:patrocinadores@antillaspremierleague.com"
                            className="bg-[#F5C518] text-[#0D1B3E] px-8 py-3 rounded-lg font-bold hover:bg-[#e0b000] transition whitespace-nowrap"
                        >
                            Contactar ahora
                        </a>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}