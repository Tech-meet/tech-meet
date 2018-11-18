import React, { Component, Suspense } from 'react'
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

let count = 0
function MyAsyncComponentSFC() {
  if (count > 0) {
    return <div>hi</div>
  }
  throw new Promise(resolve =>
    setTimeout(() => {
      count++
      resolve()
    }, 2000)
  )
}

class MyAsyncComponentClass extends Component {
  state = {
    count: 0,
  }

  render() {
    if (this.state.count > 0) {
      return <div>hi</div>
    }
    throw new Promise(resolve =>
      setTimeout(() => {
        this.setState({ count: this.state.count + 1 })
        resolve()
      }, 2000)
    )
  }
}
class App extends Component {
  render() {
    return (
      <div>
        <Suspense maxDuration={1000} fallback={<div>Loading...</div>}>
          asdf
          <MyAsyncComponentClass />
        </Suspense>
      </div>
    )
  }
}

export default App
