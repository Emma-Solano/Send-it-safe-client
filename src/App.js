import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import AuthService from './components/auth/auth-service';
import Signup from './components/auth/Signup';
import ZoneList from './components/climbingZones/ZoneList'
import ZoneDetails from './components/climbingZones/ZoneDetails'
import ProtectedRoute from './components/auth/protected-route';
import ClimbingRoutesDetail from  './components/climbingRoutes/ClimbingRouteDetails'
import AlertDetails from './components/alerts/AlertDetails'


class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }
 
  fetchUser = () => {
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  componentDidMount(){
    this.fetchUser()
  }
 
  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }
 
  render() {
    //{this.fetchUser()}
    if(this.state.loggedInUser){
      return (
        <div>
        <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            <ProtectedRoute user={this.state.loggedInUser} path='/zones/:id' component={ZoneDetails} />
            <ProtectedRoute user={this.state.loggedInUser} path='/zones' component={ZoneList} />
            <ProtectedRoute user={this.state.loggedInUser} path='/climbingRoutes/:id' component={ClimbingRoutesDetail}/>
            <ProtectedRoute user={this.state.loggedInUser} path='/alertDetails/:id' component={AlertDetails}/>
          </Switch>
        </div>
      );
    } else {
      return (
        <div>
        <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
            <Switch> 
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
              <Route exact path='/' render={() => <Login getUser={this.getTheUser}/>}/>
              <ProtectedRoute user={this.state.loggedInUser} path='/zones/:id' component={ZoneDetails} />
              <ProtectedRoute user={this.state.loggedInUser} path='/zones' component={ZoneList} />
              <ProtectedRoute user={this.state.loggedInUser} path='/climbingRoutes/:id' component={ClimbingRoutesDetail}/>
              <ProtectedRoute user={this.state.loggedInUser} path='/alertDetails/:id' component={AlertDetails}/>
            </Switch>
        </div>
      );
    }
  }
}


export default App;
