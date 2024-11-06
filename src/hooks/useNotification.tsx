const useNotification = () => {
    const playSound = (audioPath: string) => {
        const audio = new Audio(audioPath);
        audio.play().catch(error => console.error(`Errore nella riproduzione del suono: ${error}`));
    };

    const sendNotification = (title: string, options?: NotificationOptions, audioPath?: string) => {
        new Notification(title, options);

        if(audioPath) {
            playSound(audioPath);
        }
    }

    const notify = (title: string, options?: NotificationOptions, audioPath?: string) => {
        if (!("Notification" in window)) {
            console.error("Questo browser non supporta le notifiche.");
            return;
        }

        if (Notification.permission === "granted") {
            sendNotification(title, options, audioPath);
            return;
        }
        
        if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    sendNotification(title, options, audioPath);
                }
            });
        } else {
            console.error("Notifiche disattivate.");
        }
    };

    return { notify };
};

export default useNotification;