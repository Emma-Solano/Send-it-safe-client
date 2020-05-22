// components/projects/AddProject.js

import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class AddAlert extends Component {
  constructor(props){
      super(props);
      this.state = { alertType: "", description: "" , date: "" };
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { params } = this.props.match;
    const alertType = this.state.alertType;
    const description = this.state.description;
    const date = this.state.date
    const climbingRoute = params.id

    axios.post("http://localhost:5000/api/alerts", { alertType, description, date, climbingRoute}, {withCredentials:true})
    .then( () => {
        console.log(this.props)
        this.setState({alertType: "", description: "", date: ""});
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render(){
    return(
      <div className="addAlertForm">
        <form onSubmit={this.handleFormSubmit}>
          <label>Nombre de la alerta:</label><br></br>
          <input type="text" name="alertType" value={this.state.title} onChange={ e => this.handleChange(e)}/><br></br>
          <label>Descripción de la alerta:</label><br></br>
          <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} /><br></br>
          <label>Fecha de reporte:</label><br></br>
          <input type="date" name="date" value={this.state.date} onChange={ e => this.handleChange(e)}/><br></br>
          <Button variant="dark" type="submit">Enviar</Button>
        </form>
      </div>
    )
  }
}

export default withRouter(AddAlert);