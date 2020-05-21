// components/tasks/TaskDetails.js

import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import DeleteAlert from './DeleteAlert'


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
      <div>
        <h1>{this.state.alert?.alertType}</h1>
        <h3>{this.state.alert?.description}</h3>
        <h4>{this.state.alert?.date}</h4>
        <section>
          <DeleteAlert {...this.props} user= {this.props.loggedInUser} alert={this.state.alert}/>
        </section>
      </div>
    )
  }
}

export default withRouter(AlertDetails);