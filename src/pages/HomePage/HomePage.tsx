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
            navigate("/", { state: { errorMessage: "Disconnesso dal client"}});
        }
    }, [mqtt]);

    const handleDelete = (id: number) => {
        mqtt.removeMessage(id);
    };

    return (
    <div className="container">
        <h1>MESSAGGI</h1>
        <div className="messages">
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
