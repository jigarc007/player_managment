import React, { Component } from 'react'
import { connect} from 'react-redux'
import {withRouter}from  'react-router-dom'
import { Button, Table, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import moment from 'moment'
import * as  View_action from '../../action/user/view_action'
import { bindActionCreators } from 'redux'
import Lightbox from 'react-image-lightbox'

const baseUrl = "http://localhost:3000/upload/";

class display_selected_user extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:[],
             modal:false,
             img:''
        }
    }
    img_Click=(e)=>{
        debugger;
        this.setState({modal: true,img:e.target.id })
      }
    componentWillMount(){
        if(this.props.history.location.state!=undefined){
            console.log("data",this.props.history.location.state.data)
            
        this.props.action.view_selected_user.user_view_by_id(this.props.history.location.state.data)
        .then((data)=>{
            alert(data)
            this.setState({
            data:data
        })
        })
        .catch(error=>console.log(error))
        }
       
    }
    getData=()=>{
        console.log("state",this.state.data)
      return   this.state.data.map((data,key)=>{
            const { _id, name, player_role, dob, profile_img, batsman_style, bowler_style, team } = data
           
            return (
                <tr>
                    <td>{name}</td>
                    <td>{moment(dob).format("DD-MM-YYYY")}</td>
                    <td>
                                  
        <img id={baseUrl + profile_img} className="img-fluid"
                  onClick={this.img_Click} src={baseUrl + profile_img} className="rounded" height="100px" width="100px" />
                      
                        {this.state.modal && (
          <Lightbox
            mainSrc={this.state.img}
           //imageTitle={photoIndex + 1 + "/" + images.length}
            onCloseRequest={() => this.setState({ modal: false })}
            
          />
        )}
                        
                    </td>
                    <td>{player_role}</td>
                    <td>{batsman_style}</td>
                    <td>{bowler_style}</td>
                    <td>{team}</td>
                    </tr>
            )
      
        })

    }
    btnGo_Back=()=>{
    this.props.history.goBack()
    }
    render() {
        return (
            <div>
                <Table hover striped>
                    <thead className="thead-dark" >
                        <th>Name</th>
                        <th>Dob</th>
                        <th>Profile</th>
                        <th>Role</th>
                        <th>Batsman Style</th>
                        <th>Bowler Style</th>
                        <th>Team</th>
                       
                    </thead>
                    <tbody>
                        {this.getData()}

                    </tbody>
                </Table>
                <Button color="cyan" onClick={this.btnGo_Back}>Go Back</Button>
                </div>

        )
    }
}


const mapStateToProps=(state)=>{
    const {view_selected_user}=state
    return{
        view_selected_user
    }
}
const mapDispatchToProps = dispatch => ({
    action: {
        view_selected_user:bindActionCreators(View_action, dispatch)
    }
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(display_selected_user))