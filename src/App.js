import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import Weather from './components/Weather';
import Ruter from './components/Ruter';
import Time from './components/Time';
import EventTracker from './components/EventTracker';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="weather-div">
                    <Time />

                    <Wrapper>
                        <Ruter />
                        <Weather />
                    </Wrapper>
                    <Wrapper>
                        <EventTracker />
                        <EventTracker />
                    </Wrapper>
                </div>
            </div>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;

    @media all and (max-width: 700px) {
        flex-direction: column;
    }
`;

//Ting man kan ha i denne:
// Vær
// Ruter'
//  Ha en egen refresh button i Ruter (Hvis det skal være en tablet)
// Dagens kalender oppgaver

export default App;
