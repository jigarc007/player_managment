import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Navbar,Button,NavbarText, NavbarBrand, NavItem, Nav, NavLink, UncontrolledDropdown, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap'

import '../../../index.css'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Login_action from '../../../action/login/login_action'
import { binaryExpression } from '@babel/types'
 class header extends Component {
     btnLogin_click=(e)=>{
        this.props.action.auth_login.logout_user()

     }
    render() {
        
        return (
            (this.props.auth_login.token=="")? 
          <Navbar color="light" light expand="md">
          <NavbarBrand className="link" to="/home" >Home</NavbarBrand>
          <Nav className="mr-auto" nav-auto>
          <NavItem className="link">
                    <NavLink tag={Link}  activeClassName="active"  to="/login">Login</NavLink>
                </NavItem>
                <NavItem className="link">
                    <NavLink tag={Link}  activeClassName="active" to="/signup">Sign Up</NavLink>
                </NavItem>
               
            </Nav>
         

        </Navbar>:
    (this.props.auth_login.token && this.props.auth_login.token!=="" && this.props.auth_login.role=="user")?
    <Navbar color="light" light expand="md">
          <NavbarBrand className="link" to="/" >demo</NavbarBrand>
      <Nav className="ml-auto" nav-auto>
                    <Button color="primary" onClick={this.btnLogin_click} >Logout</Button>
                </Nav>
            </Navbar>
    :
    (this.props.auth_login.token && this.props.auth_login.token!=="" && this.props.auth_login.role=="admin")?
            
        <Navbar color="light" light expand="md">
        <NavbarBrand className="link" to="/admin_home" >Admin</NavbarBrand>
        <Nav className="mr-auto" nav-auto>
              <NavItem className="link">
                  <NavLink tag={Link}  activeClassName="active"   to="/view">view user</NavLink>
              </NavItem>
          </Nav>
          <Nav className="ml-auto" nav-auto>
                  <Button color="primary" onClick={this.btnLogin_click} >Logout</Button>
              </Nav>

      </Navbar>
      :null
        )
    }
}
const mapStateToProps=(state)=>{
    const{auth_login}=state
    return{
        auth_login
    }
}
const  mapDispatchToProps=dispatch=>({
    action:{
        auth_login:bindActionCreators(Login_action,dispatch)
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(header)