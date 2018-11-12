import React, { Component } from 'react'
import styled from 'styled-components'
import PledgeForm from '../components/PledgeForm'

const StyledBetterApp = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;

  * + * {
    margin-top: 15px;
  }
`

const HeaderText = styled.div`
  font-size: xx-large;
  color: white;
  font-family: Poppins, sans-serif;
  font-weight: 500;
`

const MoreText = styled.div`
  font-size: large;
  color: white;
  font-style: italic;
`

const CallToAction = styled.div`
  color: white;
  font-size: large;
  color: white;
`

const WhatYoullGet = styled.div`
  color: white;
`

const Privacy = styled.div`
  color: #ddd;
  font-size: smaller;
`

export default class BetterMeetup extends Component {
  render() {
    return (
      <StyledBetterApp>
        <HeaderText>Want a better way to organize meetups?</HeaderText>
        <MoreText>
          We did too. That's why we built a better alternative.
        </MoreText>
        <WhatYoullGet>
          <strong>Our favorite improvements?</strong> It's way faster and has a
          rich text editor for creating events, so you can add bold text, change
          font size, insert inline images, etc.
        </WhatYoullGet>
        <CallToAction>Want to try it? Sign up here.</CallToAction>
        <PledgeForm />
        <Privacy>
          The email address you provide here and now is used to notify you of
          updates to the site, only. It will not be sold or given to any 3rd
          parties for any reason.
        </Privacy>
      </StyledBetterApp>
    )
  }
}
