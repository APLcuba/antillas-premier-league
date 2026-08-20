import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function NotificationBell() {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            
            const response = await axios.get('/api/notifications-data?limit=10');
            
            setNotifications(response.data.notifications || []);
            setUnreadCount(response.data.unread_count || 0);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id) => {
        try {
            await axios.post(`/notificaciones/marcar/${id}`);
            setNotifications(notifications.map(n => 
                n.id === id ? { ...n, is_read: true } : n
            ));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.post('/notificaciones/marcar-todas');
            setNotifications(notifications.map(n => ({ ...n, is_read: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    if (!auth || !auth.user) return null;

    const formatDate = (date) => {
        const diff = Date.now() - new Date(date).getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Hace un momento';
        if (minutes < 60) return `Hace ${minutes} min`;
        if (hours < 24) return `Hace ${hours} h`;
        if (days < 7) return `Hace ${days} d`;
        return new Date(date).toLocaleDateString('es-ES');
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
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-300 hover:text-white transition-colors focus:outline-none"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#E31837] rounded-full">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 mt-2 w-80 md:w-96 bg-[#162550] rounded-xl shadow-2xl border border-[#E31837] z-50 max-h-[500px] overflow-hidden">
                        <div className="p-4 border-b border-[#1A2F5A] flex justify-between items-center">
                            <h3 className="text-white font-bold">Notificaciones</h3>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-xs text-[#F5C518] hover:underline"
                                >
                                    Marcar todas
                                </button>
                            )}
                        </div>
                        <div className="overflow-y-auto max-h-[400px]">
                            {loading ? (
                                <div className="p-8 text-center text-gray-400">
                                    <div className="animate-spin inline-block w-6 h-6 border-2 border-[#F5C518] border-t-transparent rounded-full"></div>
                                    <p className="mt-2">Cargando...</p>
                                </div>
                            ) : notifications.length > 0 ? (
                                notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 border-b border-[#1A2F5A] hover:bg-[#1A2F5A] transition cursor-pointer ${
                                            !notification.is_read ? 'bg-[#0D1B3E]/50' : ''
                                        }`}
                                        onClick={() => {
                                            if (!notification.is_read) {
                                                markAsRead(notification.id);
                                            }
                                            if (notification.link) {
                                                window.location.href = notification.link;
                                            }
                                            setIsOpen(false);
                                        }}
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="text-xl">{getIcon(notification.type)}</span>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-medium ${notification.is_read ? 'text-gray-400' : 'text-white'}`}>
                                                    {notification.title}
                                                </p>
                                                <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                                                    {notification.message}
                                                </p>
                                                <p className="text-gray-500 text-xs mt-1">
                                                    {formatDate(notification.created_at)}
                                                </p>
                                            </div>
                                            {!notification.is_read && (
                                                <span className="w-2 h-2 bg-[#F5C518] rounded-full flex-shrink-0 mt-1"></span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-gray-400">
                                    <span className="text-4xl block mb-2">🔔</span>
                                    No tienes notificaciones
                                </div>
                            )}
                        </div>
                        <div className="p-3 border-t border-[#1A2F5A] text-center">
                            <a
                                href="/notificaciones"
                                className="text-sm text-[#F5C518] hover:underline"
                                onClick={() => setIsOpen(false)}
                            >
                                Ver todas las notificaciones
                            </a>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}