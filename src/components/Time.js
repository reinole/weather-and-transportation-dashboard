import React from 'react';
import styled from 'styled-components';

import RealTime from './hooks/realTime';
import RealDate from './hooks/realDate';

export default function Time() {
    return (
        <WatchWrapper>
            <ClockWrapper>
                Klokken er: <Clock>{RealTime()}</Clock>
            </ClockWrapper>
            <DateWrapper>Dato: {RealDate()}</DateWrapper>
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
