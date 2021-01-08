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
describe('TodoList Component actions', () => {

  
  it('should create an action to edit a list', () => {
    const title = 'Done1'
    const listID =1
    const expectedAction = {
        type:actionTypes.EDIT_LIST_TITLE,
        title:title,
        listID : listID
    }
    expect(actions.editListTitle(listID,title)).toEqual(expectedAction)
  })
  it('should create an action to delete list', () => {
    const listID=1
    const expectedAction = {
        type:actionTypes.DELETE_LIST,
        listID:listID,
    }
    expect(actions.deleteList(listID)).toEqual(expectedAction)
  })
})


  describe('TodoList Component reducer', () => {

  
    // it('should return the initial state', () => {
    //   expect(reducer(undefined, {})).toEqual(
    //    initialState
    //   )
    // })

    it('should handle EDIT_List_Title', () => {
      expect(
        reducer( initialState, {
            type:actionTypes.EDIT_LIST_TITLE,
            title:"Done1",
            listID : 1
        })
      ).toEqual({"dataList": [{"id": 0, "title": "Todo", "todoitem": [{"id": 3, "text": "wash clothes"}, {"id": 4, "text": "pay bill"}]}, {"id": 1, "title": "Done1", "todoitem": [{"id": 5, "text": "bank"}, {"id": 6, "text": "book"}]}], "error": 0})
  
      
    })

    it('should handle Delete_list', () => {
      expect(
        reducer( initialState, {
            type:actionTypes.DELETE_LIST,
            listID:1,
        })
      ).toEqual({"dataList": [{"id": 0, "title": "Todo", "todoitem": [{"id": 3, "text": "wash clothes"}, {"id": 4, "text": "pay bill"}]}], "error": 0})
  })
  

})
