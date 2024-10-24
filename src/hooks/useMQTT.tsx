import { useEffect, useState } from "react";
import mqtt from "mqtt";

// Definizione del tipo per il messaggio
interface MqttMessage {
	topic: string;
	message: string;
}

const useMQTT = () => {
	const [client, setClient] = useState<mqtt.MqttClient | null>(null);
	const [messages, setMessages] = useState<MqttMessage[]>([]);

	useEffect(() => {
		// Collegamento al broker Mosquitto tramite WebSocket
		const mqttClient = mqtt.connect("ws://10.10.15.85:9001");

		// Impostazione del client MQTT
		mqttClient.on("connect", () => {
		console.log("Connesso a Mosquitto tramite WebSocket");

		// Sottoscrizione a un topic MQTT
			mqttClient.subscribe("Test Topic", (err) => {
			if (!err) {
				console.log("Sottoscritto a test/topic");
				}
			});
		});

		// Gestione dei messaggi in arrivo
		mqttClient.on("message", (topic, message) => {
			// Usa TextDecoder per convertire l'Uint8Array in stringa
			const decoder = new TextDecoder("utf-8");
			const decodedString = decoder.decode(message);

			console.log(decodedString);  // Output: "Test Payload"

			setMessages((prevMessages) => [
			...prevMessages,
			{ topic, message: message.toString() }
			]);
		});

		setClient(mqttClient);

		// Cleanup: disconnessione del client MQTT alla chiusura del componente
		return () => {
			mqttClient.end();
		};
	}, []);

	return { messages };
};

export default useMQTT;
