import React from "react";
import "./NotificationBox.css";

interface NotificationBoxProps {
    type: "success" | "warning" | "error";
    message: string;
    onDelete: () => void; // Funzione per eliminare la notifica
}

const NotificationBox: React.FC<NotificationBoxProps> = ({ type, message, onDelete }) => {
    return (
        <div className={`notification-box ${type}`}>
            <p>{message}</p>
            <div className="del" onClick={onDelete}>
                <div>Delete</div>
            </div>
        </div>
    );
};

export default NotificationBox;
