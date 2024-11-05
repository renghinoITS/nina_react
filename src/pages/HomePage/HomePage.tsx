import "./HomePage.css";

import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import MessageBox from "../../components/HomePage/MessageBox/MessageBox";
import { useMQTTContext } from "../../contexts/MQTTContext";

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const mqtt = useMQTTContext();

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mqtt.client || !mqtt.client.connected) {
            navigate("/");
        }
    }, [mqtt]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mqtt.messages]);

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
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};

export default HomePage;
