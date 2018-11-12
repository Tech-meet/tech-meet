import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import Home from './Home'
import Dashboard from './Dashboard'
import Nav from '../components/Nav'

const GET_USER = gql`
  query GetUser {
    getUser {
      id
    }
  }
`

class App extends Component {
  render() {
    return (
      <Query query={GET_USER}>
        {({ data, loading }) => (
          <div className="app-container">
            <Nav />
            <div>loading: {loading ? 'true' : 'false'}</div>
            <Route
              path="/"
              exact
              render={() => <>{data.getUser ? <Dashboard /> : <Home />}</>}
            />
          </div>
        )}
      </Query>
    )
  }
}

export default App
