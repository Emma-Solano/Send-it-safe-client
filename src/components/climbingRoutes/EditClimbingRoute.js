// components/zones/EditZone.js

import React, { Component } from 'react';
import axios from 'axios';

class EditClimbingZone extends Component {
  constructor(props){
    super(props);
    this.state = {
        name: this.props.theClimbingRoute.name, 
        sector: this.props.theClimbingRoute.sector
    }
  }

    
  handleFormSubmit = (event) => {
    const name = this.state.name;
    const sector = this.state.sector;

    event.preventDefault();

    axios.put(`http://localhost:5000/api/climbingRoutes/${this.props.theClimbingRoute._id}`, { name, sector }, {withCredentials:true})
    .then( () => {
        this.props.getSingleClimbingRoute();
        // after submitting the form, redirect to '/zones'
        this.props.history.push('/climbingRoutes');    
    })
    .catch( error => console.log(error) )
  }

  handleChangeName = (event) => {  
    this.setState({
      name:event.target.value
    })
  }

  handleChangeSector = (event) => {  
    this.setState({
      sector:event.target.value
    })
  }

  render(){
    return (
      <div>
        <hr />
        <h3>Editar vía de escalada <span>📝</span></h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Nombre</label><br></br>
          <input type="text" name="name" value={this.state.name} onChange={e => this.handleChangeName(e)}/><br></br>
          <label>Sector</label><br></br>
          <input type="text" name="sector" value={this.state.sector} onChange={e => this.handleChangeSector(e)}/><br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default EditClimbingZone;