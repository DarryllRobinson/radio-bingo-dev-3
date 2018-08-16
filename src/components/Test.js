import React, { Component } from 'react'
import { Fetch } from 'react-data-fetching'

export default class Test extends Component {
  render() {
    return (
      <Fetch
        url="https://api.github.com/users/octocat"
      >
        {({ data }) => (
         <div>
          <h1>Username</h1>
          <p>{data.name}</p>
         </div>
        )}
      </Fetch>
    )
  }
}
