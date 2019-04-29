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

    function updateDate() {
        setCurrentDate(new Date().toLocaleDateString());
    }

    return currentDate;
}

/*  Improvement 

  Function should update on specific time, 12am
  Maybe on change? 

  */
