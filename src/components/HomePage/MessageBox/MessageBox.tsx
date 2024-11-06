import "./MessageBox.css";

import React, { useEffect, useState } from "react";
import { NinaMessageType } from "../../../types/enums/NinaMessageType";
import notificationSound from "../../../assets/sounds/notification.mp3";
import errorSound from "../../../assets/sounds/error.mp3";
import useNotification from "../../../hooks/useNotification";

interface MessageBoxProps {
    // Unique identifier for the message
    id: number, 

    // Optional type of the message (e.g., error, status, info)
    type?: NinaMessageType, 

    // The message content
    message: string, 

    // Function to handle message deletion
    onDelete: () => void 
}

const MessageBox: React.FC<MessageBoxProps> = ({ id, type, message, onDelete }) => {

    // Object to map message types to CSS classes for styling
    const messageTypeClass = {
        [NinaMessageType.ERROR] : "error",
        [NinaMessageType.CALIBRATION_STATUS] : "status",
        [NinaMessageType.OBSERVATION_STARTED] : "info",
        [NinaMessageType.OBSERVATION_ENDED] : "info"
    }

    // State to track if the message notification has been sent
    const [messageSent, setMessageSent] = useState<boolean>(false);

    // Determine the CSS class based on the message type or default to "unknown" if type is undefined
    const className = messageTypeClass[type as NinaMessageType] || "unknown";

    // Custom notification hook to trigger user notifications
    const { notify } = useNotification();
    
    useEffect(() => {
        // If the notification has already been sent, do nothing
        if(messageSent) {
            return;
        }

        // Set the notification sound based on the message type
        const sound = type === NinaMessageType.ERROR ? errorSound : notificationSound;

        // Trigger the notification with the message content
        notify("Nuovo messaggio da NINA", {
            body: message,
        }, sound);

        // Mark the notification as sent
        setMessageSent(true);
    }, [messageSent, message, type, notify]);

    return (
        // Main container for the message, applying a CSS class based on the message type
        <div id={id.toString()} className={`message-box ${className}`}>

            <p>{message}</p>

            <div className="message-box-deletebtn" onClick={onDelete}></div>
        </div>
    );
};

export default MessageBox;
