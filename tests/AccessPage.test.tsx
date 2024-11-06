import { render, screen, fireEvent } from "@testing-library/react";
import AccessPage from "../src/pages/AccessPage/AccessPage";
import { useMQTTContext } from "../src/contexts/MQTTContext";
import { BrowserRouter } from "react-router-dom";

// Mock del contesto MQTT per simulare il comportamento di `useMQTTContext` durante i test
jest.mock("../src/contexts/MQTTContext", () => ({
	useMQTTContext: jest.fn(),
}));

// Mock di `useNavigate` di react-router-dom per controllare la navigazione
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: jest.fn(),
}));

// Descrizione del gruppo di test per `AccessPage`
describe("AccessPage", () => {
	// Definizione delle funzioni di mock per simulare le funzioni del contesto
	const mockConnect = jest.fn();
	const mockSetConnectionStatus = jest.fn();
	const mockNavigate = jest.fn();

	// Reset delle funzioni di mock e setup per ogni test
	beforeEach(() => {
		jest.clearAllMocks();

    	// Mock dei valori del contesto MQTT per configurare i dati di test
		(useMQTTContext as jest.Mock).mockReturnValue({
			connect: mockConnect,
			setConnectionStatus: mockSetConnectionStatus,
			connectionStatus: "",
			isConnecting: false,
			client: null,
		});

    	// Mock di `useNavigate` per poter verificare le chiamate alla funzione di navigazione
    	const useNavigate = require("react-router-dom").useNavigate;
    	useNavigate.mockReturnValue(mockNavigate);
	});

	// Test per verificare se `AccessPage` viene renderizzata correttamente
	test("renderizza correttamente AccessPage", () => {
		render(
			<BrowserRouter>
				<AccessPage />
			</BrowserRouter>
		);

		// Verifica che gli elementi della pagina siano presenti
		expect(screen.getByText("NINA REACT 🌌")).toBeInTheDocument();
		expect(screen.getByLabelText("IP:")).toBeInTheDocument();
		expect(screen.getByLabelText("Porta:")).toBeInTheDocument();
		expect(screen.getByLabelText("Topic:")).toBeInTheDocument();
		expect(screen.getByText("CONNETTI")).toBeInTheDocument();
	});

	// Test per verificare che venga mostrato un errore se i campi IP o Porta sono vuoti
	test("mostra un errore se IP o porta mancano", () => {
		render(
			<BrowserRouter>
				<AccessPage />
			</BrowserRouter>
		);

		// Clicca sul pulsante "CONNETTI" senza inserire valori
		fireEvent.click(screen.getByText("CONNETTI"));
		
		// Verifica che `setConnectionStatus` venga chiamato con un messaggio di errore
		expect(mockSetConnectionStatus).toHaveBeenCalledWith(
			"Per favore, inserisci un indirizzo IP e una porta validi."
		);
	});

	// Test per verificare che `connect` venga chiamato con i parametri corretti
	test("chiama mqtt.connect con i parametri corretti", () => {
		render(
			<BrowserRouter>
				<AccessPage />
			</BrowserRouter>
		);
	
		// Cambia i valori degli input
		fireEvent.change(screen.getByLabelText("IP:"), { target: { value: "192.168.1.1" } });
		fireEvent.change(screen.getByLabelText("Porta:"), { target: { value: "9001" } });
		fireEvent.change(screen.getByLabelText("Topic:"), { target: { value: "Test Topic" } });
	
		// Simula il click sul pulsante "CONNETTI"
		fireEvent.click(screen.getByText("CONNETTI"));
	
		// Verifica che `connect` venga chiamato con i valori inseriti
		expect(mockConnect).toHaveBeenCalledWith("192.168.1.1", 9001, "Test Topic"); // Qui aggiungi questa riga
	});
	
	// Test per verificare la navigazione alla pagina "/home" quando il client è connesso
	test("naviga a /home quando il client è connesso", () => {
		// Imposta `client.connected` su true per simulare una connessione attiva
		(useMQTTContext as jest.Mock).mockReturnValue({
			connect: mockConnect,
			setConnectionStatus: mockSetConnectionStatus,
			connectionStatus: "",
			isConnecting: false,
			client: { connected: true },
		});

		render(
			<BrowserRouter>
				<AccessPage />
			</BrowserRouter>
		);

		// Verifica che `useNavigate` sia stato chiamato con "/home"
		expect(mockNavigate).toHaveBeenCalledWith("/home");
	});

	// Test per verificare che il pulsante "CONNETTI" venga disabilitato durante il caricamento
	test("disabilita il pulsante durante il caricamento", () => {
		// Imposta `isConnecting` su true per simulare il caricamento
		(useMQTTContext as jest.Mock).mockReturnValue({
			connect: mockConnect,
			setConnectionStatus: mockSetConnectionStatus,
			connectionStatus: "",
			isConnecting: true,
			client: null,
		});

		render(
			<BrowserRouter>
				<AccessPage />
			</BrowserRouter>
		);

		// Verifica che il pulsante "CONNETTI" sia disabilitato
		const connectButton = screen.getByRole("button", { name: /CONNETTI/i });
		expect(connectButton).toBeDisabled();
	});

	// Test per verificare che lo stato dei campi di input venga aggiornato correttamente
	test("aggiorna lo stato dei campi di input", () => {
		render(
			<BrowserRouter>
				<AccessPage />
			</BrowserRouter>
		);

		// Seleziona i campi di input per IP, Porta e Topic
		const ipInput = screen.getByLabelText("IP:");
		const portInput = screen.getByLabelText("Porta:");
		const topicInput = screen.getByLabelText("Topic:");

		// Modifica i valori dei campi di input
		fireEvent.change(ipInput, { target: { value: "192.168.1.1" } });
		fireEvent.change(portInput, { target: { value: "9001" } });
		fireEvent.change(topicInput, { target: { value: "Test Topic" } });

		// Verifica che i valori siano aggiornati correttamente
		expect(ipInput).toHaveValue("192.168.1.1");
		expect(portInput).toHaveValue("9001");
		expect(topicInput).toHaveValue("Test Topic");
	});
});
