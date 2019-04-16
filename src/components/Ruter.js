import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Ruter() {
    const [ruterData, setRuterData] = useState('');

    const query = `{
        trip(
          from: {
              name: "Askergata 1, Oslo"
          coordinates: {
              longitude: 10.769164365069429, 
              latitude: 59.930828286059814
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
        fetch('https://api.entur.io/journey-planner/v2/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(res => setRuterData(res.data.trip));
    }, []);

    return (
        <RuterWrapper>
            {ruterData ? (
                ruterData.tripPatterns.map(trips => {
                    //console.log({ trips });
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
                        <SingleTripWrapper>
                            {trips.legs.map(leg => {
                                if (leg.mode === 'bus') {
                                    return (
                                        <BusName>
                                            {
                                                leg.fromEstimatedCall
                                                    .destinationDisplay
                                                    .frontText
                                            }
                                        </BusName>
                                    );
                                }
                            })}

                            <TripTime>
                                <p>
                                    {startTimeHours}:{startTimeMinute}
                                </p>
                                <p>-</p>
                                <p>
                                    {endTimeHours}:{endTimeMinutes}
                                </p>
                            </TripTime>
                            <TripDuration>
                                <p> Varighet: {duration} minutter</p>
                            </TripDuration>
                        </SingleTripWrapper>
                    );
                })
            ) : (
                <p>Henter</p>
            )}
        </RuterWrapper>
    );
}

const RuterWrapper = styled.div`
    background-color: #ededed;
    width: 100%;
`;

const SingleTripWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 4px 4px 4px;

    background-color: white;
    padding: 0.5rem 1rem;
`;

const BusName = styled.div`
    display: flex;
    margin-bottom: 6px;
    font-size: 1rem;
`;

const TripTime = styled.div`
    display: flex;
    p {
        margin: 0;
        font-weight: bold;
        font-size: 0.8rem;
    }
`;

const TripDuration = styled.div`
    display: flex;
    p {
        margin: 0;
        font-size: 0.8rem;
    }
`;
