import React, { Component } from 'react'
import styled from 'styled-components'
import SignupForm from './../components/SignupForm'

const StyledBetterApp = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding: 20px;
`

const HeaderText = styled.div`
  font-size: xx-large;
  color: white;
`

const MoreText = styled.div`
  font-size: large;
  color: white;
  font-style: italic;
`

const X = styled.div`
  color: white;
  font-size: large;
  color: white;
`

const WhatYoullGet = styled.div`
  color: white;
`

export default class BetterMeetup extends Component {
  render() {
    return (
      <StyledBetterApp>
        <HeaderText>Want a better way to organize meetups?</HeaderText>
        <MoreText>
          We did too. That's why we built a better alternative.
        </MoreText>
        <X>Want to try it? Sign up here.</X>
        <SignupForm />
        <WhatYoullGet>What you'll get: blah</WhatYoullGet>
      </StyledBetterApp>
    )
  }
}
