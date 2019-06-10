import { store } from './store'

const storeAddList = (name) => {
    const action = {
       type: 'createList',
       listname : name
    }
    console.log("storeAddList")
    store.dispatch(action)
 }
 const storeAddCardToList = (description , targetCard) => {
   const action = {
      type: 'addCardToList',
      description : description,
      targetCard
   }
   console.log("storeAddList")
   store.dispatch(action)
 }
 const storeDeleteList = (targetList) => {
   const action = {
      type : 'deleteList',
      targetList
   }
   store.dispatch(action)
 }
 const storeUpdateCardToList = (description , targetCard , targetIndex)=>
 {
   const action = {
      type: 'updateList',
      updatedDesc : description,
      targetCard,
      targetIndex
   }
   console.log("updateList")
   store.dispatch(action)
 }
 const storeDeleteCard = (targetCard , targetList) => {
   const action = {
      type : 'deleteCard',
      targetCard,
      targetList
   }
   store.dispatch(action)
}
const reorder = (list, startIndex, endIndex , targetList) => {
   const result = Array.from(list);
   const [removed] = result.splice(startIndex, 1);
   result.splice(endIndex, 0, removed);
   const action = {
      type : 'reorderArr',
      reordeArrVal : result,
      targetList
   }
   store.dispatch(action)
};

const intercangeCards = (list) => {
   const action = {
      type : 'interchangeCards',
      updatedList : list,
   }
   store.dispatch(action)
};

const storeAddComment = (commentObj) => {
   const action = {
      type : 'addComment',
      commentObj : commentObj,
   }
   store.dispatch(action)
};

export { 
    storeAddList,
    storeAddCardToList,
    storeDeleteList,
    storeUpdateCardToList,
    storeDeleteCard,
    reorder,
    intercangeCards,
    storeAddComment
}