import "./HomePage.css";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MessageBox from "../../components/HomePage/MessageBox/MessageBox";
import { useMQTTContext } from "../../contexts/MQTTContext";

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const mqtt = useMQTTContext();

    useEffect(() => {
        if (!mqtt.client || !mqtt.client.connected) {
            navigate("/");
        }
    }, [mqtt]);

    const handleDelete = (id: number) => {
        mqtt.removeMessage(id);
    };

    const handleDisconnect = () => {
        mqtt.disconnect();
    };

    return (
        <div className="messages-container">
            <h1>MESSAGGI</h1>

            <div id="disconnect-btn" onClick={handleDisconnect}></div>

            <div className="messages-list">
                {mqtt.messages.map(message => (
                    <MessageBox
                        key={message.id}
                        id={message.id}
                        type={message.type}
                        message={message.message}
                        onDelete={() => handleDelete(message.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
