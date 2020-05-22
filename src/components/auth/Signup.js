// auth/Signup.js
 
import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
 
class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }
 
  // handleChange() and handleSubmit() will be added here
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
   
    this.service.signup(username, password)
    .then( response => {
        this.setState({
            username: "", 
            password: "",
        });
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
      // more code will be added here
      <div className="signUp">
      <form onSubmit={this.handleFormSubmit}>
        <label>Nombre de Usuario:</label><br></br>
        <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/><br></br>
        
        <label>Contraseña:</label><br></br>
        <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} /><br></br>
        
        <input type="submit" value="Signup" />
      </form>
      <img src="https://image.freepik.com/vector-gratis/ilustracion-montana-bosque_16787-15.jpg" alt="mountain2" width="500" height="500"></img>
      <p>Instrucciones:</p>
        <ol>
          <li>Inicia sesión o regístrate</li>
          <li>Elige la zona de escalada a la que planeas ir (en caso de no existir, podrás crearla!)</li>
          <li>Dentro de cada zona podrás observar las viás existentes, podrás crearlas igual que en el punto anterior en caso de que aún no estén registradas</li>
          <li>Un indicador te notificará cuántas alertas existen por via, dirígete a ellas para poder ver el detalle o reportar algún peligro.</li>
          <li>Escala seguro y diviértete.</li>  
        </ol>
 
      <p>¿Ya tienes una cuenta? 
          <Link to={"/"}> Inicia sesión.</Link>
      </p>
 
    </div>
    )
  }
}
 
export default Signup;