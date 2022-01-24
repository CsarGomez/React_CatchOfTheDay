import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {

  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func
  }
  handleChange = event => {
    // console.log(event.currentTarget.value);
    // update the fish
    const updatedFish = { 
      // 1. take a copy of the current fish
      ...this.props.fish, 
      // computed property names (overwrite the value)
      [event.currentTarget.name]: event.currentTarget.value
    };
    this.props.updateFish(this.props.index, updatedFish);
  }
  render(){
    return(
      <div className="fish-edit">
        <input 
          name="name" 
          type="text" 
          onChange={this.handleChange} 
          value={this.props.fish.name}
        />
        <input 
          name="price" 
          type="text" 
          onChange={this.handleChange} 
          value={this.props.fish.price}
        />
        <select 
          name="status" 
          onChange={this.handleChange} 
          value={this.props.fish.status}>
            <option value="available">Fresh!</option>
            <option value="unavailable">Sold Out!</option>
        </select>
        <textarea 
          name="desc" 
          type="text" 
          onChange={this.handleChange} 
          value={this.props.fish.desc}
        />
        <input 
          name="image" 
          type="text" 
          onChange={this.handleChange} 
          value={this.props.fish.image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
      </div>
    )
  }
}

export default EditFishForm;