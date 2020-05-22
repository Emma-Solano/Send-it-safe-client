// components/projects/ProjectList.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddZone from './AddZone';
import ListGroup from 'react-bootstrap/ListGroup';

class ZoneList extends Component {
  constructor(){
      super();
      this.state = { listOfZones: [] };
  }

  getAllZones = () =>{
    axios.get(`https://send-it-safe-server.herokuapp.com/api/zones`, {withCredentials:true})
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
        <div style={{width: '60%', float:"left", marginTop: "35px"}}>
          { this.state.listOfZones.map( zone => {
            return (
              <div className="listOfZones" key={zone._id}>
              <ListGroup variant="flush">
                <Link to={`/zones/${zone._id}`}>
                <ListGroup.Item variant="info"><h2>{zone.name}</h2></ListGroup.Item>
                </Link>
                </ListGroup>
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