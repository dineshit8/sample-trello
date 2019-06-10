import React from 'react';
import ReactDOM from 'react-dom';
import './../App.scss'
import { connect } from 'react-redux';
import CreateList from './../js/createList'
import {storeAddCardToList , storeDeleteList ,storeUpdateCardToList , storeAddComment ,storeDeleteCard , reorder, intercangeCards} from '../Redux/action.js'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
class RenderCard extends React.Component 
{
  constructor(props)
  {
    super(props);
    this.AddaCard = this.AddaCard.bind(this);
    this.handleCancelAction = this.handleCancelAction.bind(this);
    this.addCardToList = this.addCardToList.bind(this);
    this.handleTextArea = this.handleTextArea.bind(this);
    this.state={description : "" , cardCount : 0,items: getItems(10), selected: getItems(5, 10)}
    this.addContRef = React.createRef();
    this.deleteList = this.deleteList.bind(this);
    this.editCard = this.editCard.bind(this);
    this.changeEditCard = this.changeEditCard.bind(this);
    this.blurEditInput = this.blurEditInput.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.commentsIconClick = this.commentsIconClick.bind(this);
    this.commentAddClick = this.commentAddClick.bind(this);
  }
  // Drag & Drop
  getList = (id) => {
      let propsValue = this.props;
      let List = propsValue.list.Listnames;
      let ListLen = List ? List.length : 0;
      for(let lisIdx=0 ; lisIdx < ListLen ; lisIdx++)
      {
        if(List[lisIdx] && List[lisIdx].listLabel && List[lisIdx].listLabel == id)
        {
          if(typeof(List[lisIdx].cardArr) != "undefined")
          {
            return List[lisIdx].cardArr
          }
          else
          {
            return List[lisIdx].cardArr =[];
          }
        }
      }
  }
  onDragEnd(result){
      const { source, destination } = result;
      // dropped outside the list
      if (!destination) {
          return;
      }
      if (source.droppableId === destination.droppableId) {
          const items = this.props.reorder(
              this.getList(source.droppableId),
              source.index,
              destination.index,
              source.droppableId
          );
      } else {
          const result = move(
              this.getList(source.droppableId),
              this.getList(destination.droppableId),
              source,
              destination
          );
          this.props.updateList(result);
      }
  };
  AddaCard(event)
  {
    var targetDom = event.target.getAttribute("data-parent");
    if(targetDom)
    {
      this.props.addCardToList(this.state.description , targetDom);
      this.setState({description : "" , cardCount : this.state.cardCount + 1});
    }
  }
  removeCard(event)
  {
    var targetDom = event.target.getAttribute("data-parent");
    var targetIndex = event.target.getAttribute("index");
    if(targetDom && targetIndex)
    {
      this.props.deleteCard(targetDom , targetIndex);
    }
  }
  editCard(event)
  {
    event.target.nextElementSibling.nextElementSibling.nextElementSibling.style.display="block";
    event.target.previousElementSibling.style.display='none';
    this.setState({description : ""})
  }
  blurEditInput(event)
  {
    var targetDom = event.target.getAttribute("data-parent");
    var targetIndex = event.target.getAttribute("index");
    if(targetDom)
    {
      this.props.updateCardToList(this.state.description , targetDom , targetIndex);
      event.target.parentElement.firstElementChild.style.display="block";
      event.target.style.display='none';
    }
  }
  changeEditCard(event)
  {
    this.setState({description : event.target.value});
  }
  deleteList(event)
  {
    var targetDom = event.target.getAttribute("data-parent");
    if(targetDom)
    {
      this.props.storeDeleteList(targetDom);
    }
  }
  handleCancelAction(event)
  {
    event.target.closest(".card-Composer").classList.add("hide");
    let dataparent = event.target.getAttribute("data-parent");
    document.getElementsByClassName(dataparent)[0].classList.remove('hide');
  }
  addCardToList(event)
  {
    event.target.parentElement.previousSibling.classList.remove("hide");
    event.target.parentElement.classList.add("hide");
  }
  handleTextArea(values)
  {
    console.log(values);
    this.setState({description: values.value})
  }
  commentsIconClick(event)
  {
    let listTitle = event.target.getAttribute("data-parent");
    let curcardName = event.target.getAttribute("data-current");
    let propsList = this.props.list && this.props.list.Listnames && this.props.list.Listnames ? this.props.list.Listnames : [];
    let commentArr = [];
    for(let i=0 ; i< propsList.length ; i++)
    {
      if(propsList[i] && propsList[i].cardArr)
      {
        let cardArr = propsList[i].cardArr;
        let cardArrLen = cardArr.length;
        for(let j=0 ; j < cardArrLen ; j++)
        {
          if(cardArr[j] && cardArr[j].descripVal && cardArr[j].descripVal == curcardName && cardArr[j].commentArr)
          {
            commentArr = cardArr[j].commentArr
          }
        }
      }
    }
    ReactDOM.render(<Comment commentArr = {commentArr} Listname = {listTitle} curcardName = {curcardName} event ={this.commentAddClick}/> , document.getElementById('modal'));
    document.getElementById("modal").style.display = 'block';
  }
  commentAddClick(value)
  {
    this.props.addComment(value)
  }
  render()
  {
    const LIST = this.props.list;
    let thisObj = this;
      return(
        <div className="board">
           <DragDropContext onDragEnd={thisObj.onDragEnd}>
          {
            LIST && LIST.Listnames && LIST.Listnames.length ? LIST.Listnames.map(function(value , key)
            {
              return(
                value && value.listLabel && value.listLabel.length ?
                    <div key={key} className="alignment">
                        <Droppable droppableId={value.listLabel}>
                          {(provided, snapshot) => (
                            <div ref={provided.innerRef}  className ="existingCardCont">
                              <div  className = "innerContainer">
                                <div className="cardTitle">
                                <div className = "cardName">{value.listLabel}<span  data-parent={value.listLabel} className="close-icon" onClick={thisObj.deleteList}></span></div>
                                </div>
                                {
                                  value.cardArr && value.cardArr.length ? value.cardArr.map(function(secondvalue , key )
                                  {
                                    return(
                                      <Draggable key={key} draggableId={secondvalue.descripVal} index={key}>
                                          {(provided, snapshot) => (   
                                            <div key={key} index={key} className = "parentCont" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                              style={getItemStyle(
                                                  snapshot.isDragging,
                                                  provided.draggableProps.style
                                              )}>                          
                                              <div className="preRenderedCardsArr">
                                                <span data-parent={value.listLabel} index={key} className = "defaultValue">{secondvalue.descripVal}</span>
                                                <i className="fa fa-pencil" onClick={thisObj.editCard} aria-hidden="true"></i>
                                                <i className="fa fa-close"  index={key} data-parent={value.listLabel} onClick={thisObj.removeCard} aria-hidden="true"></i>
                                                <i className="fa fa-comments"  index={key} data-parent={value.listLabel} data-current ={secondvalue.descripVal} onClick={thisObj.commentsIconClick} aria-hidden="true"></i>
                                                <input type="text" placeholder = "Edit Here" index={key} data-parent={value.listLabel} className="editcard" value={thisObj.description} onBlur={thisObj.blurEditInput} onChange={thisObj.changeEditCard}></input>
                                              </div>
                                              <div className="commentCount">{secondvalue.commentArr ? "Comments :" + secondvalue.commentArr.length : ""}</div>
                                          </div> 
                                        )}
                                      </Draggable>)
                                  })
                                  :""
                                }
                                <div id="card-composer" className="card-Composer hide">
                                <div className="textAreaHolder">
                                    {/*<textarea className="list-card-composer-textarea" placeholder="Enter a title for this card…" onChange={thisObj.onTextAreaChange}></textarea>*/}
                                    <TextArea id={value.listLabel} cbk = {thisObj.handleTextArea}/> :
                                </div>
                                <div className="control-holder">
                                    <div className = "control">
                                        <input type="button" className="addCardInput btn" data-parent = {value.listLabel} value="Add a card" onClick={thisObj.AddaCard}></input>
                                        <input type="button" className="cancel btn" data-parent = {value.listLabel} value="Cancel" onClick={thisObj.handleCancelAction}></input>
                                    </div>
                                </div>
                                </div>
                                <div id="addContainer" className={value.listLabel} >
                                  <div id="addCard" className = "AddCardContainer" onClick={thisObj.addCardToList}>Add a Card</div>
                                  {/*<div id="anotherCard" className = "AddCardContainer hide" onClick={thisObj.addCardToList}>Add Aother Card</div>*/}
                                </div>
                                {provided.placeholder}
                            </div>
                          </div>
                          )}
                        </Droppable>
                        </div>
                :"")
            }) :""
          }
          <CreateList/>
          </DragDropContext>
        </div>
     )
  }
}

