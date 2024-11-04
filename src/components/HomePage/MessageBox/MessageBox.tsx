import "./MessageBox.css";

import React, { useEffect, useState } from "react";
import { NinaMessageType } from "../../../types/enums/NinaMessageType";
import notificationSound from "../../../assets/sounds/notification.mp3";
import errorSound from "../../../assets/sounds/error.mp3";
import useNotification from "../../../hooks/useNotification";

interface MessageBoxProps {
    id: number,
    type: NinaMessageType,
    message: string,
    onDelete: () => void
}

const MessageBox: React.FC<MessageBoxProps> = ({ id, type, message, onDelete }) => {
    const messageTypeClass = {
        [NinaMessageType.ERROR] : "error",
        [NinaMessageType.CALIBRATION_STATUS] : "status",
        [NinaMessageType.OBSERVATION_STARTED] : "info",
        [NinaMessageType.OBSERVATION_ENDED] : "info",
    }

    const [messageSent, setMessageSent] = useState<boolean>(false);
    const className = messageTypeClass[type] || "uknown";
    const { notify } = useNotification();
    
    useEffect(() => {
        if(messageSent) {
            return;
        }

        console.log(`VAI COL MESSAGGIO NOTIFICA ${id}`)
        const sound = type === NinaMessageType.ERROR ? errorSound : notificationSound;

        notify("Nuovo messaggio da NINA", {
            body: message,
        }, sound);

        setMessageSent(true);
    }, [messageSent, message, type, notify]);

    return (
        <div id={id.toString()} className={`message-box ${className}`}>
            <p>{message}</p>
            <div className="message-box-deletebtn" onClick={onDelete}>
                <div>x</div>
            </div>
        </div>
    );
};

export default MessageBox;
