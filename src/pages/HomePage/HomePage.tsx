import React from "react";
import "./HomePage.css";
import NotificationBox from "../../components/HomePage/NotificationBox/NotificationBox";

const HomePage: React.FC = () => {
    return (
    <div className="container">
        <h1>LE TUE NOTIFICHE</h1>
        <div className="notifications scrollable">
        <div className="notification correct">
            <strong>Notifiche :</strong> Connessione
            <div className="del">
            <div>Delete</div>
            </div>
        </div>
        <div className="notification warning">
            <strong>Notifiche :</strong> Avviso
            <div className="del">
            <div>Delete</div>
            </div>
        </div>
        <div className="notification error">
            <strong>Notifiche :</strong> Errore
            <div className="del">
            <div>Delete</div>
            </div>
        </div>
                {/* Aggiungi altre notifiche qui */}
                <h1>Notifiche</h1>
        <NotificationBox type="success" message="Operazione completata con successo!" />
        <NotificationBox type="warning" message="Attenzione: Verifica i dettagli inseriti." />
        <NotificationBox type="error" message="Errore: Si è verificato un problema." />
        </div>

      {/* Stelle cadenti */}
        <div className="shooting-star star1"></div>
        <div className="shooting-star star2"></div>
        <div className="shooting-star star3"></div>
    </div>
    );
};

export default HomePage;
