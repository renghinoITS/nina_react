import "./HomePage.css";

import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import MessageBox from "../../components/HomePage/MessageBox/MessageBox";
import { useMQTTContext } from "../../contexts/MQTTContext";

const HomePage: React.FC = () => {
    // React Router hook for navigation
    const navigate = useNavigate();

    // MQTT context to manage connection and messages
    const mqtt = useMQTTContext();

    // Reference to the end of the message list for automatic scrolling
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // useEffect to check if the MQTT client is connected
    // If not connected, navigates back to the access page ("/")
    useEffect(() => {
        if (!mqtt.client || !mqtt.client.connected) {
            navigate("/");
        }
    }, [mqtt]);
    
    // useEffect to automatically scroll to the latest message when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mqtt.messages]);

    // Function to delete a message by its ID
    const handleDelete = (id: number) => {
        mqtt.removeMessage(id);
    };

    // Function to disconnect from the MQTT client
    const handleDisconnect = () => {
        mqtt.disconnect();
    };

    return (
        <div className="messages-container">
            <h1>MESSAGGI</h1>

            <div id="disconnect-btn" data-testid="disconnect-btn" onClick={handleDisconnect}></div>

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
