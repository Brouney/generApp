import React, {Component} from 'react';
import '../css/App.css';
// import { useForm } from "react-hook-form";

class Login extends Component {

  constructor(props){
    super(props)
    this.area = props.area
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }


  state = {
    credentialsRegister: {usernameRegister:'', passwordRegister:''},
    credentialsLogin: {usernameLogin:'', passwordLogin:''},
    errors: []
  }


  inputChangedRegister = event => {
    const cred = this.state.credentialsRegister;
    cred[event.target.name] = event.target.value;
    this.setState({credentialsRegister: cred});

    // console.log(event.target.name);
    // console.log(event.target.value);
    // console.log(cred);
  }

  inputChangedLogin = event => {
    const cred = this.state.credentialsLogin;
    cred[event.target.name] = event.target.value;
    this.setState({credentialsLogin: cred});

    // console.log(event.target.name);
    // console.log(event.target.value);
    // console.log(cred);
  }

  register = event => {
    console.log(this.state.credentialsRegister);
    var tmp = {};
    tmp["username"] = this.state.credentialsRegister["usernameRegister"];
    tmp["password"] = this.state.credentialsRegister["passwordRegister"];

    fetch('http://127.0.0.1:8000/api/users/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(tmp)
    })
    .then(data => data.json())
    .then(
      data => {
        // w tym jest token otrzymany z serwera 
        // console.log(data.token);
        this.area.setState({token: data.token});
      }
    ).catch(error => console.error(error))
  }
  

  login = event => {
    var tmp = {};
    tmp["username"] = this.state.credentialsLogin["usernameLogin"];
    tmp["password"] = this.state.credentialsLogin["passwordLogin"];
    
    console.log(tmp);
    //wyslanie posta ze sprawdzeniem czy istnieje uzytkownik
    fetch('http://127.0.0.1:8000/auth/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(tmp)
    })
    .then(data => data.json())
    .then(
      data => {
        // w tym jest token otrzymany z serwera 
       this.area.setState({token: data.token});
      }
    ).catch(error => console.error(error))
  }


  handleSubmitForm(e) {
    e.preventDefault();

    const username = this.state.credentialsRegister.usernameRegister;
    const password = this.state.credentialsRegister.passwordRegister;
    const repeatPassword = this.repeatPasswordInput.value;

    const errors = this.validate(username, password, repeatPassword);
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }
    
    this.register();
  }

  render() {
    const { errors } = this.state;
    return (
<div>
        <header><h1><a href="start.jsp" style={{color: "white"}}><i className="fa fa-home"></i></a></h1></header>  
        {/* {errors.map(error => (
          <p key={error}>Error: {error}</p>
        ))} */}
         <table border="1" bgcolor="gray">
           <tbody>
	         <tr><th><big>GenerApp - serwis wiedzy o algorytmach genetycznych</big></th></tr>
           </tbody>
	       </table>
        <table>
          <tbody>
          <tr>
              <td><input type="text"
                          name="usernameRegister"
                          placeholder="Nazwa użytkownika"
                          // value={this.state.credentials.username}
                          onChange={this.inputChangedRegister} />
                </td>
              <td><span style={{color:"red"}} id="usererror">*</span></td>
          </tr>
          <tr>
              <td><input type="password"
                          name="passwordRegister"
                          placeholder="Hasło"
                          // value={this.state.credentials.password}
                          onChange={this.inputChangedRegister} /></td>
              <td><span style={{color:"red"}} id="passerror">*</span></td>
          </tr>
          <tr>
              <td><input type="password" placeholder='Powtórz hasło' ref={repeatPassword => (this.repeatPasswordInput = repeatPassword)} /></td>
              <td><span style={{color:"red"}} id="cpasserror">*</span></td>
            </tr>
          <tr>
              <td><button type="submit" className="btn btn-primary" onClick={this.handleSubmitForm}>Zarejestruj się</button></td>
          </tr>
          </tbody>
        </table>

        <br />

      <table>
          <tbody>
          <tr>
              <td><input type="text"
                          name="usernameLogin"
                          placeholder="Nazwa użytkownika"
                          onChange={this.inputChangedLogin} />
              </td>
              <td><span style={{color:"red"}} id="usererror">*</span></td>
          </tr>
          <tr>
              <td><input type="password"
                          name="passwordLogin"
                          placeholder="Hasło"
                          onChange={this.inputChangedLogin} />
              </td>
              <td><span style={{color:"red"}} id="passerror">*</span></td>
          </tr>
          <tr>
            <td><button type="submit" className="btn btn-primary" onClick={this.login}>Zaloguj się</button></td>
          </tr>
          </tbody>
        </table>

      </div>
    );
  }

  validate(username, password, repeatPassword) {
    var errors = [];
    if (username === "")
    {
        document.getElementById("usererror").innerHTML = "Konieczne jest podanie nazwy użytkownika...";
        errors.push("");
    }
    else
    {
        document.getElementById("usererror").innerHTML = "*";
    }
    if (password === "")
    {
        document.getElementById("passerror").innerHTML = "Podaj hasło";
        errors.push("");
    }
    else
    {
        document.getElementById("passerror").innerHTML = "*";
    }
    if (password.length < 3)
    {
        document.getElementById("passerror").innerHTML = "Hasło musi zawierać co najmniej 3 znaki";
        errors.push("");
    }
    else
    {
        document.getElementById("passerror").innerHTML = "*";
    }
    if (repeatPassword === "")
    {
        document.getElementById("cpasserror").innerHTML = "Podaj ponownie hasło";
        errors.push("");
    }
    else
    {
        document.getElementById("passerror").innerHTML = "*";
    }
    if (repeatPassword != password)
    {
        document.getElementById("cpasserror").innerHTML = "Hasła różnią się od siebie";
        errors.push("");
    }
    else
    {
        document.getElementById("passerror").innerHTML = "*";
        document.getElementById("cpasserror").innerHTML = "*";
    }

    return errors;
  }
}



export default Login;
