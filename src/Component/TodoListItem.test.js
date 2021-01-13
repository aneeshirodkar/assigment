import * as actions from '../Store/actions/index'
import * as actionTypes from '../Store/actions/actionTypes'
import { mount,configure,shallow } from 'enzyme'
import React from 'react'


import reducer from '../Store/Reducer/todoList'

import Adapter from 'enzyme-adapter-react-16';

configure({adapter : new Adapter ()}) 

  const initialState ={
    dataList :[{title:"Todo",
                id: 0,
                 todoitem: [
             { 
                id:3, 
                text:"wash clothes"
                  },
            { 
                  id:4, 
                   text:"pay bill"
                }
                ]
                }
            ,{title:"Progress",
                id: 1,
                todoitem: [
                { 
                     id:5, 
                    text:"bank"
                },
                { 
                    id:6, 
                    text:"book"
                }
                ]
                }
                ],
error:0
}
describe('TodoListItem Component actions', () => {

  
  it('should create an action to edit a item in list', () => {
    const text = 'Done1'
    const listID =1
    const itemID =5
    const expectedAction = {
        type:actionTypes.EDIT_ITEM_TEXT,
        text:text,
        listID :listID,
        itemID:itemID
    }
    expect(actions.editItemText(listID,itemID,text)).toEqual(expectedAction)
  })
  it('should create an action to delete a item in list', () => {
    const listID=1
    const itemID =5
    const expectedAction = {
        type:actionTypes.DELETE_ITEM,
        listID :listID,
        itemID:itemID
    }
    expect(actions.deleteItem(listID,itemID)).toEqual(expectedAction)
  })
})


  describe('TodoListItem Component reducer', () => {

  

    it('should handle EDIT_Item_Text', () => {
      expect(
        reducer( initialState, {
            type:actionTypes.EDIT_ITEM_TEXT,
            text:"text1",
            listID :1,
            itemID:5
        })
      ).toEqual({"dataList": [{"id": 0, "title": "Todo", "todoitem": [{"id": 3, "text": "wash clothes"}, {"id": 4, "text": "pay bill"}]}, {"id": 1, "title": "Progress", "todoitem": [{"id": 5, "text": "text1"}, {"id": 6, "text": "book"}]}], "error": 0})
  
      
    })
    it('should handle EDIT_Item_Text it should handle duplicate', () => {
      expect(
        reducer( initialState, {
            type:actionTypes.EDIT_ITEM_TEXT,
            text:"wash clothes",
            listID :1,
            itemID:5
        })
      ).toEqual({"dataList": [{"id": 0, "title": "Todo", "todoitem": [{"id": 3, "text": "wash clothes"}, {"id": 4, "text": "pay bill"}]}, {"id": 1, "title": "Progress", "todoitem": [{"id": 5, "text": "bank"}, {"id": 6, "text": "book"}]}], "error": 2})
  
      
    })

    it('should handle Delete_Itemt', () => {
      expect(
        reducer( initialState, {
        type:actionTypes.DELETE_ITEM,
        listID :1,
        itemID:5
        })
      ).toEqual({"dataList": [{"id": 0, "title": "Todo", "todoitem": [{"id": 3, "text": "wash clothes"}, {"id": 4, "text": "pay bill"}]}, {"id": 1, "title": "Progress", "todoitem": [ {"id": 6, "text": "book"}]}], "error": 0})
    })

  

})
