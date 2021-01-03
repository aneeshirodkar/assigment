
import * as actionTypes from './actionTypes'

export const addlist = title =>{
    return{
        type:actionTypes.ADD_LIST,
        title:title
    }
}
export const editListTitle = (listID,title) =>{
    return{
        type:actionTypes.EDIT_LIST_TITLE,
        title:title,
        listID : listID
    }
}
export const deleteList = listID =>{
    return{
        type:actionTypes.DELETE_LIST,
        listID:listID,
    }
}
export const clearError = () =>{
    return{
        type:actionTypes.CLEAR_ERROR
        
    }
}
export const loadList = (listData) =>{
    return{
        type:actionTypes.LOAD_LIST,
        listData:listData
        
    }
}

export const dragStart = (droppableIdStart,droppableIdEnd,droppableIndexStart,droppableIndexEnd,draggableID,type) =>{
                               return{
                                   type: actionTypes.DRAG_START,
                                    droppableIdStart: droppableIdStart   
                                   ,droppableIdEnd :droppableIdEnd
                                   ,droppableIndexStart:droppableIndexStart
                                   ,droppableIndexEnd :droppableIndexEnd
                                   ,draggableID: draggableID
                                   ,dragType: type
                               }
                           }
