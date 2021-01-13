import * as actions from '../../../Store/actions/index'
import * as actionTypes from '../../../Store/actions/actionTypes'
import { mount,configure,shallow } from 'enzyme'
import AddButton from './AddButton'
import React from 'react'
import {testStore} from '../../../Util'

import reducer from '../../../Store/Reducer/todoList'
import { mapDispatchToProps } from './AddButton';
import Adapter from 'enzyme-adapter-react-16';
import AddIcon from '@material-ui/icons/Add';

// Create the mock store
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux'


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

//const mockStore = configureMockStore(... initialState);

describe('ADD Component actions', () => {

  
  it('should create an action to add a list', () => {
    const title = 'Done1'
    const expectedAction = {
        type:actionTypes.ADD_LIST,
        title
    }
    expect(actions.addlist(title)).toEqual(expectedAction)
  })
  it('should create an action to add a item to list', () => {
    const text = 'new item',listID=1
    const expectedAction = {
        type:actionTypes.ADD_ITEM,
        text:text,
        listID :listID
    }
    expect(actions.addItem(text,listID)).toEqual(expectedAction)
  })
})


  describe('ADD Component reducer', () => {

  
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(
       initialState
      )
    })

    it('should handle ADD_List', () => {
      expect(
        reducer( initialState, {
          type: actionTypes.ADD_LIST,
          title: 'Inprogress'
        })
      ).toEqual({"dataList": [{"id": 0, "title": "Todo", "todoitem": [{"id": 3, "text": "wash clothes"}, {"id": 4, "text": "pay bill"}]}, {"id": 1, "title": "Progress", "todoitem": [{"id": 5, "text": "bank"}, {"id": 6, "text": "book"}]}, {"id": Date.now(), "title": "Inprogress", "todoitem": []}], "error": 0})
  
      
    })
    it('should handle ADD_Item', () => {
      expect(
        reducer( initialState, {
          type:actionTypes.ADD_ITEM,
        text:"reading book",
        listID :1
        })
      ).toEqual({"dataList": [{"id": 0, "title": "Todo", "todoitem": [{"id": 3, "text": "wash clothes"}, {"id": 4, "text": "pay bill"}]}, {"id": 1, "title": "Progress", "todoitem": [{"id": 5, "text": "bank"}, {"id": 6, "text": "book"},{"id": Date.now() , "text": "reading book"}]}], "error": 0})
 })  
    it('should handle ADD_List of duplicate name', () => {
      expect(
        reducer( initialState, {
          type: actionTypes.ADD_LIST,
          title: 'Todo'
        })
      ).toEqual({"dataList": [{"id": 0, "title": "Todo", "todoitem": [{"id": 3, "text": "wash clothes"}, {"id": 4, "text": "pay bill"}]}, {"id": 1, "title": "Progress", "todoitem": [{"id": 5, "text": "bank"}, {"id": 6, "text": "book"}]}], "error": 1})
  
      
    })
  
  it('should handle ADD_Item of duplicate name', () => {
    expect(
      reducer( initialState, {
        type:actionTypes.ADD_ITEM,
      text:"pay bill",
      listID :1
      })
    ).toEqual({"dataList": [{"id": 0, "title": "Todo", "todoitem": [{"id": 3, "text": "wash clothes"}, {"id": 4, "text": "pay bill"}]}, {"id": 1, "title": "Progress", "todoitem": [{"id": 5, "text": "bank"}, {"id": 6, "text": "book"}]}], "error": 2})
})  
  

})


// describe('ADD Component render', () => {
//   let wrapper, store;
//   beforeEach(() => {
    
//     const store = testStore(initialState)
    
//     wrapper = shallow(
//       <Provider store={store}>
//         <AddButton  list={1}/>
//         </Provider>
//     );
// });
//     it('should render <BuildControls/> when receiving ing ',()=>{
//     //  const acr = store.getActions()
//    console.log(wrapper.debug())
//     //expect(wrapper.exists(<AddIcon/>)).toBe(true)
//     })


// })
