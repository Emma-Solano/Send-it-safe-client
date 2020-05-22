// components/projects/ProjectDetails.js
 
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditZone from './EditZone';
import AddClimbingRoute from '../climbingRoutes/AddClimbingRoute';
import ClimbingRoutesList from '../climbingRoutes/ClimbingRoutesList'
import Card from 'react-bootstrap/Card';

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
    axios.get(`https://send-it-safe-server.herokuapp.com/api/zones/${params.id}`, {withCredentials:true})
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
      <div className="climbingRouteDetails">
        <div>
        <Card style={{ width: '36rem' }}>
        <Card.Img variant="top" src="https://www.jonasclaesson.com/wp-content/uploads/2015/05/Bighorn-Sheep-Moab-illustration.jpg" />
          <Card.Header>{this.state.name}</Card.Header>
          <Card.Body>
          <Card.Title className="mb-2 text-muted">{this.state.state}</Card.Title>
          <Card.Text>{this.state.municipality}</Card.Text>
        </Card.Body>
      </Card>
        </div><br></br>
        <h2>Vías de escalar en ésta zona.</h2>
        <div><ClimbingRoutesList/></div>
        <div><AddClimbingRoute theZone={this.state} getTheZone={this.getSingleZone} /></div>
        <div><EditZone theZone={this.state} gettheZone={this.getSingleZone} {...this.props} /></div>
      </div>
    )
  }
}
 
export default ZoneDetails;

