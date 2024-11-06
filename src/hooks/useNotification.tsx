const useNotification = () => {

    // Function to play a sound from the provided audio path
    const playSound = (audioPath: string) => {
        const audio = new Audio(audioPath);

        // Play the audio and handle any errors that might occur
        audio.play().catch(error => console.error(`Error playing sound: ${error}`));
    };

    // Function to send a browser notification with an optional sound
    const sendNotification = (title: string, options?: NotificationOptions, audioPath?: string) => {

        // Creates and displays the notification with the given title and options
        new Notification(title, options);

        // If an audio path is provided, play the sound
        if(audioPath) {
            playSound(audioPath);
        }
    }

    // Main function to trigger a notification with an optional sound
    const notify = (title: string, options?: NotificationOptions, audioPath?: string) => {

        // Check if the browser supports notifications
        if (!("Notification" in window)) {
            console.error("This browser does not support notifications.");
            return;
        }

        // If notification permission is granted, send the notification immediately
        if (Notification.permission === "granted") {
            sendNotification(title, options, audioPath);
            return;
        }
        
        // If permission is not denied, request permission from the user
        if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {

                // If permission is granted after request, send the notification
                if (permission === "granted") {
                    sendNotification(title, options, audioPath);
                }
            });
        } else {
            
            // Log an error if notifications are denied
            console.error("Notifications are disabled.");
        }
    };

    // Return the notify function to allow other components to use it
    return { notify };
};

export default useNotification;
