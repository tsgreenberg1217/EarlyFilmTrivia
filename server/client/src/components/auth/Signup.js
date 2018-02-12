import React from 'react'
import axios from 'axios'

class Signup extends React.Component{
  constructor(){
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.signup = this.signup.bind(this)
  }

  signup(e){
    e.preventDefault()
    axios.post('http://localhost:5000/signin',{
      username: this.state.username,
      password: this.state.password
    }).then(res => {console.log(res)})

    // fetch('http://localhost:5000/signin', {
    //   Headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   method: "POST",
    //   body:JSON.stringify({
    //     username: 'todd123'
    //   })
    // }).then(res => res.json()).then(json => console.log(json))
  }

  handleNameChange = (username) =>{
    this.setState({username})
  }

  handlePasswordChange = (password) =>{
    this.setState({password})
  }

  render(){
    return(
      <form onSubmit = {(e) =>this.signup(e)}>
      <input value={this.state.username} type = "text" name = "username" placeholder = "username"
      onChange ={(e) => this.handleNameChange(e.target.value)} />
      <input value={this.state.password} type = "password" name = "password" placeholder = "password"
      onChange ={(e) => this.handlePasswordChange(e.target.value)}/>
      <button type = "Submit">Signup</button>
      </form>
    )
  }
}

export default Signup
