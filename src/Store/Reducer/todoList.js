import * as actionTypes  from "../actions/actionTypes";

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

const updateText =(todoitem,itemID,text) =>{
 let newtodoitem=  todoitem.map(item => {
       if(item.id === itemID){
           return{
               ...item,
               text:text
           }
       }
       return item
   })
   return newtodoitem
}
const deleteItem =(todoitem,itemID,text) =>{
    const newtodoitem = [...todoitem]
    let index =newtodoitem.findIndex( item => item.id ===itemID )
    newtodoitem.splice(index,1)
    console.log(newtodoitem)
    return newtodoitem
}
const reducer = (state=initialState,action) =>{
    
    switch(action.type){
        case actionTypes.ADD_LIST:
           
            if(!state.dataList.length  >0) {
                const newtodoList={
                    id:Date.now(),
                    title: action.title,
                    todoitem:[]
                    
                }
               ///s listID=listID +1
                return {...state,
                    dataList:[ ...state.dataList,
                        newtodoList]}
            }
                if(state.dataList.filter(a => a.title === action.title).length ===0) //Aneesha
           { const newtodoList={
                id:Date.now(),
                title: action.title,
                todoitem:[]
                
            }
           ///s listID=listID +1
            return {...state,
                    dataList:[
                        ...state.dataList,
                        newtodoList
                                ]     
                              }
                            }
            else{
                return{
                    ...state,
                    error:1
                }
            }

        

        case actionTypes.ADD_ITEM:
            const lists =[...state.dataList]
        let k =[]
        lists.forEach(i=>{i.todoitem.forEach(j=>{k.push(j)})}) 
    
        if(k.filter(a => a.text ===action.text).length === 0)
        {
            let allTodoItem = lists.map(i=> i.todoitem)
        console.log(allTodoItem)
                        const newtodoItem ={
                            text:action.text,
                            id: Date.now()
                        } 
           const newdataList= state.dataList.map(list =>{
                        if(list.id === action.listID){
                            return{
                                ...list,
                                todoitem:[
                                       ...list.todoitem,
                                       newtodoItem 
                                ]

                            }
                        }
                        return list
                    })
                    return {...state,
                        dataList :newdataList
                    }
                }
                else{
                    return{
                        ...state,
                        error:2
                    }
                }
            
                
            
             
            
              
                   

        case actionTypes.EDIT_LIST_TITLE:
            if(state.dataList.filter(a => a.title === action.title).length ===0) {
                        const changeddataList=state.dataList.map(list =>{
                            if(list.id === action.listID){
                                return{
                                    ...list,
                                    title:action.title
    
                                }
                            }
                            return list
                        })
                        return {
                            ...state,
                        dataList :changeddataList
                        }
                    }
                    else{
                        return {
                            ...state,
                        error :1
                        }
                    }

        case actionTypes.DELETE_LIST:
                            let modifiedDataList = [...state.dataList]
                            let index =modifiedDataList.findIndex( list => list.id ===action.listID )
                            modifiedDataList.splice(index,1)
                            console.log(modifiedDataList)
                            return {
                                ...state,
                                dataList:modifiedDataList
                            }

        case actionTypes.EDIT_ITEM_TEXT:
            const listss =[...state.dataList]
        let q =[]
        listss.forEach(i=>{i.todoitem.forEach(j=>{q.push(j)})}) 
    
        if(q.filter(a => a.text ===action.text).length === 0){
            let editDataList = [...state.dataList]
               let neweditdataList=   editDataList.map(list =>{
                                    if(list.id === action.listID){
                                        let currTodoItem =list.todoitem
                                       let newTodoItem= updateText( currTodoItem,action.itemID,action.text)
                                      return{  ...list,
                                        todoitem:newTodoItem
                                       }
                                    }
                                    return list
                            })
                            return {
                                ...state,
                                dataList:neweditdataList
                            }
                        }
                        else{
                            return{
                                ...state,
                                error:2
                            }
                        }
                         //return state
        case actionTypes.DELETE_ITEM:
            let deletedItemList = [...state.dataList]
            let newdeletedItemList=deletedItemList.map(list =>{
                if(list.id === action.listID){
                    let currTodoItem =list.todoitem
                   let newTodoItem= deleteItem( currTodoItem,action.itemID,action.text)
                  return{  ...list,
                    todoitem:newTodoItem
                   }
                }
                return list
        })
    
        return {
            ...state,
            dataList:newdeletedItemList
        }
        
        case actionTypes.CLEAR_ERROR:
                                        return{ ...state,
                                                    error:0}

        case actionTypes.LOAD_LIST:
                                    if(action.listData !== null)
                                     return{
                                         ...state,
                                         dataList:action.listData
                                     }
                                     else{
                                         return state
                                     }
        case actionTypes.DRAG_START:
            // droppableIdStart,droppableIdEnd,
            //                droppableIndexStart,droppableIndexEnd,
            //                draggableID
            const newState =[...state.dataList]
            if(action.dragType ==="list"){
                const list = newState.splice(parseInt(action.droppableIndexStart,10),1)
                newState.splice(parseInt(action.droppableIndexEnd,10),0,...list)
                return{ ...state,dataList:newState}
            }
            if(action.droppableIdStart === action.droppableIdEnd){
                const list = newState.find(l => l.id=== parseInt(action.droppableIdStart,10))
                const todoItem = list.todoitem.splice(action.droppableIndexStart,1)
                list.todoitem.splice(parseInt(action.droppableIndexEnd,10),0,...todoItem)
                console.log(newState)
                console.log(list)
            }
            if(action.droppableIdStart !== action.droppableIdEnd){
                const listStart = newState.find(l=> l.id=== parseInt(action.droppableIdStart,10))

                const todoItem = listStart.todoitem.splice(action.droppableIndexStart,1)

                const listend = newState.find(l=> l.id=== parseInt(action.droppableIdEnd,10))

                listend.todoitem.splice(parseInt(action.droppableIndexEnd,10),0,...todoItem)
            }
            return {...state, dataList:newState}
        
        default:
            return state
    }
}

export default reducer