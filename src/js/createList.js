import React from 'react';
import './../App.scss'
import { connect } from 'react-redux'
import {storeAddList} from '../Redux/action.js'

class CreateList extends React.Component
{
  constructor(props)
  {
    super(props);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleCancelAction = this.handleCancelAction.bind(this);
    this.addCard = this.addCard.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.state = {inputValue:""}
  }
  handleInput(e)
  {
    if(typeof(e.target.value) != "undefined" && e.target.value.length >= 0)
    {
      this.setState({inputValue : e.target.value})
	}
  }
  handleAddClick(e)
  {
    document.getElementById("open-List").classList.add('showInput'); 
  }
  handleCancelAction()
  {
      document.getElementById("open-List").classList.remove('showInput');
      this.setState({inputValue : ""});
  }
  addCard = (e) => 
  {
    if(this.state.inputValue && this.state.inputValue.length > 0)
    {
    this.props.createList(this.state.inputValue);
   this.handleCancelAction(); 
   this.setState({inputValue : ""})
    }
  }
  render()
  {
    return(
        <div className="createContainer">
            <div className="createCard">
            <div id="open-List" className="open-list">
              <span className="placeholder" onClick={this.handleAddClick}>Add a list <i className="fa fa-plus" aria-hidden="true"></i></span>
              <input className="list-name" type="text" aria-label="Enter List Name" placeholder="Enter list title..." value = {this.state.inputValue} maxLength="50" onChange={this.handleInput}></input>
              <div className="list-add">
                <input className="add-button btn" type="button" value="Add List" onClick={this.addCard}></input>
                <input className="cancel-button btn" type="button" value="Cancel" onClick={this.handleCancelAction}></input>
              </div>
            </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state, props) => (
  {
     list: state.listTable
  }
)
const mapActionToProps = (dispatch, props) => (
 {
    createList: storeAddList}
 )
 export default connect(mapStateToProps, mapActionToProps)(CreateList)