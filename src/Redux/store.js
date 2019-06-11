import { createStore, combineReducers } from 'redux'

const createList = (state = 0, action) => {
    console.log("CreateList");
    switch (action.type) {
        case 'createList':               
            return Object.assign({}, state, {
                 Listnames: [
                        ...state.Listnames, {
                            listLabel: action.listname , cardArr: []}
                    ]
                })
        case 'addCardToList':
            var targetDom = action.targetCard;
            var Listnames = state.Listnames;
            let ListnamesLen = Listnames.length;
            let descripVal = action.description;
            if(Listnames && ListnamesLen)
            {
                for(let i=0; i< ListnamesLen ; i++)
                {
                    if(Listnames[i] && Listnames[i].listLabel && Listnames[i].listLabel === targetDom)
                    {
                        Listnames[i].cardArr.push({descripVal});
                    }
                }
            }
            return Object.assign({},state, {
                Listnames : [
                    ...Listnames
                ]
            });
        case 'deleteList':
                var targetDom = action.targetList;
                var tempList = state.Listnames;
                let tempListLeng = tempList.length;
                if(tempList && tempListLeng)
                {
                    for(let i=0; i< tempListLeng ; i++)
                    {
                        if(tempList[i] && tempList[i].listLabel && tempList[i].listLabel === targetDom)
                        {
                            delete(tempList[i])
                        }
                    }
                }
                return Object.assign({},state, {
                    Listnames : [
                         ...tempList
                    ]
                });
        case 'updateList':
                var targetDom = action.targetCard;
                let tempLists = state.Listnames;
                let tempListLength = tempLists.length;
                if(tempLists && tempListLength)
                {
                    var foundIndex = tempLists.findIndex(x => typeof(x) !="undefined" && x.listLabel ? x.listLabel === targetDom : "");
                    tempLists[foundIndex].cardArr[action.targetIndex] = {"descripVal":action.updatedDesc};
                }
                return Object.assign({},state, {
                    Listnames : [
                         ...tempLists
                    ]
                });
        case 'deleteCard' :
                var targetCard = action.targetCard;
                var targetList = action.targetList;
                let tempLst = state.Listnames;
                let tempLstLeng = tempLst.length;
                if(tempLst && tempLstLeng)
                {
                    for(let index=0; index< tempLstLeng ; index++)
                    {
                        if(tempLst[index] && tempLst[index].listLabel && tempLst[index].listLabel === targetCard)
                        {
                            delete(tempLst[index].cardArr[targetList])
                        }
                    }
                }
                return Object.assign({},state, {
                    Listnames : [
                         ...tempLst
                    ]
                });
        case 'reorderArr' :
                var targetList = action.targetList;
                var reorderedArr = action.reordeArrVal;
                let templist = state.Listnames;
                let templistLength = templist.length;
                if(templist && templistLength)
                {
                    for(let idx=0; idx< templistLength ; idx++)
                    {
                        if(templist[idx] && templist[idx].listLabel && templist[idx].listLabel === targetList)
                        {
                            templist[idx].cardArr = reorderedArr;
                        }
                    }
                }
                return Object.assign({},state, {
                    Listnames : [
                         ...templist
                    ]
                });
        case 'interchangeCards' :
                let listName = state.Listnames;
                let listNameLength = listName.length;
                if(listName && listNameLength)
                {
                    for(let indx=0; indx < listNameLength ; indx++)
                    {
                        let curListLabel = listName[indx] && listName[indx].listLabel ? listName[indx].listLabel : "";
                        if(listName[indx] && curListLabel)
                        {
                            listName[indx].cardArr = action.updatedList[curListLabel] ? action.updatedList[curListLabel] : listName[indx].cardArr;
                        }
                    }
                }
                return Object.assign({},state, {
                    Listnames : [
                         ...listName
                    ]
                });
        case 'addComment' :
                let trgtList = action.commentObj.targetList;
                let targtCard = action.commentObj.targetCard;
                let commentVal =action.commentObj.value;
                var listNames = state.Listnames;
                let listNamesLen = listNames.length;
                if(listNames && listNamesLen)
                {
                    for(let iVal=0; iVal< listNamesLen ; iVal++)
                    {
                        if(listNames[iVal] && listNames[iVal].listLabel && listNames[iVal].listLabel === trgtList)
                        {
                            let cardArray = listNames[iVal] && listNames[iVal].cardArr ? listNames[iVal].cardArr : [];
                            let cardArrayLen = cardArray.length;
                            for(let cidx=0 ;cidx < cardArrayLen ; cidx++)
                            {
                                if(cardArray[cidx] && cardArray[cidx].descripVal && cardArray[cidx].descripVal === targtCard)
                                {
                                    if(typeof(listNames[iVal].cardArr[cidx].commentArr) === "undefined")
                                    {
                                        listNames[iVal].cardArr[cidx].commentArr = [];
                                    }
                                    listNames[iVal].cardArr[cidx].commentArr.push(commentVal)
                                }
                            }
                            
                        }
                    }
                }
                return Object.assign({},state, {
                    Listnames : [
                        ...listNames
                    ]
                });
        default : 
            return state
    }
}

const allReducers = combineReducers({
    listTable: createList
})

const store = createStore(
    allReducers,
    {
        listTable : {"Listnames":[]}
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store }