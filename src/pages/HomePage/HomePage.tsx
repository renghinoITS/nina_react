import NotificationBox from "../components/HomePage/NotificationBox";

const HomePage = () => {
    return (
    <div>
        <h1>Notifiche</h1>
        <NotificationBox type="success" message="Operazione completata con successo!" />
        <NotificationBox type="warning" message="Attenzione: Verifica i dettagli inseriti." />
        <NotificationBox type="error" message="Errore: Si è verificato un problema." />
    </div>
    );
};

export default HomePage;
