import React, { Component } from 'react'
import styled from 'styled-components'
import BetterMeetup from './pages/BetterMeetup'

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: lightcoral;
`

class App extends Component {
  render() {
    return (
      <StyledApp>
        <BetterMeetup />
      </StyledApp>
    )
  }
}

export default App
