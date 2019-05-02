import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useSanityFetch from './hooks/sanityFetch';
import { closestTo, format, getDate, getMonth } from 'date-fns';

export default function EventTracker() {
    const todayDate = format(new Date(), 'YYYY-MM-DD');

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
        let upcomingEventDates = data.filter(events => events.date > todayDate);

        upcomingEventDates.map(ev => {
            return eventDates.push(ev.date);
        });

        let nextEventDate = closestTo(todayDate, eventDates);

        let nextEvent = format(new Date(nextEventDate), 'YYYY-MM-DD');

        nextEventObject = upcomingEventDates.filter(
            event => event.date === nextEvent
        );

        setNextEventObject(nextEventObject);
    }

    return nextEventObject.map(event => {
        switch (event.eventType) {
            case 'birthday':
                return RenderHoliday(event);
            case 'holiday':
                return RenderHoliday(event);
            case 'special':
                return RenderHoliday(event);
            default:
                console.log('default');
        }
    });

    function RenderHoliday(event) {
        let day = getDate(new Date(event.date));
        let month = getMonth(new Date(event.date));
        let formatMonth = nameMonths[month];

        return (
            <Wrapper key={event._id}>
                <EventImage imageSrc={event.posterImage}>
                    <div style={{ display: 'flex', height: '100%' }}>
                        <TextWrapper>
                            <EventText>{EventTitle(event.eventType)}</EventText>
                            <EventName>{event.title}</EventName>
                            <EventDate>
                                {day} {formatMonth}
                            </EventDate>
                            <EventDate>{Countdown(event.date)}</EventDate>
                        </TextWrapper>
                        <TextWrapper />
                    </div>
                </EventImage>
            </Wrapper>
        );
    }

    function Countdown(eventDate) {
        console.log(eventDate);
        const oneDay = 24 * 60 * 60 * 1000;
        let countdownDate = Math.round(
            Math.abs(
                (new Date(eventDate).getTime() - new Date().getTime()) / oneDay
            )
        );

        console.log(countdownDate);

        return <span>Kun {countdownDate} igjen!</span>;
    }

    function EventTitle(eventType) {
        switch (eventType) {
            case 'holiday':
                return <span>Helligdag</span>;
            case 'birthday':
                return <span>Bursdag</span>;
            case 'special':
                return <span>Event</span>;
            default:
                return <span>event</span>;
        }
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
