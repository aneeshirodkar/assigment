import React, { Component } from "react";
import './MainContainer.css'
import { connect } from 'react-redux'
import TodoList from '../Component/TodoList'
import AddButton from'../Component/UI/AddButton/AddButton'
import {confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import * as  action from '../Store/actions/index';
import {DragDropContext, Droppable} from "react-beautiful-dnd"

const colors=[
  { key:"default",
    value:{
    dark:"#778899",
    light:"#dfe3e6"
        }
      },
       { key:"Blue",
        value:{
          dark:"#203647",
          light:"#4DA8DA"
        }
        },
        { key:"Olive",
        value:{
          dark:"#39603D",
          light:"#DADED4"
        }
        },
        { key:"Green",
        value:{
          dark:"#164A41",
          light:"#9DC88D"
        }
        },
        { key:"Pink",
        value:{
          dark:"#A28089",
          light:"#ffa8B6"
        }
        },
        { key:"Lavender",
        value:{
          dark:"#494d5f",
          light:"#E6E6FA"
        }
        }
    ]
    
class MainContainer  extends Component {


  state = {
    selectValue:"",
    lightColor:"#dfe3e6",
    darkColor:"#778899",
    anchorEl : null
  };
 
  handleDropdownChange=(e)=> {
    if(e.target.value !== "")
    {
    this.setState({ selectValue: e.target.value });
    let list =colors.filter( c => (c.key === e.target.value))
    let value = list[0].value
    let c =[]
    c.push(value.dark);c.push(value.light)
     console.log(c)
    this.setState({ darkColor: value.dark });
    this.setState({ lightColor:value.light });
    console.log(this.state)
    localStorage.setItem("color",JSON.stringify(c))
  }
    
  }
 
  componentDidMount(){
    const stateinfo = JSON.parse(localStorage.getItem("dataList"))
    let color=JSON.parse(localStorage.getItem("color")) ;

    if(color !== null){
      this.setState({ darkColor: String(color[0]),lightColor:String(color[1]) });
   }
      
    this.props.onLoad(stateinfo)
  }
  componentDidUpdate(){
    localStorage.setItem("dataList",JSON.stringify(this.props.todoList))
  }
  
onDragEnd =(results) =>{
 
  const { destination, source,draggableId,type} =results
  if(!destination){
    return
  }
  this.props.onDragStart(source.droppableId, destination.droppableId,source.index,destination.index,draggableId,type)
}

  render()
  {const style = {
    header :{
    background:this.state.darkColor,   
    color:"white",
    padding:"20px",
    },
    header_text:{
      fontSize:"22px",
      textAlign:"center",
      
    }
    }

 
    return (
<DragDropContext onDragEnd={this.onDragEnd}>
   <div>
     <div style={style.header}><h2 style={style.h}>Task Management</h2>
     <div>
      <select 
        value={this.state.selectValue}
        onChange={this.handleDropdownChange}
         >
        <option key={0} value="">Change Theme</option> 
        {
        colors.map( c => (
          <option key={c.key} value={c.key}>{c.key}</option>
    ))}
    
      </select>
     
     
      </div>   </div> 
    { this.props.error ===1 || this.props.error ===2?
  confirmAlert({
    title: this.props.error ===1 ?'Duplicate List Name' :'Duplicate Item Name',
    message: this.props.error ===1 ? 'list name should be unique': 'list name should be unique',
    buttons:[
        {label: 'OK',
         onClick:() =>this.props.onOkButtonCLick()  }
            ]
      })
    :
    (
     
      <Droppable  droppableId="all-lists" direction="horizontal" type="list">
      { provided =>(
          <div className="flex-container wrap" {...provided.droppableProps} 
          ref={provided.innerRef}>
          { this.props.todoList.length >0 ?
         this.props.todoList.map((list,idx) =>(
            <TodoList key={list.id} listID={list.id} title={list.title} todoitem={list.todoitem} index={idx} lightColor={this.state.lightColor}/>
            ))
          : null
         }
         {provided.placeholder}
      <AddButton list color={this.state.lightColor}/>
      </div>
      )}
      
       </Droppable>
       )
    }
    </div>
    </DragDropContext>
 
  )
  }
}
const mapStateToProps = state =>({
  todoList :state.lists.dataList,
  error:state.lists.error
})
const mapDispatchToProps = dispatch =>{
  return{
    onOkButtonCLick : () => dispatch(action.clearError()),
    onLoad: (listData) =>dispatch(action.loadList(listData)),
     onDragStart : (droppableIdStart,droppableIdEnd,droppableIndexStart,droppableIndexEnd,draggableID,type)=> dispatch(action.dragStart(droppableIdStart,droppableIdEnd,droppableIndexStart,droppableIndexEnd,draggableID,type))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainContainer);


