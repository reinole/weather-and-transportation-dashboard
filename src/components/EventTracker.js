import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useSanityFetch from './hooks/sanityFetch';
import CurrentDate from './hooks/realDate';
import { closestTo, format, getDate, getMonth } from 'date-fns';

export default function EventTracker() {
    const todayDate = CurrentDate();

    const nameMonths = [
        'Januar',
        'Februar',
        'Mars',
        'April',
        'Mai',
        'juni',
        'Juli',
        'August',
        'Oktober',
        'November',
        'Desember'
    ];

    let [nextEventObject, setNextEventObject] = useState([]);

    const query = `*[_type == "event" ] {
        date, 
        eventType,
        title,  
        "posterImage": poster.asset->url  

    }`;

    const [busy, data, error] = useSanityFetch({
        query,
        fetchOnMount: true,
        initialValue: []
    });

    useEffect(() => {
        NextEvent();
    }, [data]);

    async function NextEvent() {
        let eventDates = [];
        await data.map(events => {
            return eventDates.push(events.date);
        });
        let nextEventDate = closestTo(todayDate, eventDates);
        let nextEvent = format(
            new Date(nextEventDate).toLocaleDateString(),
            'YYYY-DD-MM'
        );

        nextEventObject = data.filter(event => event.date === nextEvent);

        setNextEventObject(nextEventObject);
    }

    return nextEventObject.map(event => {
        switch (event.eventType) {
            case 'birthday':
                return RenderBirthday(event);
            case 'holiday':
                return RenderHoliday(event);
            case 'special':
                return RenderSpecial(event);
            default:
                console.log('default');
        }
    });

    function RenderBirthday(event) {
        return <Wrapper key={event._id}>Bursdag</Wrapper>;
    }

    function RenderHoliday(event) {
        console.log(event);
        console.log(event.date);

        let day = getDate(new Date(event.date));
        let month = getMonth(new Date(event.date));
        let formatMonth = nameMonths[month];

        return (
            <Wrapper key={event._id}>
                <EventImage imageSrc={event.posterImage}>
                    <div style={{ display: 'flex', height: '100%' }}>
                        <TextWrapper>
                            <EventText>Neste helligdag</EventText>
                            <EventName>{event.title}</EventName>
                            <EventDate>
                                {day} {formatMonth}
                            </EventDate>
                        </TextWrapper>
                        <TextWrapper />
                    </div>
                </EventImage>
            </Wrapper>
        );
    }

    function RenderSpecial(event) {
        return <Wrapper key={event._id}>Spesial</Wrapper>;
    }

    function Countdown() {
        return <div />;
    }
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    background-color: #ededed;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 0 2px 0px 4px;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    width: 100%;
`;

const EventName = styled.p`
    top: 1rem;
    left: 1rem;
    margin: 0;
`;

const EventText = styled.p`
    top: 0.5rem;
    left: 1rem;
    z-index: 2;

    margin: 0;
`;

const EventDate = styled.p`
    margin: 0;
`;

const EventImage = styled.div`
    background-image: url(${props => props.imageSrc});
    width: 100%;
    height: 237px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;'
    
`;
