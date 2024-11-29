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
```bash
git clone https://github.com/renghinoITS/nina_react.git
cd nina_react
