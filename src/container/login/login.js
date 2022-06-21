import React, { Component } from 'react'
import  { FaUser,FaLock,FaEye} from 'react-icons/fa'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import {Form,InputGroup,InputGroupAddon, InputGroupText,NavLink,FormGroup,Label,Input,Button,Modal, ModalHeader, ModalBody, ModalFooter,FormFeedback} from 'reactstrap'
import { thisExpression, binaryExpression } from '@babel/types';
import {Link, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'


import * as login_action from '../../action/login/login_action'
import { createRequire } from 'module';
class login extends Component {
    constructor(props) {
        
        super(props)
        console.log("props1:"+this.props.flag)
     
        this.state = {
             name:'',
             pwd:'',
             show:false,
             error:[{username:'',pwd:''}],
             modal:true
        }
    }

   
    
    handleChange=(e)=>{
        
        this.setState({
            [e.target.name]:e.target.value
        })
    
    }
   
    validation=(e)=>{
      
        let err={...this.state.error};
        var stateName=e.target.name
        console.log(stateName)
        if(e.target.value.trim().length==0){
           
            if(stateName=="name")
                err[stateName]="please enter the name";
            if(stateName=="pwd")
                err[stateName]="please enter the password";    
        }else
        err[stateName]=""
        if(stateName=="name"){
            if(this.state.name!==""){
               
                if(!/^[a-zA-Z]+$/.test(this.state.name))
                err[stateName]="username must contain alphabet characters only";
                
            }
        }
        if(stateName=="pwd"){
            if(this.state.pwd!==""){
            if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/.test(this.state.pwd))
                err[stateName]="password length must be 8 to 12 and have capital,small alphabet and digit";
            }

        }
        e.target.className += " was-validated";
        this.setState({
            error:err
        })
        console.log(this.state.error)
       
    }
    btnLogin_Click=(e)=>{
        
         let err={...this.state.error};
        if(this.state.name==""){
            err['name']="please enter the name"


        }
        else
            err['name']=""
        if(this.state.pwd==""){
            err['pwd']="please enter the password"


        }
        else
             err['pwd']=""
        
        this.setState({
            error:err
        })
        if(this.state.name=="" || this.state.pwd==""){
            //alert("plaese enter all data")
         

        }else{
            console.log(this.state)
            this.props.action.auth_login.login_user(
                this.state
               
            ).then((item)=>{
          //  this.props.history.push("/view")
        })
            .catch((error)=>{
                alert(error)
            })
          

            
        }
    }
    
    toggle=(e)=>{
        this.setState({
            modal:!this.state.modal
        });
    }

   show_Pwd=()=>{
    this.setState({
        show:!this.state.show
    })
   }
    render() {
        
        var form_size={
           
            padding:"40px",
           }
         
        return (
            
            <div>
                
                <center>
                {/* <MDBCard>
        <MDBCardBody className="mx-4"> */}
        {this.state.modal ? 
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                <ModalHeader cssModule={{ 'modal-title': 'w-100 text-center' }} className="header pt-3 grey lighten-2"  toggle={this.toggle} ><h1  className="black-text text-center mb-3 pt-3 font-weight-bol">player Login</h1></ModalHeader>
                <ModalBody> 
               
                <Form   style={form_size}>
                        
                        <FormGroup>
                            <Label>Username:</Label>
                            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><FaUser/></InputGroupText>
                </InputGroupAddon>
                <Input invalid={this.state.error.name?true:false} valid={(!this.state.error.name && this.state.name!=="")?true:false} type="text" onBlur={this.validation}  name="name" onChange={this.handleChange} placeholder="Enter username" />
                           
                            {this.state.error.name &&
                            <FormFeedback>{this.state.error.name}</FormFeedback>
                            }
              </InputGroup>
                           
                        </FormGroup>
                        <FormGroup>
        
                            <Label>Password:</Label>
                               <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><FaLock/></InputGroupText>
                </InputGroupAddon>
                            <Input   icon="user" invalid={this.state.error.pwd?true:false} valid={(!this.state.error.pwd && this.state.pwd!=="")?true:false} type={this.state.show?"text":"password"} onBlur={this.validation}  name="pwd" onChange={this.handleChange} placeholder="Enter password" />
                          
                {this.state.pwd!=="" &&<InputGroupAddon addonType="append">
                         <InputGroupText onClick={this.show_Pwd}><FaEye/></InputGroupText>
                </InputGroupAddon>}
                           
                            {this.state.error.pwd &&
                            <FormFeedback>{this.state.error.pwd}</FormFeedback>
                            }
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                        <Label></Label>
                        <div className="text-center mb-3">
                        <MDBBtn
                          type="button"
                          gradient="blue"
                          onClick={this.btnLogin_Click}
                          rounded
                          className="btn-block z-depth-1a"
                        >
                          Sign in
                        </MDBBtn>
                      </div>
                            {/* <Button className="btn" style={{ background:"#fb641b",border:"none",color:"white"}}  block   color="primary" onClick={this.btnLogin_Click}>Login</Button>
                            */}
                        </FormGroup>
                        <p className="font-small grey-text d-flex justify-content-end">
                        Not a member?
                        <NavLink to="/signup" tag={Link} className="blue-text ml-1 font-weight-bold">
                             Sign Up
                        </NavLink>
                      </p>
                        </Form>
                      
                    </ModalBody>
                
                    <ModalFooter >
                  
                  <Button color="danger" onClick={this.toggle} >Cancel</Button>
                </ModalFooter>
              </Modal>
         : (<Redirect to = '/'/>)}
      
      {/* </MDBCardBody>
                </MDBCard> */}
            </center>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    const {auth_login}=state;
    return{
        auth_login
    }
}
const mapdDispatchToProps=dispatch=>({
    action:{
        auth_login:bindActionCreators(login_action,dispatch)
    }
})
export default connect(mapStateToProps,mapdDispatchToProps)(login)