import React from 'react'
import axios from 'axios'

class Signup extends React.Component{

  signup(e){
    e.preventDefault()
    // axios.post('http://localhost:5000/signup',{
    //   username: 'todd123',
    //   password: '123'
    // }).then(res => {console.log(res)})

    fetch('http://localhost:5000/signin', {
      Headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body:JSON.stringify({
        username: 'todd123'
      })
    }).then(res => res.json()).then(json => console.log(json))
  }

  render(){
    return(
      <form onSubmit = {(e) =>this.signup(e)}>
      <input type = "text" name = "username" placeholder = "username"/>
      <input type = "password" name = "password" placeholder = "password"/>
      <button type = "Submit"/>
      </form>
    )
  }
}

export default Signup
