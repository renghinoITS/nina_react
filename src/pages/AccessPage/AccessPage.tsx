import React from "react";
import "./AccessPage.css";

const AccessPage: React.FC = () => {
  return (
    <div className="container">
      <h1>NINA REACT &#127776;</h1>
      <div className="ip-input">
        <label htmlFor="ip-address">Inserisci il tuo indirizzo IP:</label>
        <input type="text" id="ip-address" placeholder="Es. 192.168.1.1" />

        <button id="fetchButton" className="btn">
          <strong>CERCA</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>
          <div id="glow">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </button>
      </div>
      <div id="apod-content" className="apod-content"></div>
    </div>
  );
};

export default AccessPage;
