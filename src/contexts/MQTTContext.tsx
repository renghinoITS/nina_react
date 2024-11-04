import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import mqtt, { MqttClient } from "mqtt";
import { MqttMessage } from "../types/interfaces/MqttMessage";

interface MQTTContextType {
    client: MqttClient | null;
    connect: (ip: string, port: number, topic: string) => void;
    disconnect: () => void;
    messages: MqttMessage[];
    removeMessage: (id: number) => void;
}

const MQTTContext = createContext<MQTTContextType | undefined>(undefined);

export const MQTTProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [client, setClient] = useState<MqttClient | null>(null);
    const [messages, setMessages] = useState<MqttMessage[]>([]);
    let messageCounter = 0;

    const connect = useCallback((ip: string, port: number, topic: string) => {
        const mqttClient = mqtt.connect(`ws://${ip}:${port}`);
        
        mqttClient.on("connect", () => {
            console.log(`Connesso al broker tramite WebSocket all'indirizzo ws://${ip}:${port}`);
            mqttClient.subscribe(topic, (err) => {
                if (!err) {
                    console.log(`Sottoscritto al topic: ${topic}`);
                }
            });
        });

        mqttClient.on("message", (_, message) => {
            const decodedMessage = new TextDecoder("utf-8").decode(message);

            try {
                const parsedMessage = JSON.parse(decodedMessage);

                if (parsedMessage.type && parsedMessage.message) {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            id: messageCounter++,
                            type: parsedMessage.type,
                            message: parsedMessage.message,
                        },
                    ]);
                }
            } catch (error) {
                console.error("Errore nel parsing del messaggio MQTT:", error);
            }
        });

        setClient(mqttClient);
    }, []);

    const disconnect = () => {
        if (client) {
            client.end(() => {
                console.log("Disconnesso dal broker MQTT");
                setClient(null);
            });
        }
    };

    const removeMessage = (id: number) => {
        setMessages((prevMessages) => prevMessages.filter(message => message.id !== id));
    };

    return (
        <MQTTContext.Provider value={{ client, connect, disconnect, messages, removeMessage }}>
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