export class TextArea extends React.Component {
  constructor(props) {
      super(props);
      this.state = { textareaValue:""};
      this.handleInput = this.handleInput.bind(this);
      this.onblurFunc = this.onblurFunc.bind(this);
  }
  handleInput(e)
  {
      this.setState({textareaValue : e.target.value})
  }
  onblurFunc(e)
  {
      let valueObj = {"id": ((this.props.id) ? this.props.id : ""), "value": this.state.textareaValue}
      this.props.cbk && this.props.cbk(valueObj);
  }
  componentWillReceiveProps(newProps)
  {
      this.setState({textareaValue : ""})
  }
  render() {
      return(
        <textarea className="list-card-composer-textarea" placeholder="Enter a title for this card…" value = {this.state.textareaValue} onBlur = {this.onblurFunc} onChange = {this.handleInput}></textarea>
      )
  }
}

export class Comment extends React.Component {
  constructor(props)
  {
    super(props);
    this.textAreaChange = this.textAreaChange.bind(this);
    this.textAreaSaveEvent =this.textAreaSaveEvent.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);
    this.state={textAreaVal: ""}
  }
  closeOverlay(e)
  {
    document.getElementById("modal").style.display= 'none';
  }
  textAreaChange(event)
  {
    let value = event.target.value;
    this.setState({textAreaVal : value})
  }
  textAreaSaveEvent()
  {
    this.props.event({value : this.state.textAreaVal , targetList : this.props.Listname , targetCard : this.props.curcardName})
    this.setState({textAreaVal : ""})
    this.closeOverlay();
  }
  render()
  {
    return(
      <div className = "modalWrapper">
        <i className="fa fa-close"  onClick={this.closeOverlay} aria-hidden="true"></i>
        <div className="wrapperInner">
          <div className="wrapperHeader">
             <span className="cardTitle">{this.props.curcardName} <br/> <span className="small"> in list {this.props.Listname} </span></span>
          </div>
          <div className="wrapperBody">
              <div className = "Addedcomments">
                  {
                    this.props.commentArr.map(function(value , key)
                    {
                      return <div className = "comments">{value.commentVal}</div>
                    })
                  }
              </div>
              <div className="commentSection">
                  <div className = "commentHeader">Add Comment</div>
                  <div className ="commentBody">
                      <textarea placeholder ="Write a comment..." className="commentText" value={this.state.textAreaVal} onChange = {this.textAreaChange}></textarea>
                  </div>
                  <input type="button" className="saveBtn btn" value = "Save" onClick = {this.textAreaSaveEvent}></input>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

// Drag & Drop

const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle
});

const mapStateToProps = (state, props) => (
    {
       list: state.listTable
    }
  )
const mapActionToProps = (dispatch, props) => (
  {
      addCardToList: storeAddCardToList,
      storeDeleteList : storeDeleteList,
      updateCardToList : storeUpdateCardToList,
      deleteCard : storeDeleteCard,
      reorder : reorder,
      updateList : intercangeCards,
      addComment : storeAddComment
  })
export default connect(mapStateToProps , mapActionToProps)(RenderCard)