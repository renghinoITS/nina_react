import { NinaMessageType } from "../enums/NinaMessageType";

export interface MqttMessage {
    id: number,
	type: NinaMessageType,
    message: string
}