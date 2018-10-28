import React, { Component } from 'react'
import styled from 'styled-components'

const StyledSignupForm = styled.div`
  color: white;
  border: 1px white solid;
  border-radius: 5px;
  padding: 20px;
`

export default class SignupForm extends Component {
  render() {
    return <StyledSignupForm>SignupForm</StyledSignupForm>
  }
}
