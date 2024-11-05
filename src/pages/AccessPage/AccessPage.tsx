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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    const mqtt = useMQTTContext();

    const handleConnect = () => {
        setErrorMessage(null);

        if (!ip || !port) {
            setErrorMessage("Per favore, inserisci un indirizzo IP e una porta validi.");
            return;
        }

        try {
            mqtt.connect(ip, port, topic);
        } catch (error) {
            setErrorMessage("Errore durante la connessione: " + (error as Error).message);
        }
    };

    useEffect(() => {
        if (mqtt.client) {
            mqtt.client.on("connect", () => {
                navigate("/home");
            });

            mqtt.client.on("error", () => {
                setErrorMessage("Connessione fallita. Verifica i dettagli inseriti.");
            });
        }
    }, [mqtt.client, navigate]);

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

                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <StarButton buttonText="CONNETTI" isLoading={false} onClick={handleConnect}/>
            </div>
            <div id="apod-content" className="apod-content"></div>
        </div>
    );
};

export default AccessPage;
