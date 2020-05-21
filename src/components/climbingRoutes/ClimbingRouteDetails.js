// components/tasks/TaskDetails.js

import React, { Component } from 'react';
import axios from 'axios';
import EditClimbingRoute from './EditClimbingRoute'
import AddAlert from '../alerts/AddAlert'
import AlertList from '../alerts/AlertList'


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
      <div>
        <h1>{this.state.name}</h1>
        <p>{this.state.sector}</p>
        <section>
        <h3>Alertas reportadas en ésta vía.</h3>
          <AlertList/>
        </section>
        <section>
        <h2>Añadir Alerta <span>⚠️</span></h2>
          <AddAlert/>
        </section>
        <section>
        <EditClimbingRoute theClimbingRoute={this.state} getSingleClimbingRoute={this.getTheClimbingRoute} {...this.props} />
        </section>
      </div>
    )
  }
}

export default ClimbingRoutesDetail;