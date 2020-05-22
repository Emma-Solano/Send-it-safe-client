// components/tasks/TaskDetails.js

import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import DeleteAlert from './DeleteAlert'
import Card from 'react-bootstrap/Card';


class AlertDetails extends Component {
  state = {
    alert: {}
  }

  componentDidMount(){
    this.getTheAlertDetail();
  }

  getTheAlertDetail = () => {
    const { params } = this.props.match;
    axios.get(`http://localhost:5000/api/alertDetails/${params.id}`)
    .then( responseFromApi =>{
      console.log(params)
      const theSingleAlert = responseFromApi.data;
      this.setState({alert: theSingleAlert});
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  render(){
    console.log(this.state)
    return(
      <div className="alertCard">
      <Card style={{ width: '36rem' }}>
        <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/I/518mAYfVj0L._SX466_.jpg" />
          <Card.Header>{this.state.alert?.alertType}</Card.Header>
          <Card.Body>
          <Card.Title className="mb-2 text-muted">{this.state.alert?.date}</Card.Title>
          <Card.Text>
          {this.state.alert?.description}
          </Card.Text>
        </Card.Body>
      </Card>
        <div>
          <DeleteAlert {...this.props} user= {this.props.loggedInUser} alert={this.state.alert}/>
        </div>
      </div>
    )
  }
}

export default withRouter(AlertDetails);