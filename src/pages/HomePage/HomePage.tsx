import "./HomePage.css";

import React from "react";
import NotificationBox from "../../components/HomePage/NotificationBox/NotificationBox";

const HomePage: React.FC = () => {
    return (
    <div className="container">
        <h1>LE TUE NOTIFICHE</h1>
            <div className="notifications scrollable">
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
