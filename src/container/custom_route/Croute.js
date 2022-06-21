import React, { Component } from 'react'
import { Redirect,Route} from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import * as Login_action from '../../action/login/login_action'
import { is } from '@babel/types';

 class Croute extends Component {
    getExtractedJson ({component,cprivate,crole,auth,action,...rest}){
        return rest
    }
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    logout=(props)=>{
        console.log("componentWillUpdate")
        setTimeout(function(){
        alert("hii")
        
            props.action.auth_login.logout_user()
        
        }, 1000*5);
       
    }
    render() {
      debugger;
        const rest=this.getExtractedJson(this.props);
      
        const isUserLoggedIn=this.props.auth_login.token? this.props.auth_login.token!=="":false
        const {component,crole,cprivate} =this.props
        let redirectTo=undefined;
        const  Component=component;
        

        const userrole=this.props.auth_login.role
        
        if(!isUserLoggedIn && rest.path=="/home"){
            redirectTo="/login"
        }
        if(isUserLoggedIn && rest.path=="/" && userrole=="user")
        redirectTo="/home"

        if(isUserLoggedIn && rest.path=="/" && userrole=="admin")
        redirectTo="/admin_home"
        if(!isUserLoggedIn && rest.path=="/admin_home"){
            redirectTo="/login"
        }
        if(!isUserLoggedIn && rest.path=="/"){
            redirectTo="/login"
        }
        
        if(!isUserLoggedIn && rest.path=="/unauthorised_access")
        redirectTo="/login"
        
        if(isUserLoggedIn && (rest.path=="/admin_home"||rest.path=="/view"||rest.path=="/view_selected_user") && userrole=="user")
        redirectTo="/unauthorised_access"
        if(isUserLoggedIn && rest.path=="/login" && userrole=="admin")
        redirectTo="/admin_home"
        
        if(!isUserLoggedIn && rest.path=="/view")
        redirectTo="/login"
        if(isUserLoggedIn && (rest.path=="/login" || rest.path=="/signup") && userrole=="user")   
            redirectTo="/home"
       
        // if(isUserLoggedIn && rest.path=="/signup" && userrole=="user") 
        //     redirectTo="/home"
   
     
    
        
      
        return (
            
            <Route {...rest}
            render={props=>(
                (redirectTo)?
                <Redirect to={{pathname:redirectTo,state:{from:props.location}}} />
                :<Component {...props}/>
            )}
        />
        )
    }
}
const mapStateToProps=(state)=>{
    const {auth_login}=state;
    return{
        auth_login
    }
}
const mapDispatchToProps = dispatch => ({
    action:{
        auth_login:bindActionCreators(Login_action,dispatch)
    }
})
export default  connect(mapStateToProps,mapDispatchToProps)(Croute)