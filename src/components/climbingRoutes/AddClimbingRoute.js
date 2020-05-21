import React, { Component } from 'react';
import axios from 'axios';

class AddClimbingRoute extends Component {
  constructor(props){
      super(props);          //             will help us to toggle add task form   
                            //                      |
      this.state = { name: "", sector: "", zone: "", isShowing: false };
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const sector = this.state.sector;
    const zoneID = this.props.theZone._id; // <== we need to know to which project the created task belong, so we need to get its 'id'
                                                // it has to be the 'id' because we are referencing project 
                                                // by its id in the task model on the server side ( project: {type: Schema.Types.ObjectId, ref: 'Project'})
    
    // { name, sector, projectID } => this is 'req.body' that will be received on the server side in this route, 
    // so the names have to match
    axios.post("http://localhost:5000/api/climbingRoutes", { name, sector, zoneID })
    .then( () => {
          // after submitting the form, retrieve project one more time so the new climbingRoute is displayed as well 
          //              |
        this.props.getTheZone();
        this.setState({name: "", sector: ""});
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  toggleForm = () => {
      if(!this.state.isShowing){
          this.setState({isShowing: true});
      } else {
        this.setState({isShowing: false});
      }
  }

  showAddClimbingRouteForm = () => {
    if(this.state.isShowing){
        return(
            <div>
                  <h3>Crea una vía.</h3>
                  <form onSubmit={this.handleFormSubmit}>
                  <label>Nombre:</label><br></br>
                  <input type="text" name="name" value={this.state.name} onChange={ e => this.handleChange(e)}/><br></br>
                  <label>Sector:</label><br></br>
                  <input type="text" name="sector" value={this.state.sector} onChange={ e => this.handleChange(e)} /><br></br>
                  
                  <input type="submit" value="Agregar" />
                  </form>
            </div>
          )
    }
  }

  render(){
    return(
      <div>
            <hr/>
            <button onClick={() => this.toggleForm()}> <span>➕</span> Añadir vias de escalada en ésta zona. </button>
            { this.showAddClimbingRouteForm() }
      </div>
    )
  }
}

export default AddClimbingRoute;