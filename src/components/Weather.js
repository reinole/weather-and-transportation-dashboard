import React from 'react';
import styled from 'styled-components';

export default function Weather() {
    const [weather, setWeather] = React.useState([]);

    const newDate = new Date();
    let fullDate =
        newDate.getFullYear() +
        '-' +
        (newDate.getMonth() + 1) +
        '-' +
        newDate.getDate();

    React.useEffect(() => {
        fetch(
            `https://rest.tv2.no/weather-dw-rest/forecast/detailed/grouped/place/134650382?days=1&day=${fullDate}`,
            { headers: { 'Content-Type': 'application/json' } }
        )
            .then(res => res.json())
            .then(res => setWeather(res));
    }, []);

    return (
        <div>
            {weather.length > 0 ? (
                <div>{console.log({ weather })}</div>
            ) : (
                <p>henter</p>
            )}
        </div>
    );
}
