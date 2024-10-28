import "./NotificationTestPage.css";

import useNotification from "../../hooks/useNotification";
import error from "../../assets/sounds/error.mp3";

const NotificationTestPage: React.FC= () => {
    const { notify } = useNotification();

    const handleNotify = () => {
        notify("Hai una nuova notifica!",{
            body: "Controlla il tuo profilo per i dettagli."
        }, error);
    }
    
    return (
        <div>
            <button onClick={handleNotify}>Invia Notifica</button>
        </div>
    );
  };
  
  export default NotificationTestPage;