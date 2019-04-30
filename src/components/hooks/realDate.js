import { useState, useEffect } from 'react';

export default function CurrentDate() {
    const [currentDate, setCurrentDate] = useState(
        new Date().toLocaleDateString()
    );

    function UpdateIfDateChanged() {
        const newDate = new Date().toLocaleDateString();

        if (newDate !== currentDate) {
            setCurrentDate(newDate);
        }
    }

    useEffect(() => {
        setInterval(() => UpdateIfDateChanged(), 1000 * 60);
    }, []);

    return currentDate;
}
