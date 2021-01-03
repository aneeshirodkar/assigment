import React,{useState} from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import * as action from '../Store/actions/index'
import {confirmAlert} from 'react-confirm-alert'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import '../../node_modules/react-confirm-alert/src/react-confirm-alert.css';
import { Draggable} from "react-beautiful-dnd"



import { connect } from 'react-redux';


 const TodoListItem =(props)=>{


    let [isEdit,setIsEdit] = useState(false)
    let [itemText,setitemText] = useState(props.text)

    const textChangeHandler = (e) =>{
        e.preventDefault();
        setitemText(e.target.value.trim())
    }
    const finalEditHandler = (e) =>{
        setIsEdit(false)
        props.onEditItemText(props.listID,props.itemID,itemText)
    }
    

    const deleteHandler = () =>{
        confirmAlert({
            title:'Confirm delete',
            message: 'Are you want to delete this Item',
            buttons:[
                {label: 'Yes',
                 onClick:() =>props.onDeleteItem(props.listID,props.itemID)  },
                {label: 'No',
                onClick:()=> {} }
            ]
        })
    }
    const cardContainer ={
        marginBottom: 8,
        zIndex :1
    }
   
  
    return(
        <Draggable draggableId={String(props.itemID)} index={props.index}>
          {provided =>(
                  <div ref={provided.innerRef}
                  {...provided.draggableProps}
                   {...provided.dragHandleProps} >
                
                        { isEdit ?
                 <form onSubmit={finalEditHandler} onBlur={() => setIsEdit(false)}>
                 <input type="textarea" value={itemText} onChange={textChangeHandler} autoFocus={true}   />
             </form>
               :
               <Card style ={cardContainer}>
                   <EditIcon color="disabled" fontSize="small"  
                    style ={{marginLeft:70, position:'relative',bottom:'2px',left:'82px'}}
                    onClick= {() => setIsEdit(true)}/>
                  <DeleteIcon color="disabled" onClick={() => deleteHandler()}
                       fontSize="small" style ={{marginLeft:70, position:'relative',bottom:'2px',left:'10px'}}/>
               <CardContent style={{padding:"5px"}}>
              <Typography gutterBottom>{props.text}</Typography>
              </CardContent>
          </Card>
                     }
                     
              
                  </div>
          )}  
      
        </Draggable>
         )
}

const mapDispatchToProps = dispatch =>{
    return{
      onEditItemText : (ListID,itemID,text) => dispatch(action.editItemText(ListID,itemID,text)),
       onDeleteItem :(ListID,itemID)=> dispatch(action.deleteItem(ListID,itemID))
    }
  }


export default connect(null,mapDispatchToProps) (TodoListItem)