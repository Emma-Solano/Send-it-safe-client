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
      <div>
      <section>
        <h1>Bienvenido a Send it Safe</h1>
        <h2>Encadena seguro!</h2>
        <h3>Send it Safe te ayuda a notificar a otros escaladores posibles peligros o advertencias, así como ver alertas creadas por otros miembros para hacer tu encadene súper seguro!</h3>
        <p>Instrucciones:</p>
        <ol>
          <li>Inicia sesión o regístrate</li>
          <li>Elige la zona de escalada a la que planeas ir (en caso de no existir, podrás crearla!)</li>
          <li>Dentro de cada zona podrás observar las viás existentes, podrás crearlas igual que en el punto anterior en caso de que aún no estén registradas</li>
          <li>Un indicador te notificará cuántas alertas existen por via, dirígete a ellas para poder ver el detalle o reportar algún peligro.</li>
          <li>Escala seguro y diviértete.</li>  
        </ol>
      </section>
        <form onSubmit={this.handleFormSubmit}>
          <label>Nombre de Usuario:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          <label>Contraseña:</label>
          <input type="text" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          <input type="submit" value="Login" />
        </form>
        <p>¿Aún no tienes cuenta? 
            <Link to={"/signup"}> Crear cuenta!</Link>
        </p>
      </div>
    )
  }
}
 
export default Login;