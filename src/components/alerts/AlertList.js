// components/projects/ProjectList.js

import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

class AlertList extends Component {
    
    state = { listOfAlerts: [] };

  getAllAlerts = () =>{
    const { params } = this.props.match;
    axios.get(`https://send-it-safe-server.herokuapp.com/api/climbingRoutes/${params.id}/alerts`, {withCredentials:true})
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
      <div className="alertList">
        <div>
          { this.state.listOfAlerts.map(alert => {
            return (
              <div key={alert._id}>
                <Link to={`/alertDetails/${alert._id}`}>
                  <h2>{alert.alertType}</h2>
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