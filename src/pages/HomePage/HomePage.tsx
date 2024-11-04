import "./HomePage.css";

import React, { useState } from "react";
import "./HomePage.css";
import NotificationBox from "../../components/HomePage/NotificationBox/NotificationBox";

interface Notification {
    id: number;
    type: "success" | "warning" | "error";
    message: string;
}

const HomePage: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: "success", message: "Operazione completata con successo!" },
    { id: 2, type: "warning", message: "Attenzione: Verifica i dettagli inseriti." },
    { id: 3, type: "error", message: "Errore: Si è verificato un problema." }
    ]);

    const handleDelete = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    };

    return (
    <div className="container">
        <h1>LE TUE NOTIFICHE</h1>
        <div className="notifications">
        {notifications.map(notification => (
            <NotificationBox
            key={notification.id}
            type={notification.type}
            message={notification.message}
            onDelete={() => handleDelete(notification.id)}
            />
        ))}
        </div>
    </div>
    );
};

export default HomePage;
