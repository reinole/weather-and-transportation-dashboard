import React from 'react';
import styled from 'styled-components';

import CurrentTime from './hooks/realTime';
import CurrentDate from './hooks/realDate';

export default function Time() {
    return (
        <WatchWrapper>
            <ClockWrapper>
                Klokken er: <Clock>{CurrentTime()}</Clock>
            </ClockWrapper>
            <DateWrapper>
                Dato: <Clock>{CurrentDate()}</Clock>
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
