import "./NotificationBox.css";

interface NotificationBoxProps {
  type: "success" | "warning" | "error"; // Verde, Giallo, Rosso
    message: string;
}

const NotificationBox: React.FC<NotificationBoxProps> = ({ type, message }) => {
    return (
        <div className={`notification-box ${type}`}>
            <p>{message}</p>
        </div>
    );
};

export default NotificationBox;
