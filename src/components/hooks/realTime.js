import { useState, useEffect } from 'react';

export default function CurrentTime() {
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString()
    );

    useEffect(() => {
        setInterval(() => UpdateTime(), 1000);
    }, []);

    function UpdateTime() {
        setCurrentTime(new Date().toLocaleTimeString());
    }

    return currentTime;
}
