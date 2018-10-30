import React from 'react'
import styled from 'styled-components'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import { compose, withState } from 'recompose'

const StyledPledgeForm = styled.div`
  color: white;
  border: 1px white solid;
  border-radius: 5px;
  padding: 20px;
`

const StyledInput = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px #ccc solid;
  box-shadow: none;
  color: #222;
`

const StyledButton = styled.button`
  background-color: #6a958e;
  color: white;
  font-size: large;
  padding: 5px 10px;
  cursor: pointer;
  border: 0;
  box-shadow: none;
  border-radius: 5px;

  :hover {
    background-color: #547771;
  }
`

const CREATE_USER = gql`
  mutation addPledge($email: String!) {
    addPledge(email: $email) {
      email
    }
  }
`
const enhance = compose(withState('email', 'setEmail', ''))

export default enhance(PledgeForm)

function PledgeForm(props) {
  const { email, setEmail } = props

  return (
    <StyledPledgeForm>
      <Mutation mutation={CREATE_USER}>
        {(createUser, { loading, data }) => {
          if (data) {
            return <div>Thanks! We'll email you updates</div>
          }
          return (
            <form
              onSubmit={e => {
                e.preventDefault()
                createUser({ variables: { email } }).then(() => {
                  setEmail('')
                })
              }}
            >
              <div>
                <StyledInput
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email address"
                />
              </div>
              <div>
                <StyledButton type="submit" disabled={loading || data}>
                  {loading ? 'Submitting...' : 'Submit'}
                </StyledButton>
              </div>
            </form>
          )
        }}
      </Mutation>
    </StyledPledgeForm>
  )
}
