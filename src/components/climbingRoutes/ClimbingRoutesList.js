// components/projects/ProjectList.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

class ClimbingRoutesList extends Component {
    
    state = { listOfClimbingRoutes: [] };

  getAllclimbingRoutes = () =>{
    const { params } = this.props.match;
    axios.get(`http://localhost:5000/api/zones/${params.id}/climbingRoutes`, {withCredentials:true})
    .then(responseFromApi => {
        console.log(this.props.match)
      this.setState({
        listOfClimbingRoutes: responseFromApi.data
      })
    })
  }

  componentDidMount() {
    this.getAllclimbingRoutes();
  }

  render(){
    return(
      <div>
        <div style={{width: '60%', float:"left"}}>
          { this.state.listOfClimbingRoutes.map( climbingRoute => {
            return (
              <div key={climbingRoute._id}>
                <Link to={`/climbingRoutes/${climbingRoute._id}`}>
                  <h3>{climbingRoute.name}</h3>
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
 
export default withRouter(ClimbingRoutesList);

//<AddClimbingRoute getData={() => this.getAllclimbingRoutes()}/>