import { useState, useEffect } from 'react';

export default function RealDate() {
    const [realDate, setRealDate] = useState(new Date().toLocaleDateString());

    useEffect(() => {
        setInterval(() => updateDate(), 1000 * 60 * 60);
    }, []);

    function updateDate() {
        setRealDate(new Date().toLocaleDateString());
    }

    return realDate;
}
