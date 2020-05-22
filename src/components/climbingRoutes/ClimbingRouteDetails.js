
import React, { Component } from 'react';
import axios from 'axios';
import EditClimbingRoute from './EditClimbingRoute'
import AddAlert from '../alerts/AddAlert'
import AlertList from '../alerts/AlertList'
import Card from 'react-bootstrap/Card';


class ClimbingRoutesDetail extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.getTheClimbingRoute();
  }

  getTheClimbingRoute = () => {
    const { params } = this.props.match;
    axios.get(`http://localhost:5000/api/zones/${params.zone}/climbingRoutes/${params.id}`)
    .then( responseFromApi =>{
      const theClimbingRoute = responseFromApi.data;
      this.setState(theClimbingRoute);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  render(){
    return(
      <div className="climbingRoutesDetail">
      <div id="climbingRouteCardWithEditForm">
      <Card style={{ width: '36rem' }}>
        <Card.Img variant="top" src="https://img.freepik.com/free-vector/climb-characters-extreme-sport-cliff-wall-rocks-stones-big-rocky-hills-mountains-explore-sportsmen-male-female_80590-5998.jpg?size=626&ext=jpg" />
          <Card.Header>{this.state.name}</Card.Header>
          <Card.Body>
          <Card.Title className="mb-2 text-muted">{this.state.sector}</Card.Title>
        </Card.Body>
      </Card><br></br>
      <EditClimbingRoute theClimbingRoute={this.state} getSingleClimbingRoute={this.getTheClimbingRoute} {...this.props}/>
      </div>
        <div><h3><span>⚠️</span> Añadir Alerta <span>⚠️</span></h3><AddAlert/></div>
        <div><h3><span>📄</span> Alertas reportadas en ésta vía <span>📄</span></h3><AlertList/></div>
      </div>
    )
  }
}

export default ClimbingRoutesDetail;