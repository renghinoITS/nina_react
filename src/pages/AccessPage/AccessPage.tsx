import "./AccessPage.css";

import React from "react";
import StarButton from "../../components/Common/StarButton/StarButton";

const AccessPage: React.FC = () => {
    return (
        <div className="access-box">
            <h1>NINA REACT &#127776;</h1>
            <div className="access-box-form">
                
                <div className="access-box-form-row">
                    <label htmlFor="ip-address">IP:</label>
                    <input type="text" id="ip-address" placeholder="Es. 192.168.1.1" />

                    <label htmlFor="porta">Porta:</label>
                    <input type="text" id="porta" placeholder="Es. 8080" />
                </div>
                <div className="access-box-form-row">
                    <label htmlFor="topic">Topic:</label>
                    <input type="text" id="topic" placeholder="Es. test/topic" />
                </div>

                <StarButton buttonText="CONNETTI" isLoading={false}/>
            </div>
            <div id="apod-content" className="apod-content"></div>
        </div>
    );
};

export default AccessPage;
