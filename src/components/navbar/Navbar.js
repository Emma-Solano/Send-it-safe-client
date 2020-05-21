// navbar/Navbar.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/auth-service';
 
class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }
 
  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]});
  }
 
  logoutUser = () =>{
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);  
    })
  }
 
  render(){
    if(this.state.loggedInUser){
      return(
        <nav className="nav-style">
            <h1>Hola {this.state.loggedInUser.username}</h1>
            <h2><Link to='/zones' style={{ textDecoration: 'none' }}>Zonas de escalada <span>⛰️</span> </Link></h2>
              <Link to='/'>
                <button onClick={() => this.logoutUser()}>Cerrar sesión</button>
              </Link>
        </nav>
      )
    } else {
      return ( 
        <nav className="nav-style">
          <ul>
            <li><Link to='/signup' style={{ textDecoration: 'none' }}>Regístrate!</Link></li>
          </ul>
        </nav>
      )
    }
  }
}
 
export default Navbar;