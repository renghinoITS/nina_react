import "./BrokerForm.css";
import "./AccessPage.css";
import React, { useState } from "react";
import StarButton from "../../components/Common/StarButton";


const AccessPage: React.FC = () => {
    const [formState, setFormState] = useState({
        ipAddress: "",
        porta: "",
        topic: "",
        isLoading: false,
        error: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState((prevState) => ({ ...prevState, isLoading: true }));

        // Simulazione di un controllo di connessione
        setTimeout(() => {
            if (formState.ipAddress && formState.porta && formState.topic) {
                setFormState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    error: ""
                }));
            } else {
                setFormState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    error: "Tutti i campi sono obbligatori"
                }));
            }
        }, 2000);
    };

    return (
        <form className="access-box" onSubmit={handleSubmit}>
            <h1>NINA REACT &#127756;</h1>
            <div className="access-box-form">
                <div className="access-box-form-row">
                    <label htmlFor="ip-address">IP:</label>
                    <input
                        type="text"
                        id="ipAddress"
                        placeholder="Es. 192.168.1.1"
                        value={formState.ipAddress}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="porta">Porta:</label>
                    <input
                        type="text"
                        id="porta"
                        placeholder="Es. 8080"
                        value={formState.porta}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="access-box-form-row">
                    <label htmlFor="topic">Topic:</label>
                    <input
                        type="text"
                        id="topic"
                        placeholder="Es. test/topic"
                        value={formState.topic}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <StarButton buttonText={formState.isLoading ? "Connessione..." : "CONNETTI"} isLoading={formState.isLoading} />
            </div>
            {formState.error && <div id="apod-content" className="apod-content error">{formState.error}</div>}
        </form>
    );
};

export default AccessPage;
