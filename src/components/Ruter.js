import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { angle, man } from '../utils/Icons';

export default function Ruter() {
    const [ruterData, setRuterData] = useState('');

    const query = `{
        trip(
          from: {
          coordinates: {
            longitude: 10.766396, 
            latitude: 59.928188
            }
        }
          to: {
            place:"Karenlyst allê 20"
            coordinates: {
                longitude: 10.685663435668069, 
                latitude: 59.91842335751793
            }
          }
        )
      
      #### Requested fields
        {
          tripPatterns {
            startTime
            endTime
            duration
            legs {
                expectedStartTime
                fromEstimatedCall{
                    date
                    destinationDisplay {
                        frontText
                    }
                }
                mode
                distance
                line {
                  id
                  publicCode
                }
              }
          }
        }
      }`;

    useEffect(() => {
        fetchRuter();
        setInterval(() => fetchRuter(), 1000 * 60);
    }, []);

    function fetchRuter() {
        fetch('https://api.entur.io/journey-planner/v2/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(res => setRuterData(res.data.trip));
    }

    return (
        <RuterWrapper>
            {ruterData ? (
                ruterData.tripPatterns.map((trips, i) => {
                    let startTimeHours = (
                        '0' + new Date(trips.startTime).getHours()
                    ).slice(-2);
                    let startTimeMinute = (
                        '0' + new Date(trips.startTime).getMinutes()
                    ).slice(-2);

                    let endTimeHours = (
                        '0' + new Date(trips.endTime).getHours()
                    ).slice(-2);
                    let endTimeMinutes = (
                        '0' + new Date(trips.endTime).getMinutes()
                    ).slice(-2);

                    let duration = Math.floor(trips.duration / 60);

                    return (
                        <SingleTripWrapper key={i + '10'}>
                            <TripTime>
                                <TripStartEnd>
                                    {startTimeHours}:{startTimeMinute}
                                </TripStartEnd>
                                <TripStartEnd>-</TripStartEnd>
                                <TripStartEnd>
                                    {endTimeHours}:{endTimeMinutes}
                                </TripStartEnd>
                                <TripDuration>{duration}min</TripDuration>
                            </TripTime>
                            {RenderLegs(trips)}
                        </SingleTripWrapper>
                    );
                })
            ) : (
                <p>Henter</p>
            )}
        </RuterWrapper>
    );
}

function RenderLegs(trips) {
    function ShowDestination() {
        const destination = trips.legs.filter(leg => leg.mode === 'bus')[0]
            .fromEstimatedCall;

        if (destination !== null) {
            return <span>{destination.destinationDisplay.frontText}</span>;
        }
    }

    return (
        <TripLegs>
            <VizualTravel>
                {trips.legs.map((leg, i) => {
                    if (leg.mode === 'foot') {
                        return (
                            <BusName key={i + '20'}>
                                <Svg>{man}</Svg>
                            </BusName>
                        );
                    }
                    if (leg.mode === 'bus') {
                        let busNumber = leg.line.publicCode;
                        return (
                            <BusName key={i + '30'}>
                                <BusNumber>{busNumber}</BusNumber>
                                <Svg angle>{angle}</Svg>
                            </BusName>
                        );
                    }
                })}
            </VizualTravel>

            <BusName>{ShowDestination()}</BusName>
        </TripLegs>
    );
}

const RuterWrapper = styled.div`
    background-color: #ededed;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const SingleTripWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 2px 4px 4px;

    background-color: white;
    padding: 0.5rem 1rem;
`;

const TripLegs = styled.div`
    display: flex;
    margin-top: 6px;
    justify-content: space-between;
`;

const VizualTravel = styled.div`
    display: flex;
`;

const BusName = styled.div`
    display: flex;
    margin-bottom: 6px;
    font-size: 1rem;
`;

const Svg = styled.div`
    display: flex;
    align-items: center;
    svg {
        padding: 4px 6px 4px 0;
        height: 1rem;
        width: 1rem;
    }

    ${props =>
        props.angle &&
        css`
            svg {
                width: 0.6rem;
            }
        `}
`;

const BusNumber = styled.div`
    background-color: red;
    padding: 2px 8px;
    border-radius: 2px;
    color: white;
    margin-right: 8px;
    svg {
        height: 1.3rem;
        g {
            path {
                background-color: white;
            }
        }
    }
`;

const TripTime = styled.div`
    display: flex;
`;

const TripStartEnd = styled.p`
    margin: 0;
    font-weight: bold;
    font-size: 1rem;
`;

const TripDuration = styled.p`
    margin: 0;
    padding-left: 0.5rem;
    font-weight: initial;
    color: gray;
    font-size: 0.8rem;
`;
