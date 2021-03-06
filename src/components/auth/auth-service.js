// auth/auth-service.js

import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'https://send-it-safe-server.herokuapp.com/api',
      withCredentials: true
    });
    this.service = service;
  }
//https://send-it-safe-server.herokuapp.com/api
  signup = (username, password) => {
    return this.service.post('/signup', {username, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }
   
  logout = () => {
    return this.service.post('/logout', {})
    .then(response => response.data)
  }

}

export default AuthService;
