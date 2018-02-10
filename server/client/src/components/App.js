import React from 'react'
import Header from './Header'
import Signup from './auth/Signup'


class App extends React.Component{
  render(){
    return(
      <div>
        <Signup/>
        <h1>
          Welcome to the trivia game
        </h1>
      </div>
    )
  }
}

export default App
