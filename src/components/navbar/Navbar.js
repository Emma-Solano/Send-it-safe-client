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
            <h4 className="greeting">Hola {this.state.loggedInUser.username}</h4>
            <h2 className="home-link"><Link to='/zones' style={{ textDecoration: 'none' }}><span>⛰️</span> Ir a zonas de escalada <span>⛰️</span> </Link></h2>
              <Link to='/'>
                <button className="logout-button" onClick={() => this.logoutUser()}>Cerrar sesión</button>
              </Link>
        </nav>
      )
    } else {
      return ( 
        <nav className="nav-style">
          <p>Hecho con <span>❤️</span> en Ironhack México <span>🇲🇽</span> por Emma Solano! </p>
        </nav>
      )
    }
  }
}
 
export default Navbar;