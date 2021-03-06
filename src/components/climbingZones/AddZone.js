// components/ClimbingZones/AddZones.js

import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class AddZone extends Component {
  constructor(props){
      super(props);
      this.state = { name: "", state: "", municipality: "" };
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const state = this.state.state;
    const municipality = this.state.municipality;
    axios.post("https://send-it-safe-server.herokuapp.com/api/zones", { name, state, municipality }, {withCredentials:true})
    .then( () => {
        this.props.getData();
        this.setState({name: "", state: "", municipality: ""});
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render(){
    return(
      <div className="AddZoneContainer">
      <h2>Añadir zona de escalada <span>🧗 </span></h2>
        <form onSubmit={this.handleFormSubmit}>
          <label>Nombre de la zona:</label> <br></br>
          <input type="text" name="name" value={this.state.name} onChange={ e => this.handleChange(e)}/><br></br>
          <label>Estado:</label><br></br>
          <input type="text" name="state" value={this.state.state} onChange={ e => this.handleChange(e)} /> <br></br>
          <label>Municipio o delegación:</label> <br></br>
          <input type="text" name="municipality" value={this.state.municipality} onChange={ e => this.handleChange(e)} /><br></br>
          
          <Button variant="success" type="submit"> Crear zona</Button>
        </form>
      </div>
    )
  }
}

export default AddZone;
