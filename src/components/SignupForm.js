import React, { Component } from 'react'
import styled from 'styled-components'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const StyledSignupForm = styled.div`
  color: white;
  border: 1px white solid;
  border-radius: 5px;
  padding: 20px;
`

const GET_MOVIES = gql`
  query {
    allUsers {
      nodes {
        id
        firstName
        lastName
      }
    }
  }
`

export default class SignupForm extends Component {
  render() {
    return (
      <StyledSignupForm>
        <Query query={GET_MOVIES}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error :(</div>
            if (data) {
              return data.allUsers.nodes.map(x => (
                <div key={x.id}>
                  {x.firstName} {x.lastName}
                </div>
              ))
            }
            return ''
          }}
        </Query>
      </StyledSignupForm>
    )
  }
}
