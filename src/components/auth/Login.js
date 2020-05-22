// auth/Login.js

import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
 
class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }
 
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service.login(username, password)
    .then( response => {
        this.setState({ username: "", password: "" });
        this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    return(
      <div className="welcomeMain">
      <section className="welcome">
        <h1>Bienvenido a Send it Safe</h1>
        <h2>Encadena seguro!</h2>
        <p>Send it Safe te ayuda a notificar a otros escaladores posibles peligros o advertencias, así como ver alertas creadas por otros miembros para hacer tu encadene súper seguro!</p>
        <img src="https://image.freepik.com/free-vector/flat-mountain-landscape_126546-31.jpg" alt="mountain illustration" width="500" height="500"></img>
      </section>
        <form className="loginForm" onSubmit={this.handleFormSubmit}>
          <label>Nombre de Usuario:</label><br></br>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/><br></br>
          <label>Contraseña:</label><br></br>
          <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} /><br></br>
          
          <input type="submit" value="Iniciar sesión" />
        </form>
        <p className="welcomeFooter">¿Aún no tienes cuenta? 
            <Link to={"/signup"}> Crear cuenta!</Link>
        </p>
      </div>
    )
  }
}
 
export default Login;