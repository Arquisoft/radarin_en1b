import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {addUserOrUpdateLocation,getNearFriends} from '../api/api'

class EmailForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {email: '', enabled: false, welcomeMsg: ''}
  }

  componentDidMount(){
    this.fetchUsers()
  }

  changeEmail(e) {
    const email = e.target.value ;
    this.setState({email: email});
  }

  changeUserName(e) {
    const username = e.target.value ;
    this.setState({username: username});
  }

  async registerUser(){
      let response = await addUserOrUpdateLocation(this.state.email, [-5.66152, 43.53573])
      console.log(response)
      if (response.error)
        this.setState({welcomeMsg:response.error})
      else
        this.setState({welcomeMsg:"Unexpected error, maybe the restapi is still sleeping..."})
      //Refresh the users
      this.fetchUsers()
  }

  async fetchUsers(){
    try{
      let users = await getNearFriends([-5.66152, 43.53663], ["user1@user1.com", "user2@user2.com"])
      console.log(users)
      this.props.refreshUsers(users)
    }
    catch(error)
    {
      console.log("Error fetching user list from restapi. Is it on?")
    }
  }

  async handleSubmit(e) {
    e.preventDefault()
    //Add the user to the database
    if (this.state.email){
      this.registerUser()
    }
    else
        this.setState({welcomeMsg:'ERROR: You must fill both fields!'})
  }

  render(){
    return(
          <Form name="register" onSubmit={this.handleSubmit.bind(this)}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.changeEmail.bind(this)} value={this.state.email}/>
              <Form.Text className="text-muted">
                Careful! Your email will be public!
              </Form.Text>
            </Form.Group>
        
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <div>
              <span hidden={this.state.welcomeMsg===''}>{this.state.welcomeMsg}</span>
            </div>
          </Form>
    )
  }
}

export default EmailForm