import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import Weather from './components/Weather';
import Ruter from './components/Ruter';
import Time from './components/Time';

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
                </div>
            </div>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
`;

//Ting man kan ha i denne:
// Vær
// Ruter
// Dagens kalender oppgaver

export default App;
