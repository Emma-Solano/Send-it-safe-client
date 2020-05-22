// components/zones/EditZone.js

import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class EditZone extends Component {
  constructor(props){
    super(props);
    this.state = {
        name: this.props.theZone.name, 
        state: this.props.theZone.state,
        municipality: this.props.theZone.municipality,
    }
  }

    
  handleFormSubmit = (event) => {
    const name = this.state.name;
    const state = this.state.state;
    const municipality = this.state.municipality;

    event.preventDefault();

    axios.put(`http://localhost:5000/api/zones/${this.props.theZone._id}`, { name, state, municipality }, {withCredentials:true})
    .then( () => {
        this.props.getTheZone();
        // after submitting the form, redirect to '/zones'
        this.props.history.push('/zones');    
    })
    .catch( error => console.log(error) )
  }

  handleChangeName = (event) => {  
    this.setState({
      name:event.target.value
    })
  }

  handleChangeState = (event) => {  
    this.setState({
      state:event.target.value
    })
  }

  handleChangeMunicipality = (event) => {  
    this.setState({
      municipality:event.target.value
    })
  }

  render(){
    return (
      <div className="editFormZone">
        <h3>Editar zona de escalada <span>📝</span></h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Nombre</label><br></br>
          <input type="text" name="name" value={this.state.name} onChange={e => this.handleChangeName(e)}/><br></br>
          <label>Estado</label><br></br>
          <input type="text" name="state" value={this.state.state} onChange={e => this.handleChangeState(e)} /><br></br>
          <label>Municipio o delegación</label><br></br>
          <input type="text" name="state" value={this.state.municipality} onChange={e => this.handleChangeMunicipality(e)}/><br></br>
          <Button variant="success" type="submit" > Enviar </Button>
        </form>
      </div>
    )
  }
}

export default EditZone;