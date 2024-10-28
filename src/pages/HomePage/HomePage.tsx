import React from "react";
import "./HomePage.css";

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
      </div>

      {/* Stelle cadenti */}
      <div className="shooting-star star1"></div>
      <div className="shooting-star star2"></div>
      <div className="shooting-star star3"></div>
    </div>
  );
};

export default HomePage;
