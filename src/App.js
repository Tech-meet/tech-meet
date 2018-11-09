import React, { Component } from 'react'
import BetterMeetup from './pages/BetterMeetup'
import { Route, Redirect } from 'react-router-dom'
import './Main.scss'

class App extends Component {
  render() {
    return (
      <div className="Main-App-container">
        <Redirect from="/" to="/meetup-alternative" />
        <Route path="/meetup-alternative" component={BetterMeetup} />
      </div>
    )
  }
}

export default App
