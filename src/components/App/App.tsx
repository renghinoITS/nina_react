import useMQTT from "../../hooks/useMQTT";
import React, { useState } from "react";

const App = () => {
    const { client, messages } = useMQTT({
        ip: "10.10.15.85"
    });

    console.log(messages);

    return (
        <div>
        </div>
    );
};

export default App;
