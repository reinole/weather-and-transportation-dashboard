import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

export default function Weather() {
    const [weather, setWeather] = useState([]);

    const newDate = new Date();
    let fullDate =
        newDate.getFullYear() +
        '-' +
        (newDate.getMonth() + 1) +
        '-' +
        newDate.getDate();

    useEffect(() => {
        fetch(
            `https://rest.tv2.no/weather-dw-rest/forecast/detailed/grouped/place/134650382?days=1&day=${fullDate}`,
            { headers: { 'Content-Type': 'application/json' } }
        )
            .then(res => res.json())
            .then(res => setWeather(res));
    }, []);

    return (
        <Wrapper>
            {weather.length > 0 ? (
                <TableWrapper>
                    {/* {console.log({ weather })} */}
                    <Table>
                        <TableBody>
                            <TableRowHead>
                                <TableHead>Tid</TableHead>
                                <TableHead>Vær</TableHead>
                                <TableHead>Føles som</TableHead>
                                <TableHead>Regn</TableHead>
                                <TableHead>Vind</TableHead>
                            </TableRowHead>
                            {weather[0].weatherSixHourSteps.map((day, i) => {
                                let endTime = (
                                    '0' + new Date(day.endtime).getHours()
                                ).slice(-2);
                                let startTime = (
                                    '0' + new Date(day.startTime).getHours()
                                ).slice(-2);

                                return (
                                    <TableRow key={i + '40'}>
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
                </TableWrapper>
            ) : (
                <p>henter</p>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    flex: 1;
    height: 100%;
`;

const TableWrapper = styled.div``;

const Table = styled.div`
    background-color: white;
    margin: 0 4px 4px 2px;
    width: auto;
    display: flex;
    flex: 1;
`;

const TableBody = styled.div`
    width: 100%;
`;

const TableRowHead = styled.div`
    display: flex;
    border-bottom: 1px solid lightblue;
`;

const TableRow = styled.div`
    display: flex;

    &:nth-child(even) {
        background-color: #ededed;
    }
`;

const TableHead = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.5rem;
    flex: 1;
    margin: 0;
    border-left: 1px solid white;
    border-right: 1px solid white;
`;

const TableData = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    flex: 1;
    margin: 0;
    border-right: 1px solid lightblue;

    &:last-of-type {
        border-right: none;
    }

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
            border-bottom: 1px solid lightblue;
        `};
`;
