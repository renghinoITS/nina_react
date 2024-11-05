import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import mqtt, { MqttClient } from "mqtt";
import { MqttMessage } from "../types/interfaces/MqttMessage";

interface MQTTContextType {
    client: MqttClient | null;
    connect: (ip: string, port: number, topic: string, onSuccess?: () => void) => void;
    disconnect: () => void;
    connectionStatus: string | null;
    setConnectionStatus: (status: string | null) => void;
    isConnecting: boolean;
    messages: MqttMessage[];
    removeMessage: (id: number) => void;
}

const MQTTContext = createContext<MQTTContextType | undefined>(undefined);

export const MQTTProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [client, setClient] = useState<MqttClient | null>(null);
    const [messages, setMessages] = useState<MqttMessage[]>([]);
    const [connectionStatus, setConnectionStatus] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    let messageCounter = 0;

    const connect = useCallback(async (
        ip: string, 
        port: number, 
        topic: string, 
        onSuccess?: () => void
    ) => {
        try {
            setConnectionStatus("Connettendo...");
            setIsConnecting(true);

            if (client) {
                await disconnect();
            }

            const mqttClient = mqtt.connect(`ws://${ip}:${port}`, {
                reconnectPeriod: 0,
            });
            
            mqttClient.on("connect", () => {
                setIsConnecting(false);
                setConnectionStatus("Connesso con successo.");

                console.log(`Connesso al broker tramite WebSocket all'indirizzo ws://${ip}:${port}`);

                mqttClient.subscribe(topic, (err) => {
                    if (!err) {
                        console.log(`Sottoscritto al topic: ${topic}`);
                    }
                });

                if (onSuccess) {
                    onSuccess();
                }
            });

            mqttClient.on("message", (_, message) => {
                const decodedMessage = new TextDecoder("utf-8").decode(message);

                try {
                    const parsedMessage = JSON.parse(decodedMessage);

                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            id: messageCounter++,
                            type: parsedMessage.type || undefined,
                            message: parsedMessage.message || decodedMessage,
                        },
                    ]);
                } catch (error) {
                    console.error("Errore nel parsing del messaggio MQTT:", error);

                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            id: messageCounter++,
                            type: undefined,
                            message: decodedMessage,
                        },
                    ]);
                }
            });

            mqttClient.on("error", () => {
                setIsConnecting(false);
                setConnectionStatus("Connessione fallita. Verifica i dettagli inseriti.");
            });

            mqttClient.on("close", () => {
                setIsConnecting(false);
                setConnectionStatus("Impossibile connettersi al broker. Verifica l'indirizzo IP e la porta.");
            });

            setClient(mqttClient);
        } catch (error) {
            console.error(`Errore durante il tentativo di connessione: ${error}`);
            setConnectionStatus(`Errore durante il tentativo di connessione: ${error}`);
            setIsConnecting(false);
        }
    }, [client]);

    const disconnect = useCallback(async () => {
        if (client) {
            client.removeAllListeners();

            client.end(() => {
                setClient(null);
                setMessages([]);
                messageCounter = 0;
                setConnectionStatus("Disconnesso.");
                console.log("Disconnesso dal broker MQTT");
            });
        }
    }, [client]);

    const removeMessage = (id: number) => {
        setMessages((prevMessages) => prevMessages.filter(message => message.id !== id));
    };

    return (
        <MQTTContext.Provider value={{ client, connect, disconnect, connectionStatus, setConnectionStatus, isConnecting, messages, removeMessage }}>
            {children}
        </MQTTContext.Provider>
    );
};

export const useMQTTContext = () => {
    const context = useContext(MQTTContext);
    if (!context) {
        throw new Error("useMQTTContext deve essere usato all'interno di un MQTTProvider");
    }
    return context;
};