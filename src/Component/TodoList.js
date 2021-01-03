import React,{useState} from 'react'
import './TodoList.css'
import TodoListItem from './TodoListItem'
import AddButton from './UI/AddButton/AddButton'
import * as action from '../Store/actions/index'
import {confirmAlert} from 'react-confirm-alert'
import '../../node_modules/react-confirm-alert/src/react-confirm-alert.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import {Draggable, Droppable} from "react-beautiful-dnd"


const TodoList =(props)=>{



    let [isEdit,setIsEdit] = useState(false)
    let [listTitle,setListTitle] = useState(props.title)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = (type) => {
          if(type ==="edit"){ setIsEdit(true)}
          if(type ==="delete"){deleteHandler()}
        setAnchorEl(null);
      };
    const titleChangeHandler = (e) =>{
        e.preventDefault();
        setListTitle(e.target.value.trim())
    }
    const finalEditHandler = (e) =>{
        setIsEdit(false)
        props.onEditListTitle (props.listID,listTitle)
    }

    const deleteHandler = () =>{
        confirmAlert({
            title:'Confirm delete',
            message: 'Are you want to delete this List',
            buttons:[
                {label: 'Yes',
                 onClick:() =>props.onDeleteList(props.listID)  },
                {label: 'No',
                onClick:()=> {} }
            ]
        })
    }
 const style = { 
    container:  {
      background: props.lightColor,
      borderRadius: "5px",
      width: "200px",
      padding: "8px",
      height: "426px",
      marginRight: "10px",
      marginTop: "8px",}
  }
    return(
      <Draggable draggableId={String(props.listID)} index={props.index}>
        {provided => (
           <div  
           ref={provided.innerRef}
           {...provided.draggableProps}
           {...provided.dragHandleProps}
           >
            <Droppable droppableId ={String(props.listID)}>
            {provided =>(
                  <div style={style.container}{...provided.droppableProps}ref={provided.innerRef}> 
                   
                {   isEdit ?
            
                           <form onSubmit={finalEditHandler} style={{padding:"10px"}}>
                           <input type="text" value={listTitle} onChange={titleChangeHandler} autoFocus={true} 
                               onBlur= {() => setIsEdit(false)}/>
                           </form>
                        
                   :
                   <Card style={{background:"transparent",padding:"0px"}}>
                   <CardHeader style={{fontWeight:"bold",fontSize:"small" ,padding:"5px"}}
                   action={
                       <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                         <MoreVertIcon />
                       </IconButton>
                     }
                     title={props.title}
                   />
                    <Menu
               id="simple-menu"
               anchorEl={anchorEl}
               keepMounted
               open={Boolean(anchorEl)}
               onClose={handleClose}
             >
               <MenuItem onClick={()=>handleClose("edit")}>Edit</MenuItem>
               <MenuItem onClick={()=>handleClose("delete")}>Delete</MenuItem>
               
             </Menu>
                   </Card>
              
           }
           
               <div >
               {props.todoitem.map((item,idx) =>
               <TodoListItem key={item.id} text={item.text} listID={props.listID} itemID={item.id} index={idx}/>)}
               </div>
               <AddButton listID={props.listID}/>
               {provided.placeholder}
               </div> 
            )}
           
            </Droppable> 
            </div>
    )}
      
        </Draggable>
         )
}
const mapDispatchToProps = dispatch =>{
    return{
      onEditListTitle : (ListID,listTitle) => dispatch(action.editListTitle(ListID,listTitle)),
      onDeleteList: (ListID)=>dispatch(action.deleteList(ListID)),
     
    }
  }

export default connect(null,mapDispatchToProps) (TodoList)