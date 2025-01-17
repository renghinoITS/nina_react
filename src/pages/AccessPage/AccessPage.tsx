import "./AccessPage.css";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StarButton from "../../components/Common/StarButton/StarButton";
import { useMQTTContext } from "../../contexts/MQTTContext";

const AccessPage: React.FC = () => {  
     // React Router hook for navigating between pages
    const navigate = useNavigate();

    //store the IP address,port(default),topic
    const [ip, setIp] = useState("");     
    const [port, setPort] = useState(9001);     
    const [topic, setTopic] = useState("");

    // MQTT context to manage connection state and operations
    const mqtt = useMQTTContext();
    
    // Function to handle the click event for connecting
    const handleConnect = () => {
        // Checks if IP and port are provided; if not, sets an error message
        if (!ip || !port) {
            mqtt.setConnectionStatus("Per favore, inserisci un indirizzo IP e una porta validi.");
            return;
        }
        
        /**
         * 
         * Calls the MQTT connection function with the IP, port, and topic. 
         * After connecting, it navigates to the "/home" page
        */

        mqtt.connect(ip, port, topic);
    };
    // checks if the MQTT client is connected, if connected, go to "/home"
    useEffect(() => {
        if(mqtt.client && mqtt.client.connected) {
            navigate("/home");
        }
    }, [mqtt.client, mqtt.client?.connected]);

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
