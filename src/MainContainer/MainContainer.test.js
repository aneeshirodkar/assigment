import * as actions from '../Store/actions/index'
import * as actionTypes from '../Store/actions/actionTypes'
import { mount,configure,shallow } from 'enzyme'
import React from 'react'
import {testStore} from  '../Util'

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
describe('Main Component actions', () => {

  
  it('should create an action to clear error', () => {
    const expectedAction = {
        type:actionTypes.CLEAR_ERROR
    }
    expect(actions.clearError()).toEqual(expectedAction)
  })

  it('should create an action to load data from localstorage', () => {
    const stateinfo = JSON.parse(localStorage.getItem("dataList"))
    const expectedAction = {
        type:actionTypes.LOAD_LIST,
        listData:stateinfo
    }
    expect(actions.loadList(stateinfo)).toEqual(expectedAction)
  })
  it('should update store properly for clear error', () => {
   
   const store = testStore(initialState)

   store.dispatch(actions.clearError())
   
     const newSTate = store.getState()
     expect(newSTate).toEqual(initialState)
  

  })
  it('should update store properly for load list', () => {
   
    const store = testStore(initialState)
    const stateinfo = JSON.parse(localStorage.getItem("dataList"))
    store.dispatch(actions.loadList())
    console.log(stateinfo)
      const newSTate = store.getState()
      expect(newSTate).toEqual(newSTate)
   
 
   })
})