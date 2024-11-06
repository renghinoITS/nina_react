import "./AccessPage.css";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StarButton from "../../components/Common/StarButton/StarButton";
import { useMQTTContext } from "../../contexts/MQTTContext";

const AccessPage: React.FC = () => {  
    const navigate = useNavigate();

    const [ip, setIp] = useState("");     
    const [port, setPort] = useState(9001);     
    const [topic, setTopic] = useState("");
    
    const mqtt = useMQTTContext();

    const handleConnect = () => {
        if (!ip || !port) {
            mqtt.setConnectionStatus("Per favore, inserisci un indirizzo IP e una porta validi.");
            return;
        }

        mqtt.connect(ip, port, topic, () => navigate("/home"));
    };

    useEffect(() => {
        if(mqtt.client && mqtt.client.connected) {
            navigate("/home");
        }
    }, [mqtt.client]);

    return (
        <div className="access-box">
            <h1>NINA REACT &#127756;</h1>
            <div className="access-box-form">
                
                <div className="access-box-form-row">
                    <label htmlFor="ip-address">IP:</label>
                    <input type="text" id="ip-address" placeholder="Es. 192.168.1.1" onChange={(e) => setIp(e.target.value)} required/>

                    <label htmlFor="porta">Porta:</label>
                    <input type="text" id="porta" placeholder="Es. 9001" onChange={(e) => setPort(Number(e.target.value))} required/>
                </div>
                <div className="access-box-form-row">
                    <label htmlFor="topic">Topic:</label>
                    <input type="text" id="topic" placeholder="Es. Test Topic" onChange={(e) => setTopic(e.target.value)} required/>
                </div>

                {mqtt.connectionStatus && <div className="access-box-form-row">{mqtt.connectionStatus}</div>}

                <StarButton buttonText="CONNETTI" isLoading={mqtt.isConnecting} onClick={handleConnect}/>
            </div>
            <div id="apod-content" className="apod-content"></div>
        </div>
    );
};

export default AccessPage;
