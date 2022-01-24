import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { firebaseApp } from '../base';
import AddFishForm from './addFishForm';
import EditFishForm from './editFishForm';
import Login from './Login';

class Inventory extends React.Component {

  static propTypes = { 
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
  }


  authHandler = async authData => {
    console.log(authData);
  }

  authenticate = provider => {
  
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }

  render(){
    return <Login authenticate={this.authenticate}/>;

  //   return(
  //     <div className="inventory">
  //       <h2>Inventory</h2>
  //       {Object.keys(this.props.fishes).map(key=> (
  //         <EditFishForm 
  //           key={key} 
  //           index={key} 
  //           fish={this.props.fishes[key]} 
  //           updateFish={this.props.updateFish}
  //           deleteFish={this.props.deleteFish}
  //         />
  //       ))}
  //       <AddFishForm addFish={this.props.addFish} />
  //       <button onClick={this.props.loadSampleFishes}>
  //         Load sample fishes
  //       </button>
        
  //     </div>
  //   )
  }
}

export default Inventory;