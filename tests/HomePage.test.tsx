// Mock della funzione `scrollIntoView` per evitare comportamenti indesiderati nei test
window.HTMLElement.prototype.scrollIntoView = jest.fn();

import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "../src/pages/HomePage/HomePage";
import { useMQTTContext } from "../src/contexts/MQTTContext";
import { BrowserRouter } from "react-router-dom";

// Configurazione di un mock per `Notification` prima dell'esecuzione dei test
beforeAll(() => {
    // Definisce il mock per `Notification`
    global.Notification = jest.fn().mockImplementation((title: string, options?: NotificationOptions) => ({
      title,
      options,
      close: jest.fn(), // Mock della funzione `close`
    })) as unknown as {
      new (title: string, options?: NotificationOptions): Notification;
      prototype: Notification;
      permission: NotificationPermission;
      requestPermission: () => Promise<NotificationPermission>;
    };
  
    // Assegna proprietà statiche necessarie per simulare l'API Notification
    Object.assign(global.Notification, {
      permission: "granted",
      requestPermission: jest.fn().mockResolvedValue("granted"),
    });
});
  
// Mock del contesto MQTT per simulare `useMQTTContext`
jest.mock("../src/contexts/MQTTContext", () => ({
  useMQTTContext: jest.fn(),
}));

// Mock di `useNavigate` di `react-router-dom` per controllare la navigazione
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Descrizione del gruppo di test per `HomePage`
describe("HomePage", () => {
  // Definizione delle funzioni di mock per simulare `removeMessage`, `disconnect` e `navigate`
  const mockRemoveMessage = jest.fn();
  const mockDisconnect = jest.fn();
  const mockNavigate = jest.fn();

  // Reset dei mock e configurazione di base prima di ogni test
  beforeEach(() => {
    jest.clearAllMocks();

    // Configura il contesto MQTT per i test con valori simulati
    (useMQTTContext as jest.Mock).mockReturnValue({
        removeMessage: mockRemoveMessage,
        disconnect: mockDisconnect,
        client: { connected: true },
        messages: [{ id: 1, message: "Hello, MQTT!" }],  // Usato `message` anziché `text` per corrispondere all'interfaccia `MqttMessage`
    });
        
    // Mock di `useNavigate` per permettere di verificare la navigazione
    const useNavigate = require("react-router-dom").useNavigate;
    useNavigate.mockReturnValue(mockNavigate);
  });

  // Test per verificare che `HomePage` venga renderizzata correttamente
  test("renders HomePage correctly", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Verifica che gli elementi principali siano presenti nella pagina
    expect(screen.getByText("MESSAGGI")).toBeInTheDocument();
    expect(screen.getByTestId("disconnect-btn")).toBeInTheDocument();
    expect(screen.getByText("Hello, MQTT!")).toBeInTheDocument();
  });

  // Test per verificare il redirect alla pagina principale se il client MQTT è disconnesso
  test("redirects to the main page if client MQTT is disconnected", () => {
    // Configura il mock per simulare un client MQTT disconnesso
    (useMQTTContext as jest.Mock).mockReturnValue({
      client: null,
      messages: [],
      removeMessage: mockRemoveMessage,
      disconnect: mockDisconnect,
    });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Verifica che `useNavigate` sia stato chiamato per reindirizzare alla pagina "/"
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  // Test per verificare che `removeMessage` venga chiamato con l'ID corretto quando si elimina un messaggio
  test("calls removeMessage with the correct ID on delete", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Simula un click sul pulsante di eliminazione di un messaggio specifico
    const deleteButton = screen.getByTestId("delete-btn-1");  // Assumendo che il pulsante di eliminazione abbia `data-testid="delete-btn-1"`
    fireEvent.click(deleteButton);

    // Verifica che `removeMessage` venga chiamato con l'ID del messaggio eliminato
    expect(mockRemoveMessage).toHaveBeenCalledWith(1);
  });

  // Test per verificare che `disconnect` venga chiamato quando si clicca sul pulsante di disconnessione
  test("calls disconnect when the disconnect button is clicked", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Simula un click sul pulsante di disconnessione
    const disconnectButton = screen.getByTestId("disconnect-btn");
    fireEvent.click(disconnectButton);

    // Verifica che `disconnect` sia stato chiamato
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
