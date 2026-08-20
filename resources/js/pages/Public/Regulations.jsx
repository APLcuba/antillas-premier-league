import PublicLayout from '@/Layouts/PublicLayout';

export default function Regulations() {
    return (
        <PublicLayout title="Reglamento - Antillas Premier League">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        📋 <span className="text-[#F5C518]">Reglamento Oficial</span>
                    </h1>
                    <p className="text-gray-400">
                        Antillas Premier League - Temporada 2026-2027
                    </p>
                </div>

                {/* Contenido */}
                <div className="space-y-6">
                    {/* Artículo 1 */}
                    <div className="bg-[#162550] rounded-xl p-6 border border-[#E31837]">
                        <h2 className="text-xl font-bold text-[#F5C518] mb-3">Artículo 1: Organización</h2>
                        <p className="text-gray-300 leading-relaxed">
                            La Antillas Premier League (APL) es una competición de fútbol profesional organizada por la Liga Cubana de Fútbol. La liga se rige por las normas establecidas en el presente reglamento y por las disposiciones de la Federación Cubana de Fútbol.
                        </p>
                    </div>

                    {/* Artículo 2 */}
                    <div className="bg-[#162550] rounded-xl p-6 border border-[#E31837]">
                        <h2 className="text-xl font-bold text-[#F5C518] mb-3">Artículo 2: Participantes</h2>
                        <p className="text-gray-300 leading-relaxed">
                            La liga estará compuesta por equipos profesionales de toda Cuba. Cada equipo deberá cumplir con los requisitos de inscripción establecidos por la organización, incluyendo capacidad de estadio, plantilla mínima de 18 jugadores y solvencia financiera.
                        </p>
                    </div>

                    {/* Artículo 3 */}
                    <div className="bg-[#162550] rounded-xl p-6 border border-[#E31837]">
                        <h2 className="text-xl font-bold text-[#F5C518] mb-3">Artículo 3: Sistema de Competición</h2>
                        <ul className="text-gray-300 leading-relaxed space-y-2 list-disc list-inside">
                            <li>La liga se disputa bajo el sistema de todos contra todos a dos vueltas (local y visitante).</li>
                            <li>Se otorgan 3 puntos por victoria, 1 punto por empate y 0 puntos por derrota.</li>
                            <li>El equipo con mayor número de puntos al final de la temporada será el campeón.</li>
                            <li>En caso de empate a puntos, se aplicarán los siguientes criterios de desempate:
                                <ul className="list-disc list-inside ml-6 mt-1 text-gray-400">
                                    <li>Diferencia de goles</li>
                                    <li>Goles a favor</li>
                                    <li>Resultados entre los equipos empatados</li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    {/* Artículo 4 */}
                    <div className="bg-[#162550] rounded-xl p-6 border border-[#E31837]">
                        <h2 className="text-xl font-bold text-[#F5C518] mb-3">Artículo 4: Duración de los Partidos</h2>
                        <ul className="text-gray-300 leading-relaxed space-y-2 list-disc list-inside">
                            <li>Cada partido tendrá una duración de 90 minutos, divididos en dos tiempos de 45 minutos.</li>
                            <li>Se concederá un tiempo de descanso de 15 minutos entre ambos tiempos.</li>
                            <li>El árbitro añadirá el tiempo de descuento que considere necesario.</li>
                        </ul>
                    </div>

                    {/* Artículo 5 */}
                    <div className="bg-[#162550] rounded-xl p-6 border border-[#E31837]">
                        <h2 className="text-xl font-bold text-[#F5C518] mb-3">Artículo 5: Plantillas y Alineaciones</h2>
                        <ul className="text-gray-300 leading-relaxed space-y-2 list-disc list-inside">
                            <li>Cada equipo podrá inscribir hasta 25 jugadores en su plantilla.</li>
                            <li>Al menos 3 jugadores de la plantilla deberán ser formados en cantera.</li>
                            <li>En cada partido se podrán alinear 11 jugadores titulares y 5 suplentes.</li>
                            <li>Se permiten hasta 3 cambios por partido.</li>
                        </ul>
                    </div>

                    {/* Artículo 6 */}
                    <div className="bg-[#162550] rounded-xl p-6 border border-[#E31837]">
                        <h2 className="text-xl font-bold text-[#F5C518] mb-3">Artículo 6: Sanciones</h2>
                        <ul className="text-gray-300 leading-relaxed space-y-2 list-disc list-inside">
                            <li>Tarjeta amarilla: amonestación al jugador.</li>
                            <li>Dos tarjetas amarillas en el mismo partido equivalen a una tarjeta roja.</li>
                            <li>Tarjeta roja: expulsión automática y suspensión de al menos 1 partido.</li>
                            <li>Acumulación de 5 tarjetas amarillas: suspensión de 1 partido.</li>
                            <li>Sanciones económicas por conducta antideportiva.</li>
                        </ul>
                    </div>

                    {/* Artículo 7 */}
                    <div className="bg-[#162550] rounded-xl p-6 border border-[#E31837]">
                        <h2 className="text-xl font-bold text-[#F5C518] mb-3">Artículo 7: Estadios y Seguridad</h2>
                        <ul className="text-gray-300 leading-relaxed space-y-2 list-disc list-inside">
                            <li>Todos los estadios deben cumplir con los estándares de seguridad establecidos.</li>
                            <li>Capacidad mínima: 5,000 espectadores.</li>
                            <li>Iluminación artificial obligatoria para partidos nocturnos.</li>
                            <li>Servicios de seguridad y emergencias presentes en todos los partidos.</li>
                        </ul>
                    </div>

                    {/* Artículo 8 */}
                    <div className="bg-[#162550] rounded-xl p-6 border border-[#E31837]">
                        <h2 className="text-xl font-bold text-[#F5C518] mb-3">Artículo 8: Derechos de Transmisión</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Los derechos de transmisión televisiva y streaming de la Antillas Premier League son propiedad de la organización. Cualquier emisión de los partidos requiere autorización previa por escrito.
                        </p>
                    </div>

                    {/* Artículo 9 */}
                    <div className="bg-[#162550] rounded-xl p-6 border border-[#E31837]">
                        <h2 className="text-xl font-bold text-[#F5C518] mb-3">Artículo 9: Modificaciones</h2>
                        <p className="text-gray-300 leading-relaxed">
                            El presente reglamento puede ser modificado por la asamblea de la liga, siempre que se notifique con al menos 30 días de anticipación a todos los equipos participantes.
                        </p>
                    </div>

                    {/* Artículo 10 */}
                    <div className="bg-[#162550] rounded-xl p-6 border border-[#E31837]">
                        <h2 className="text-xl font-bold text-[#F5C518] mb-3">Artículo 10: Aceptación</h2>
                        <p className="text-gray-300 leading-relaxed">
                            La participación en la Antillas Premier League implica la aceptación total del presente reglamento.
                        </p>
                    </div>
                </div>

                {/* Fecha de actualización */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                    Última actualización: {new Date().toLocaleDateString('es-ES')}
                </div>
            </div>
        </PublicLayout>
    );
}