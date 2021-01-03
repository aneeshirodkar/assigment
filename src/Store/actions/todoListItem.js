import * as actionTypes from './actionTypes'

export const addItem = (text,listID) =>{
    return{
        type:actionTypes.ADD_ITEM,
        text:text,
        listID :listID
    }
}

export const editItemText = (listID,itemID,text) =>{
    return{
        type:actionTypes.EDIT_ITEM_TEXT,
        text:text,
        listID :listID,
        itemID:itemID
    }
}

export const deleteItem = (listID,itemID) =>{
    return{
        type:actionTypes.DELETE_ITEM,
        listID :listID,
        itemID:itemID
    }
}

export const onDropItem =(item,listID) =>{
    return{
        type:actionTypes.ON_DROP_ITEM,
        listID :listID,
        item:item
    }
}