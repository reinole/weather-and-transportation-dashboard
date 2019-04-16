import React from 'react';
import styled, { css } from 'styled-components';

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
                <div>
                    {console.log({ weather })}
                    <Table>
                        <TableBody>
                            <TableRowHead>
                                <TableHead>Tid</TableHead>
                                <TableHead>Vær</TableHead>
                                <TableHead>Føles som</TableHead>
                                <TableHead>Regn</TableHead>
                                <TableHead>Vind</TableHead>
                            </TableRowHead>
                            {weather[0].weatherSixHourSteps.map(day => {
                                let endTime = (
                                    '0' + new Date(day.endtime).getHours()
                                ).slice(-2);
                                let startTime = (
                                    '0' + new Date(day.startTime).getHours()
                                ).slice(-2);

                                return (
                                    <TableRow>
                                        <TableData time>
                                            {startTime} - {endTime}
                                        </TableData>
                                        <TableData weather>
                                            {day.temperature}°
                                        </TableData>
                                        <TableData>
                                            {day.temperatureFeelsLike}
                                        </TableData>
                                        <TableData>
                                            {day.precipitation}
                                        </TableData>
                                        <TableData>{day.windSpeed}</TableData>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <p>henter</p>
            )}
        </div>
    );
}

const Table = styled.div`
    background-color: white;
    margin: 0 4px 4px 4px;
    width: auto;
    display: flex;
    flex: 1;
`;

const TableBody = styled.div``;

const TableRowHead = styled.div`
    display: flex;
    border-bottom: 1px solid lightblue;
`;

const TableRow = styled.div`
    display: flex;
    border-left: 1px solid white;
    border-right: 1px solid white;

    &:nth-child(even) {
        background-color: #ededed;
    }
`;

const TableHead = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 2.5rem;
    margin: 0;
    border-left: 1px solid white;
    border-right: 1px solid white;
`;

const TableData = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 2.5rem;
    margin: 0;
    border-right: 1px dashed lightblue;

    ${props =>
        props.weather &&
        css`
            color: #ff9400;
            font-size: 1.2rem;
        `};

    ${props =>
        props.time &&
        css`
            color: white;
            background-color: #273b4f;
            border-bottom: 1px dashed lightblue;
        `};
`;
