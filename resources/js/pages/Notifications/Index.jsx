import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';
import axios from 'axios';

export default function NotificationsIndex({ notifications }) {
    const markAsRead = async (id) => {
        try {
            await axios.post(`/notificaciones/marcar/${id}`);
            window.location.reload();
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.post('/notificaciones/marcar-todas');
            window.location.reload();
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    const getIcon = (type) => {
        const icons = {
            match_reminder: '📌',
            match_result: '⚽',
            new_news: '📰',
            new_comment: '💬',
        };
        return icons[type] || '🔔';
    };

    return (
        <PublicLayout title="Notificaciones">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        🔔 Notificaciones
                    </h1>
                    {notifications.data && notifications.data.some(n => !n.is_read) && (
                        <button
                            onClick={markAllAsRead}
                            className="text-sm text-[#F5C518] hover:underline"
                        >
                            Marcar todas como leídas
                        </button>
                    )}
                </div>

                {notifications.data && notifications.data.length > 0 ? (
                    <div className="space-y-3">
                        {notifications.data.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-4 rounded-xl border transition cursor-pointer ${
                                    notification.is_read
                                        ? 'bg-[#162550] border-[#1A2F5A]'
                                        : 'bg-[#0D1B3E] border-[#E31837]'
                                } hover:bg-[#1A2F5A]`}
                                onClick={() => {
                                    if (!notification.is_read) {
                                        markAsRead(notification.id);
                                    }
                                    if (notification.link) {
                                        window.location.href = notification.link;
                                    }
                                }}
                            >
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl">{getIcon(notification.type)}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className={`font-semibold ${notification.is_read ? 'text-gray-300' : 'text-white'}`}>
                                                {notification.title}
                                            </h3>
                                            {!notification.is_read && (
                                                <span className="text-xs px-2 py-0.5 bg-[#F5C518] text-[#0D1B3E] rounded-full font-bold">
                                                    Nueva
                                                </span>
                                            )}
                                        </div>
                                        <p className={`text-sm mt-1 ${notification.is_read ? 'text-gray-400' : 'text-gray-300'}`}>
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            {notification.time_ago || notification.created_at}
                                        </p>
                                    </div>
                                    {!notification.is_read && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                markAsRead(notification.id);
                                            }}
                                            className="text-xs text-[#F5C518] hover:underline flex-shrink-0"
                                        >
                                            Marcar leída
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-[#162550] rounded-xl p-12 text-center border border-[#1A2F5A]">
                        <span className="text-6xl block mb-4">🔔</span>
                        <h2 className="text-xl font-bold text-white mb-2">No tienes notificaciones</h2>
                        <p className="text-gray-400">Tranquilo, te avisaremos cuando haya novedades.</p>
                    </div>
                )}

                {/* Paginación */}
                {notifications.links && notifications.links.length > 3 && (
                    <div className="mt-6 flex justify-center gap-2">
                        {notifications.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-4 py-2 rounded-lg text-sm transition ${
                                    link.active
                                        ? 'bg-[#F5C518] text-[#0D1B3E]'
                                        : link.url
                                        ? 'bg-[#162550] text-gray-300 hover:bg-[#1A2F5A]'
                                        : 'text-gray-600 cursor-default'
                                }`}
                                dangerouslySetInnerHTML={link.url ? { __html: link.label } : undefined}
                            >
                                {!link.url && link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}