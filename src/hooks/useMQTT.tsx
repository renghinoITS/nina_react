import { useEffect, useState } from "react";
import mqtt from "mqtt";

interface useMQTTProps {
	ip?: string,
	port?: number,
	topic?: string
}

const useMQTT = ({ 
	ip = "localhost",
	port = 9001,
	topic = "Test Topic"
}: useMQTTProps) => {
	const [client, setClient] = useState<mqtt.MqttClient | null>(null);
	const [messages, setMessages] = useState<string[]>([]);

	useEffect(() => {
		const mqttClient = mqtt.connect(`ws://${ip}:${port}`);

		mqttClient.on("connect", () => {
			console.log(`Connesso a Mosquitto tramite WebSocket all'indirizzo ws://${ip}:${port}`);

			mqttClient.subscribe(topic, (err) => {
				if (!err) {
					console.log(`Sottoscritto al topic: ${topic}`);
				}
			});
		});

		mqttClient.on("message", (_, message) => {
			const decoder = new TextDecoder("utf-8");
			const decodedString = decoder.decode(message);

			setMessages((prevMessages) => [
				...prevMessages,
				decodedString
			]);
		});

		setClient(mqttClient);

		return () => {
			mqttClient.end();
		};
	}, [ip, port, topic]);

	return { client, messages };
};

export default useMQTT;
