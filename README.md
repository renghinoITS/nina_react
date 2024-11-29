
# NINA React 🌌

**NINA React** è un'applicazione web progettata per integrarsi con [N.I.N.A. (Nighttime Imaging 'N' Astronomy)](https://nighttime-imaging.eu/), un software di gestione astronomica. L'obiettivo del progetto è fornire un'interfaccia reattiva e intuitiva per ricevere notifiche in tempo reale relative allo stato delle operazioni di calibrazione e tracking degli obiettivi gestite da N.I.N.A.

Attraverso il protocollo **MQTT**, l'applicazione consente di ricevere messaggi di successo e, soprattutto, messaggi di errore critici (ad esempio, la perdita dell'obiettivo). Gli errori sono notificati all'utente tramite notifiche visive e sonore, migliorando la prontezza nell'identificare e risolvere i problemi durante le osservazioni astronomiche.

---

## Caratteristiche principali

- **Integrazione con MQTT**: Connessione con broker MQTT per la ricezione di messaggi inviati da N.I.N.A.
- **Notifiche in tempo reale**:
  - **Messaggi di successo**: Confermano operazioni completate correttamente, come calibrazione e tracking dell'obiettivo.
  - **Messaggi di errore**: Evidenziati in tempo reale tramite notifiche sonore e visive.
- **Gestione semplice dei messaggi**: L'applicazione consente la consultazione, l'eliminazione di singoli messaggi o la rimozione completa dell'elenco.
- **Simulazione con Mock e Mosquitto**: Possibilità di testare l'app utilizzando Mosquitto come broker MQTT e Mock per simulare messaggi.

---

## Requisiti tecnici

- **Node.js** (v16 o superiore)
- **Mosquitto** (broker MQTT)
- **Mock** (per testare la ricezione dei messaggi)
- **Browser compatibile con notifiche Web**

---

## Configurazione e installazione

### 1. Clonare il repository

Clonare il progetto sul proprio ambiente di sviluppo locale:
\`\`\`bash
git clone https://github.com/renghinoITS/nina_react.git
cd nina_react
\`\`\`

### 2. Installare le dipendenze

Eseguire il seguente comando per installare le dipendenze del progetto:
\`\`\`bash
npm install
\`\`\`

### 3. Avviare il broker Mosquitto

#### Opzione 1: Avvio locale
Se Mosquitto è installato sul sistema:
\`\`\`bash
mosquitto -v
\`\`\`

#### Opzione 2: Utilizzo di Docker
Per avviare Mosquitto tramite Docker:
\`\`\`bash
docker run -it -p 1883:1883 -p 9001:9001 eclipse-mosquitto
\`\`\`

### 4. Configurare il file `.env` (opzionale)

Creare un file `.env` nella root del progetto per configurare il broker MQTT:
\`\`\`env
REACT_APP_MQTT_BROKER=ws://localhost:9001
REACT_APP_MQTT_TOPIC=nina/messages
\`\`\`

### 5. Avviare l'applicazione

Avviare il server di sviluppo con il seguente comando:
\`\`\`bash
npm run dev
\`\`\`

L'app sarà disponibile all'indirizzo: `http://localhost:3000`.

---

## Simulazione dei messaggi MQTT

È possibile simulare messaggi MQTT per testare l'applicazione.

1. **Messaggio di successo**:
   \`\`\`bash
   mosquitto_pub -h localhost -p 1883 -t nina/messages -m '{"type": "success", "message": "Calibrazione completata con successo!"}'
   \`\`\`

2. **Messaggio di errore**:
   \`\`\`bash
   mosquitto_pub -h localhost -p 1883 -t nina/messages -m '{"type": "error", "message": "Obiettivo perso!"}'
   \`\`\`

---

## Utilizzo

1. **Collegamento al broker MQTT**:
   - Accedi alla pagina iniziale (`/`) e inserisci i dettagli di connessione:
     - **Indirizzo IP** del broker MQTT.
     - **Porta** (es. 9001).
     - **Topic** MQTT (es. `nina/messages`).
   - Clicca su **Connetti**.

2. **Consultazione dei messaggi**:
   - Una volta connesso, verrai reindirizzato alla pagina `/home` dove potrai:
     - Visualizzare i messaggi ricevuti.
     - Eliminare singoli messaggi o tutti i messaggi.
     - Ricevere notifiche sonore per messaggi di errore.

3. **Disconnessione**:
   - Clicca sul pulsante **Disconnetti** per terminare la connessione con il broker MQTT.

---

## Struttura del progetto

- **Pagine principali**:
  - `AccessPage`: Gestisce la connessione al broker MQTT.
  - `HomePage`: Visualizza e gestisce i messaggi ricevuti.
- **MQTTContext**:
  - Centralizza la logica per la connessione al broker e la gestione dei messaggi.
- **Hook personalizzato**:
  - `useNotification`: Per notifiche browser con supporto audio.
- **Router**:
  - Configurazione del routing con React Router per navigare tra `/` e `/home`.

---

## Contributi

Contributi al progetto sono i benvenuti. Segui questi passaggi per contribuire:

1. Fai un fork del repository.
2. Crea un branch per la tua modifica:
   \`\`\`bash
   git checkout -b feature/il-tuo-contributo
   \`\`\`
3. Effettua un commit delle modifiche:
   \`\`\`bash
   git commit -m "Aggiunta: il-tuo-contributo"
   \`\`\`
4. Invia una pull request.

---

## Tecnologie utilizzate

- **React** con **TypeScript**: Per l'interfaccia utente.
- **Mosquitto**: Come broker MQTT.
- **Mock**: Per testare la ricezione di messaggi.
- **CSS**: Per lo styling dell'applicazione.

---

## Licenza

Questo progetto è distribuito sotto la licenza [MIT License](LICENSE).
