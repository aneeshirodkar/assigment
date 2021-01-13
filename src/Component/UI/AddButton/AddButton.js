import React, { Component } from'react'
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux'
import * as actions from '../../../Store/actions/index'


class AddButton extends Component{

  state ={
    isAddClick: false,
    enterTextError:false
  }
   
    addClickHandler=()=>{
        this.setState(prevstate =>{
          return{  isAddClick: !prevstate.isAddClick}
        }

        )
        

    }
    closeClickHandler=()=>{
        this.setState(prevstate =>{
          return{  isAddClick: !prevstate.isAddClick,
                  enterTextError  :false   }
        }

        )
        

    }
    addListHandler =(e) =>{
      if(e.keyCode ===13 && e.target.value.trim() !== "")
     { 
      const text = e.target.value.trim()
      this.closeClickHandler()
      this.props.onTodoListADD(text)
    }
    if(e.keyCode ===13 && e.target.value.trim() === ""){
      this.setState(
        { enterTextError: true}
      )
      
   }
    return
    }

    addItemHandler =(e) =>{
      if(e.keyCode ===13 && e.target.value.trim() !== "")
      { 
       const text = e.target.value.trim()
       this.closeClickHandler()
       this.props.onTodoItemAdd(text,this.props.listID)
     }
     if(e.keyCode ===13 && e.target.value.trim() === ""){
        this.setState(
          { enterTextError: true}
        )
       
     }

     return
    }

    render(){
        const buttonText = this.props.list? "Add another List" : "Add a card"
        const placeholder =this.props.list? "Enter List Name" : "Enter Task Name"
        const style ={
            opacity:0.5,
            fontWeight:"bold",
            color:"darkblue",
            backgroundColor:"inherit",
            display:"flex",
            alignItems:"center",
            cursor:"pointer",
            height:28,
            width:172
        
    
        }
        let textareastyle ={
            // resize:"none",
            border:"none",borderColor:"transparent",
            
           
              
           
         }
         if(this.props.list) textareastyle ={...textareastyle, backgroundColor:this.props.color}
    return(
      this.state.isAddClick ?
            <div data-test="Addinputcomp">
                <input placeholder={placeholder}
                        autoFocus= {true} 
                        onBlur ={this.closeClickHandler}
                        // ref={(i)=>this.inputValue =i} 
                        style={textareastyle}
                        onKeyDown={this.props.list ?(e)=>this.addListHandler(e):(e)=>this.addItemHandler(e)}
                        />
                    {this.state.enterTextError ? <label style={{fontSize:"small",color:"red"}}>Name is madatory.</label>: null}
                
            </div>
: <div data-test="Addbtncomp" style ={style} onClick = {this.addClickHandler}>
            <AddIcon/>
            {buttonText}
        </div>
    )
}
}

export const mapDispatchToProps = dispatch =>{
  return{
    onTodoListADD : (text) => dispatch(actions.addlist(text)),
    onTodoItemAdd : (text, listID) => dispatch (actions.addItem(text,listID))
  }
}

export default connect(null,mapDispatchToProps) (AddButton)