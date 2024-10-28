import "./NotificationTestPage.css";

import useNotification from "../../hooks/useNotification";
import error from "../../assets/sounds/notificationOk.mp3";

const NotificationTestPage: React.FC= () => {
    const { notify } = useNotification();

    notify("Hai una nuova notifica!",{
        body: "Controlla il tuo profilo per i dettagli."
    }, error);
    
    return (
        <div>
            <button>Invia Notifica</button>
        </div>
    );
  };
  
  export default NotificationTestPage;