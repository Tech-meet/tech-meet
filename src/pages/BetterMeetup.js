import React, { Component } from 'react'
import PledgeForm from '../components/PledgeForm'

export default class BetterMeetup extends Component {
  render() {
    return (
      <div className="better-meetup-container">
        <div>
          <div>
            <h1>Want a better way to organize meetups?</h1>
            <h2>We did too. That's why we built a better alternative.</h2>
          </div>
          <div>
            <div>Want to try it? Sign up here.</div>
            <PledgeForm />
            <div className="disclaimer">
              The email address you provide here and now is used to notify you
              of updates to the site, only. It will not be sold or given to any
              3rd parties for any reason.
            </div>
          </div>
          <div>
            <div>
              <strong>Our favorite improvements?</strong> It's way faster and
              has a rich text editor for creating events, so you can add bold
              text, change font size, insert inline images, etc.
            </div>
            <div className="logo-container">
              <h1>Gatherings.cc</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
