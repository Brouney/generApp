import React , {Component}from 'react';
import '../css/App.css';

class Login extends Component {

  constructor(props){
    super(props)
    this.area = props.area
    

  }
    state = {
      credentials:{username:'', password:''}
    }
  inputChanged = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value
    this.setState({credentials:cred})
  }

  register = event => {
    fetch('http://127.0.0.1:8000/api/users/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(this.state.credentials)
    })
    .then(data => data.json())
    .then(
      data => {
        // w tym jest token otrzymany z serwera 
        console.log(data.token);
      }
    ).catch(error => console.error(error))
  }
  

  login = event => {
    //wyslanie posta ze sprawdzeniem czy istnieje uzytkownik
    fetch('http://127.0.0.1:8000/auth/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(this.state.credentials)
    })
    .then(data => data.json())
    .then(
      data => {
        // w tym jest token otrzymany z serwera 
       this.area.setState({token: data.token});
      }
    ).catch(error => console.error(error))
  }

    render() {
      return <div>
        <h1> Login user form</h1>
        <label>
          Username:
          <input type="text" name ="username" 
                  value={this.state.credentials.username}
                  onChange={this.inputChanged}></input>
        </label>
        <label>
          Password:
          <input type="text" name ="password"
                  value={this.state.credentials.password}
                  onChange={this.inputChanged}></input>
        </label>
        <button onClick={this.login}>Login</button>
        <button onClick={this.register}>Register</button>
      </div>

      }
}

export default Login;
