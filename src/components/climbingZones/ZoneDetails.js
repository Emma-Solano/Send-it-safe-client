// components/projects/ProjectDetails.js
 
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditZone from './EditZone';
import AddClimbingRoute from '../climbingRoutes/AddClimbingRoute';
import ClimbingRoutesList from '../climbingRoutes/ClimbingRoutesList'

class ZoneDetails extends Component {
  constructor(props){
    super(props);
    this.state = { };
    console.log(this.state)
  }
 
  componentDidMount(){
    this.getSingleZone();
  }
 
  getSingleZone = () => {
    const { params } = this.props.match;
    axios.get(`http://localhost:5000/api/zones/${params.id}`, {withCredentials:true})
    .then( responseFromApi =>{
      const theZone = responseFromApi.data;
      this.setState(theZone);
    })
    .catch((err)=>{
        console.log(err)
    })
  }
   
  render(){
    return(
      <div>
        <h1>{this.state.name}</h1>
        <h2>{this.state.state}</h2>
        <h3>{this.state.municipality}</h3>
        <ClimbingRoutesList/>
        <AddClimbingRoute theZone={this.state} getTheZone={this.getSingleZone} />
        <EditZone theZone={this.state} gettheZone={this.getSingleZone} {...this.props} />
        <Link to={'/zones'}>Regresar a zonas de escalada</Link>
      </div>
    )
  }
}
 
export default ZoneDetails;

