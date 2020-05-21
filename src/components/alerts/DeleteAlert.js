// DELETE PROJECT:
import React, { Component } from 'react';
import axios from 'axios';

class DeleteAlert extends Component {
      

  deleteAlert = (id) => {
    axios.delete(`http://localhost:5000/api/alerts/${id}`, {withCredentials:true})
    .then( () =>{
        this.props.history.push('/alerts');       
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  render(){
    console.log(this.props)
    if(this.props.user && this.props.alert.owner?._id == this.props.user?._id){
      return(
        <div>
          <button onClick={() => this.deleteAlert(this.props.alert._id)}>Eliminar alerta</button>
        </div>
      )
    }else{
      return(
        <p>Si ésta alerta ya no está vigente, favor de ponerse en contacto con el usuario que la reportó, para poder eliminarla.</p>
      )
    }
}
}

export default DeleteAlert;