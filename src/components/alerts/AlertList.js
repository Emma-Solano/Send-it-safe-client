// components/projects/ProjectList.js

import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

class AlertList extends Component {
    
    state = { listOfAlerts: [] };

  getAllAlerts = () =>{
    const { params } = this.props.match;
    axios.get(`http://localhost:5000/api/climbingRoutes/${params.id}/alerts`, {withCredentials:true})
    .then(responseFromApi => {
        console.log(responseFromApi.data)
      this.setState({
        listOfAlerts: responseFromApi.data
      })
    })
  }

  componentDidMount() {
    this.getAllAlerts();
  }

  render(){
    return(
      <div>
        <div style={{width: '60%', float:"left"}}>
          { this.state.listOfAlerts.map(alert => {
            return (
              <div key={alert._id}>
                <Link to={`/alertDetails/${alert._id}`}>
                  <h3>{alert.alertType}</h3>
                </Link>
              </div>
            )})
          }
        </div>
        <div style={{width: '40%', float:"right"}}>
            
        </div>
      </div>
    )
  }
}
 
export default withRouter(AlertList);