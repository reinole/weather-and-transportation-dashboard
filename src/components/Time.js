import React from 'react';
import styled from 'styled-components';

export default function Time() {
    const hour = ('0' + new Date().getHours()).slice(-2);
    const minute = ('0' + new Date().getMinutes()).slice(-2);

    const week = [
        'Søndag',
        'Mandag',
        'Tirsdag',
        'Onsdag',
        'Torsdag',
        'Fredag',
        'Lørdag'
    ];

    const month = [
        'Januar',
        'Februar',
        'Mars',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'November',
        'Desember'
    ];

    const displayDay = week[new Date().getDay()];
    const displayDate = new Date().getDate();
    const displayMonth = month[new Date().getMonth()];

    return (
        <WatchWrapper>
            <ClockWrapper>
                Klokken er:{' '}
                <Clock>
                    {hour}:{minute}
                </Clock>
            </ClockWrapper>
            <DateWrapper>
                Dato: {displayDay} {displayDate}, {displayMonth}
            </DateWrapper>
        </WatchWrapper>
    );
}

const WatchWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: white;
    padding: 1rem;
    border-bottom: 4px solid #ededed;

    p {
        margin: 0;
    }
`;

const ClockWrapper = styled.div`
    display: flex;
`;

const Clock = styled.p`
    font-weight: bold;
    padding-left: 6px;
`;

const DateWrapper = styled.div`
    display: flex;
`;
