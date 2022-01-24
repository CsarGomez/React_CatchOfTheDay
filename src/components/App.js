import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends React.Component{
  // creating the state
  state = {
    fishes: {},
    order: {},
  }

  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount(){
    const { params } = this.props.match;
    // reinstate our local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef){
      this.setState({order: JSON.parse(localStorageRef)})
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    })
  }

  componentDidUpdate(){
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  // add fishes
  addFish = fish => {
    // 1.take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. add our new fish to that fishes copy
    fishes[`fish${Date.now()}`] = fish;
    // 3. set the new fishes object to state
    this.setState({ fishes })
  }

  updateFish = (key, updatedFish) => {
    // 1. take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. update that state 
    fishes[key] = updatedFish;
    // 3. set that to state
    this.setState({ fishes });
  }
  
  deleteFish = key => {
    // 1. take a copy of the state
    const fishes = { ...this.state.fishes };
    // 2. update state
    fishes[key] = null;
    this.setState({ fishes });
  }

  // load sample fishes
  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  }

  // Add to Order
  addToOrder = key => {
    // 1. take a copy of the state
    const order = { ...this.state.order };
    // 2. add to the order, or update the count
    order[key] = order[key] + 1 || 1;
    // 3. call setState to update our state //order: order -> order
    this.setState({ order });
  }

  removeFromOrder = key => {
    // 1. take a copy of the state
    const order = { ...this.state.order }
    delete order[key]
    this.setState({ order })
  }

  render(){
    return(
      <div className='catch-of-the-day'>

        <div className="menu">

          <Header tagline="Fresh seafood market"/>

          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                index = {key}
                key={key} 
                details = {this.state.fishes[key]} 
                addToOrder = {this.addToOrder}
              />
            ))}
          </ul>

        </div>

        <Order 
          fishes = {this.state.fishes} 
          order = {this.state.order}
          removeFromOrder = {this.removeFromOrder}
        />

        <Inventory 
          addFish = {this.addFish} 
          updateFish = {this.updateFish}
          deleteFish = {this.deleteFish}
          loadSampleFishes={this.loadSampleFishes} 
          fishes={this.state.fishes}
        />

      </div>
    )
  }
}

export default App;