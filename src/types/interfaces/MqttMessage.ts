import { NinaMessageType } from "../enums/NinaMessageType";

export interface MqttMessage {
    id: number,
	type: NinaMessageType | undefined,
    message: string
}