import React, { Component } from 'react'
import {Form,CardImg,Col,NavLink,FormGroup,Input,Button,Label,FormFeedback} from 'reactstrap'
import {Link} from 'react-router-dom'
import { connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import {MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import "mdbreact/dist/css/mdb.css";

import * as edit_action from '../../action/user/edit_user_action'
import * as registration_action  from '../../action/registration/registration_action'
import moment from 'moment'
const baseUrl = "http://localhost:3000/upload/";
 class Registration extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name:'',
             dob:'',
             pwd:'',
             cpwd:'',
             profile_img:'',
             path:'',
             role:[],
             bowler_style:'',
             bastman_flag:false,
             bowler_flag:false,
             batsman_style:'',
             team:'',
             edit:false,
             error:[{name:'',pwd:'',cpwd:'',profile_img:'',dob:'',role:'',bowler_style:'',batsman_style:'',team:''}],
       
    
        }
    }
    componentWillMount(){
      
       if(this.props.history.location.state!==undefined){
        if(this.props.history.location.state.edit==true ){
            console.log("hii")
            let data=this.props.history.location.state.data;
            data.player_role.map((val)=>{
                this.setState({
                    role:val
                })
            })
            this.setState({
                name:data.name,
                pwd:data.pwd,
                cpwd:data.pwd,
                dob:data.dob,
                profile_img:data.profile_img,
                bowler_style:data.bowler_style,
                batsman_style:data.batsman_style,
                team:data.team,
                edit:this.props.history.location.state.edit


            })
        }
    }
    
    }
    handleChange=(event)=>{
        var val=event.target.value;
        if(event.target.name=="role"){
            var r=document.getElementsByName("role");
            var roles=[]
            for(var i=0;i<r.length;i++){
                if(r[i].checked){
                    roles.push(r[i].value)
                    if(r[i].value=="Batsman")
                        this.state.bastman_flag=true;
                    if(r[i].value=="Bowler")
                        this.state.bowler_flag=true;
                       
                        
                }else{
                    if(r[i].value=="Batsman"){
                        this.state.batsman_style=""
                    this.state.bastman_flag=false;
                    }
                if(r[i].value=="Bowler"){
                    this.state.bowler_style=""
                    this.state.bowler_flag=false;
                }
                }
                
            }

            val=roles
           
           
           
        }if(event.target.name=="profile_img"){

     //    console.log("img",URL.createObjectURL(event.target.files[0]))
         
         val=event.target.files
            console.log("img",val)
        }
        this.setState({
            [event.target.name]:val
            
        })
    
    }
    validation=(event)=>{
        debugger;
       
        let err={...this.state.error};
        var stateName=event.target.name
        console.log(stateName)
        if(event.target.value.trim().length==0){
          
            err=this.check_Comman_validation(stateName,err);

        }
        else
        err[stateName]="";
        var pattern=/^[a-zA-Z ]+$/;
        if(stateName=="name"){
            if(this.state.name!==""){
               
                if(!/^[a-zA-Z]+$/.test(this.state.name))
                err[stateName]="username must contain alphabet characters only";
                
            }
        }
        if(stateName=="bowler_style"){
            if(this.state.bowler_style==""){
                if(!pattern.test(this.state.bowler_style))
                err[stateName]="bowler style must contain alphabet characters only";
               
            }
        }
        if(stateName=="cpwd"){
            if(this.state.pwd!=this.state.cpwd)
                err[stateName]="Both password must be same"
            
        }
        if(stateName=="pwd"){
            if(this.state.pwd!=""){
                
                if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/.test(this.state.pwd)){
                err[stateName]="password must be 8 character long and have one capital letter also";
                   
            }
               
            }
        }
        
        if(stateName=="batsman_style"){
            if(this.state.batsman_style!==""){
               
                if(!pattern.test(this.state.batsman_style)){
                    
                err[stateName]="batsman style must contain alphabet characters only";
                }
               
               
            }
        }
        if(stateName=="name"){
            if(this.state.name!==""){
               
                if(!pattern.test(this.state.name))
                err[stateName]="username must contain alphabet characters only";
            }
        }
        if(stateName=="dob"){
            debugger;
            if(this.state.dob!=""){
                var d=new Date();
                var d1=new Date(this.state.dob)
             console.log("year",d.getFullYear())
                if((d.getFullYear()-d1.getFullYear()<18)){
                    err[stateName]="dob age must be 18 or geater then 18"
                }
            }
        }
        
        if(stateName=="team"){
           
            if(this.state.team=="-1"){
                err[stateName]="please select the team";
            }
        }
      
        console.log(err);
        this.setState({
            error:err
        })
    }
    check_Comman_validation=(stateName,err)=>{
      
            if(stateName=="name" && this.state.name=="")
                err[stateName]="please enter the username";
            if(stateName=="pwd" && this.state.pwd=="")
                err[stateName]="please enter the password";    
            if(stateName=="cpwd" && this.state.cpwd=="")
                err[stateName]="please enter the confirm password";    
            if(stateName=="batsman_style" && this.state.batsman_style=="")
                err[stateName]="please enter the batsman_style";
            if(stateName=="bowler_style" && this.state.bowler_style=="")
                err[stateName]="please enter the bowler_style";

             if(stateName=="dob" &&  this.state.dob=="")
                err[stateName]="please enter the dob";
            if(stateName=="team" &&  this.state.team=="")
                err[stateName]="please select the team";
            if(stateName=="profile_img" && this.state.profile_img=="")
                err[stateName]="please select the profile image";
            if(stateName=="role" && this.state.role.length==0)
                err[stateName]='please select the role'
        return err;
    }
   

    btnLogin_click=(event)=>{
        debugger;

        event.preventDefault()
        //|| this.state.error.dob!=="" 
        if(this.state.team=="" || this.state.name=="" || this.state.dob==""  || this.state.role.length==0 || this.state.pwd!=this.state.cpwd ){
            let err={...this.state.error}
            console.log("role",this.state.role)
        for(var v in err[0]){
           
            err=this.check_Comman_validation(v,err);
        }
        this.setState({
            error:err
        })
           
        }else{
            
          var fd=new FormData();
          console.log("img",this.state.profile_img)
       console.log("state",this.state)
        if(this.state.edit==true && this.state.profile_img==this.props.history.location.state.data.profile_img){
            fd.append("profile_img",this.state.profile_img)
        }else{
             for(var i of this.state.profile_img)
                 fd.append("profile_img",i);
        }
       
          fd.append("name",this.state.name);
          fd.append("pwd",this.state.pwd);
          fd.append("dob",this.state.dob);
         
          fd.append("player_role",this.state.role);
          fd.append("bowler_style",this.state.bowler_style);
          fd.append("batsman_style",this.state.batsman_style);
          fd.append("team",this.state.team);

           console.log("fd:",fd)
         if(event.target.id=="Edit"){
             const id=this.props.history.location.state.data._id
             alert(id)

            this.props.action.view_user.edit_user(id,fd)
            .then((item)=>{alert("sucess")
            this.props.history.replace("/view")

        })
            .catch((error)=>alert(error))
         }
         if(event.target.id=="Sign Up"){

                this.props.action.auth_register.player_registration(fd)
                .then((item)=>{alert("sucess")
                this.props.history.push("/login")
            })
                .catch((error)=>alert(error))
                
         }
              //  this.props.history.push("/login")
         
        }
    }   
    
    render() {
        
        console.log("render on form");
        var size={
            padding:"10px",
          
        }
        var label_color={
            textColor:"#ff4f5e"
        }
        var valid_flag;
        return (
            <div>
                <center>
              
                <MDBContainer >        
            <Form style={size} >
        
            <MDBCard>
            <MDBCardBody className="mx-4">
            <div className="header pt-3 ">
              <MDBRow className="d-flex justify-content-center">
                <h3 className="grey-text mb-3 pt-3 font-weight-bold">
                  Registration
                </h3>
              </MDBRow>
              
            </div>
                <FormGroup row>
                    <Label  sm={4}>Username:</Label>
          
                <Col sm={5}>
                    <Input value={this.state.name} invalid={this.state.error.name?true:false} valid={(!this.state.error.name && this.state.name!=="")?true:false} type="text" onBlur={this.validation}  name="name" onChange={this.handleChange} placeholder="Enter username" />
                    {this.state.error.name &&
                    <FormFeedback>{this.state.error.name}</FormFeedback>
                    }
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={4}>Password:</Label>
                    <Col sm={5}>
                    <Input value={this.state.pwd} disabled={this.state.edit?true:false}  invalid={this.state.error.pwd?true:false} valid={(!this.state.error.pwd && this.state.pwd!=="")?true:false} type="password" onBlur={this.validation}  name="pwd" onChange={this.handleChange} placeholder="Enter password" />
                    {this.state.error.pwd &&
                    <FormFeedback>{this.state.error.pwd}</FormFeedback>
                    }
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={4}>Confirm Password:</Label>
                    <Col sm={5}>
                    <Input value={this.state.cpwd}  disabled={this.state.edit?true:false}  invalid={this.state.error.cpwd?true:false} valid={(!this.state.error.cpwd && this.state.cpwd!=="")?true:false} type="password" onBlur={this.validation}  name="cpwd" onChange={this.handleChange} placeholder="Enter confirm password" />
                    {this.state.error.cpwd &&
                    <FormFeedback>{this.state.error.cpwd}</FormFeedback>
                    }
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={4}>select DOB:</Label>
                    <Col sm={5}>
                    <Input value={moment(this.state.dob).format("YYYY-MM-DD")} invalid={this.state.error.dob?true:false} valid={(!this.state.error.dob && this.state.dob!=="")?true:false} onChange={this.handleChange} max={moment().format("YYYY-MM-DD")} onBlur={this.validation} type="date" name="dob"  />
                    {this.state.error.dob &&
                    <FormFeedback>{this.state.error.dob}</FormFeedback>
                    }
                    </Col>
                </FormGroup>
                <FormGroup row>
                <Label sm={4}></Label>
                <Col sm={5}>
                   
                            <img  src={this.state.edit && this.state.profile_img==this.props.history.location.state.data.profile_img?baseUrl+this.state.profile_img:this.state.profile_img.length!==0?URL.createObjectURL(this.state.profile_img[0]):require('../../assets/profile_image/default.png')} height="100px" width="100px"  />
                   
                </Col>
                    </FormGroup>
                <FormGroup row>
                    <Label sm={4}>Select profile:</Label>
                  <Col sm={5}>
                  
                  <Input type="file"  name="profile_img"invalid={this.state.error.profile_img?true:false} valid={(!this.state.error.profile_img && this.state.profile_img!=="")?true:false}  onBlur={this.validation} onChange={this.handleChange}  />  
                  {this.state.error.profile_img &&
                    <FormFeedback>{this.state.error.profile_img}</FormFeedback>
                    }
                    </Col>
                     
                   
                </FormGroup>
                <FormGroup row>
                    <Label sm={4}>Select Role:</Label>
                    <Col sm={2}>
                    <FormGroup >
                     
                    <Input checked={this.state.role.includes('Batsman')?true:false}  type="checkbox" invalid={this.state.error.role?true:false} valid={(!this.state.error.city && this.state.role.length!=0)?true:false}  name="role" onBlur={this.validation} onChange={this.handleChange} value="Batsman" />Batsman
                    {this.state.error.role &&
                    <FormFeedback>{this.state.error.role}</FormFeedback>
                    }
                    
                    </FormGroup>
                    </Col>
                    <Col sm={2}>
                    <FormGroup >
                    <Input type="checkbox" checked={this.state.role.includes('Bowler')?true:false} invalid={this.state.error.role?true:false} valid={(!this.state.error.city && this.state.role.length!=0)?true:false} name="role" onBlur={this.validation} onChange={this.handleChange} value="Bowler" />Bowler

                    {this.state.error.role &&
                    <FormFeedback>{this.state.error.role}</FormFeedback>
                    }
                    
                    
                    
                    </FormGroup>
                    </Col>
                    </FormGroup>
                    {this.state.bastman_flag || this.state.bowler_flag?
                    <div>
                    <FormGroup row>
                            <Label sm={4}>{this.state.bastman_flag?'Batsman Style':''}</Label>
                            <Col sm={5}>
                            {this.state.bastman_flag &&
                            <Input value={this.state.batsman_style} type="text" invalid={this.state.error.batsman_style?true:false} valid={(!this.state.error.batsman_style && this.state.batsman_style!=="")?true:false} placeholder="Enter Batsman style" onBlur={this.validation} name="batsman_style" onChange={this.handleChange} />
                                
                            }
                             {this.state.error.batsman_style && this.state.bastman_flag &&
                            <FormFeedback>{this.state.error.batsman_style}</FormFeedback>
                            }
                            </Col>
                            </FormGroup>
                              <FormGroup row>
                              <Label sm={4}>{this.state.bowler_flag?'Bowler Style':''}</Label>
                            <Col sm={5}>
                            {this.state.bowler_flag &&
                            <Input value={this.state.bowler_style} invalid={this.state.error.bowler_style?true:false} valid={(!this.state.error.bowler_style && this.state.bowler_style!=="")?true:false}  placeholder="Enter Bowler style" onBlur={this.validation} type="text" name="bowler_style" onChange={this.handleChange} />
        
                            }
                              {this.state.error.bowler_style && this.state.bowler_flag &&
                            <FormFeedback>{this.state.error.bowler_style}</FormFeedback>
                            }
                            </Col>
        
                            </FormGroup>
                            </div>:''}
                    
                    
                      
                   
             
                <FormGroup row>
                <Label sm={4}>Select Team:</Label>
                    <Col sm={5}>
                    <Input value={this.state.team} invalid={this.state.error.team?true:false} valid={(!this.state.error.team && this.state.team!=="")?true:false} onChange={this.handleChange} onBlur={this.validation} type="select" name="team">
                        <option value="-1">Select Team</option>
                        <option value="team1">team1</option>
                        <option value="team2">team2</option>
                        <option value="team3">team3</option>
                        <option value="team4">team4</option>

                    </Input>
                    {this.state.error.team &&
                    <FormFeedback>{this.state.error.team}</FormFeedback>
                    }
                    </Col>
                </FormGroup>
                <FormGroup>
                <div className="text-center mb-4  mt-5">
               
                <MDBBtn
                 id={ this.state.edit?"Edit":"Sign Up"}
                  onClick={this.btnLogin_click}
                  type="button"
                
                >
                     { this.state.edit?"Edit":"Sign Up"}
                </MDBBtn>
                <MDBBtn
                  color="danger"
                 
                  type="reset"
                 
                > Reset
                </MDBBtn>
                </div>
              
                    {/* <Button color="primary" onClick={this.btnLogin_click}>Register</Button> */}
                </FormGroup>
                <FormGroup>
                <p className="font-small grey-text mt-3">
                    already sign in ?
                    <NavLink to="/login" tag={Link} className="blue-text ml-1 font-weight-bold">
                            Login
                    </NavLink>
                  
                    </p>
                </FormGroup>

                </MDBCardBody>
            </MDBCard>
           
            </Form>
            </MDBContainer>
           
            </center>
                
            </div>
        )
    }
}
const  mapStateToProps=(state)=>{
    const {auth_register,view_user }=state
    return{
        auth_register,
        view_user
    }
}
const mapDispatchToProps=dispatch=>({
    action:{
        auth_register:bindActionCreators(registration_action,dispatch),
        view_user:bindActionCreators(edit_action,dispatch)
       
    }
})
export default connect(mapStateToProps,mapDispatchToProps) (Registration)
