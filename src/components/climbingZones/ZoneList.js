// components/projects/ProjectList.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddZone from './AddZone';

class ZoneList extends Component {
  constructor(){
      super();
      this.state = { listOfZones: [] };
  }

  getAllZones = () =>{
    axios.get(`http://localhost:5000/api/zones`, {withCredentials:true})
    .then(responseFromApi => {
      this.setState({
        listOfZones: responseFromApi.data
      })
    })
  }

  componentDidMount() {
    this.getAllZones();
  }

  render(){
    return(
      <div>
        <div style={{width: '60%', float:"left"}}>
          { this.state.listOfZones.map( zone => {
            return (
              <div className="listOfZones" key={zone._id}>
                <Link to={`/zones/${zone._id}`}>
                  <h3>{zone.name}</h3>
                </Link>
              </div>
            )})
          }
        </div>
        <div style={{width: '40%', float:"right"}}>
            <AddZone getData={() => this.getAllZones()}/>
        </div>
      </div>
    )
  }
}
 
export default ZoneList;