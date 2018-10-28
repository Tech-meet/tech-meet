import React, { Component } from 'react'
import styled from 'styled-components'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import { compose, withState } from 'recompose'

const StyledSignupForm = styled.div`
  color: white;
  border: 1px white solid;
  border-radius: 5px;
  padding: 20px;
`

const StyledInput = styled.input`
  font-size: smaller;
`

const CREATE_USER = gql`
  mutation CreateUser($firstName: String!, $lastName: String!) {
    createUser(
      input: { user: { firstName: $firstName, lastName: $lastName } }
    ) {
      user {
        id
        firstName
        lastName
      }
    }
  }
`
const enhance = compose(
  withState('firstName', 'setFirstName', ''),
  withState('lastName', 'setLastName', '')
)

export default enhance(SignupForm)

function SignupForm(props) {
  const { firstName, setFirstName, lastName, setLastName } = props

  return (
    <StyledSignupForm>
      <Mutation mutation={CREATE_USER}>
        {(createUser, { loading, data }) => {
          if (data) {
            return <div>Thanks! We'll email you updates</div>
          }
          return (
            <form
              onSubmit={e => {
                e.preventDefault()
                createUser({ variables: { firstName, lastName } }).then(() => {
                  setFirstName('')
                  setLastName('')
                })
              }}
            >
              <div>
                <StyledInput
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <StyledInput
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
              <div>
                <button type="submit" disabled={loading || data}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          )
        }}
      </Mutation>
    </StyledSignupForm>
  )
}
