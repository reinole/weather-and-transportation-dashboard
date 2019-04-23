import { useState, useEffect } from 'react';

export default function RealTime() {
    const [realTime, setRealTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        setInterval(() => UpdateTime(), 1000);
    }, []);

    function UpdateTime() {
        setRealTime(new Date().toLocaleTimeString());
    }

    return realTime;
}
