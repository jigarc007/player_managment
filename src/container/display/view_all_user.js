import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Label, Modal, ModalFooter, ModalBody, ModalHeader, Button, Table, Input, Pagination, PaginationItem, FormGroup, PaginationLink } from 'reactstrap'
import moment from 'moment'
import { Redirect, Route, withRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { FaSearch, FaSortAlphaDown, FaSortAlphaUp, FaPen, FaTrash } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { MDBContainer } from 'mdbreact'
import './img.css'
import Lightbox from 'react-image-lightbox'
import * as  View_action from '../../action/user/view_action'
import { findAllInRenderedTree } from 'react-dom/test-utils';
const baseUrl = "http://localhost:3000/upload/";

const browserHistory = createBrowserHistory();
class view_all_user extends Component {
    constructor(props) {

        super(props)

        this.state = {
            search: '',
            current_page: '',
            total_link: 1,
            page: 1,
            page_no: 1,
            limit: 3,
            sort_type:1,
            filter: '',
            check_all: [],
            check_id: [],
            img: '',
            modal: false,
            

        }
    }
    toggle = (e) => {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentWillMount() {

        this.props.action.view_user.view_users({ page: this.state.page, limit: this.state.limit })
            .then((data) => {
                this.setState({
                    total_link: Math.ceil(data.total_record / this.state.limit)
                })
                console.log(data)
            })
            .catch(error => console.log(error))

        console.log(JSON.stringify(this.state.data))

    }
    img_Click = (e) => {
        debugger;
        this.setState({ modal: true, img: e.target.id })
    }
    getData = () => {


        console.log("data:" + this.props.view_user.data)
        return this.props.view_user.data.map((SingleObject, key) => {

            console.log("obj", SingleObject, key)
            const { _id, name, player_role, dob, profile_img, batsman_style, bowler_style, team } = SingleObject
            console.log(profile_img)
            return (
                <tr>
                    <td><Input key={key} type="checkbox" id={this.state.cnt} checked={this.state.check_id.includes(_id) ? true : false} onChange={this.singleCheck} name="check" value={_id} /></td>
                    <td>{name}</td>
                    <td>{moment(dob).format("DD-MM-YYYY")}</td>
                    <td>
                        <Modal  isOpen={this.state.modal} toggle={this.toggle} >
                        
                <ModalBody > 
                    <img src={this.state.img} height="700px" width="600px" />
                    </ModalBody>
                    </Modal>

                        <img id={baseUrl + profile_img} className="img-fluid"
                            onClick={this.img_Click} src={baseUrl + profile_img} className="rounded" height="100px" width="100px" />

                        {/* {this.state.modal && (
                            <Lightbox
                                mainSrc={this.state.img}
                                imageTitle={this.state.img}
                                onCloseRequest={() => this.setState({ modal: false })}

                            />
                        )} */}
                    </td>
                    <td>{player_role}</td>
                    <td>{batsman_style}</td>
                    <td>{bowler_style}</td>
                    <td>{team}</td>
                    <td >
                        <Button color="white" onClick={this.btnOnClick_Edit.bind(this)} id={_id} ><FaPen /></Button>
                        <Button onClick={this.btnOnClick_Delete.bind(this)} color="danger" id={_id} ><FaTrash /></Button>
                    </td>

                </tr>

            )
        })
    }
    btnOnClick_Delete = (e) => {
        debugger;
        const id = e.target.id;
        confirmAlert({
            title: "confirm to delete",
            message: "Do you want to delete",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        debugger;
                        alert(id)
                        this.props.action.view_user.delete_player({ id: id })
                            .then((data) => {
                                console.log(data)
                            }).catch((error) => {
                                console.log(error)
                            })
                    }

                },
                {
                    label: "No",
                    onClick: () => {
                        alert("no")
                    }

                }]
        })
    }
    btnOnClick_Edit = (e) => {
        this.props.view_user.data.map((curr_val) => {
            if (curr_val._id == e.target.id) {
                this.props.history.push({ pathname: "/signup", state: { data: curr_val, edit: true } })

            }
        })
    }
    singleCheck = (e) => {
        debugger;
        var check_all = [...this.state.check_all];
        var check_id = [...this.state.check_id];
        var check = document.getElementsByName('check');

        if (e.target.checked) {
            check_id.push(e.target.value)

        }
        else {
            check_all = check_all.filter(page => page !== Number(this.state.page))
            check_id = check_id.filter(id => id !== e.target.value)
        }
        var flag = false;

        check.forEach(element => {
            if (!element.checked)
                flag = true
        })
        if (!flag) {
            check_all.push(Number(this.state.page))
        }
        this.setState({
            check_all: check_all,
            check_id: check_id
        })
    }
    selectAll = (e) => {
        alert("len" + this.state.check_all.length)
        var check_all = [...this.state.check_all];
        var check_id = [...this.state.check_id];
        var check = document.getElementsByName('check')

        if (e.target.checked) {
            check_all.push(Number(this.state.page))

            check.forEach(id => {
                check_id.push(id.value)
            })

        } else {
            check_all = check_all.filter(page => page !== Number(this.state.page));
            check.forEach(element => {
                check_id = check_id.filter(id => id !== element.value)
            })
        }
        this.setState({
            check_all: check_all,
            check_id: check_id
        })

    }

    handle_link = (e) => {


        console.log(e.target.id)

        alert(e.target.id)
        this.setState({
            page: e.target.id,
            // total_link:Math.ceil(this.props.view_user.total_record/this.state.limit)
        }, function () {
            if (this.state.search == "") {
                this.view_user_pagination()
            } else {
                this.search_sort_api_call()
            }
        })
    }
    view_user_pagination = () => {
        this.props.action.view_user.view_users({ page: this.state.page, limit: this.state.limit })
            .then((data) => {
                this.setState({
                    total_link: Math.ceil(data.total_record / this.state.limit)
                })
                console.log(data)
            })
            .catch(error => console.log(error))
    }
    pagination = () => {
        // alert(this.props.view_user.current_page)


        const total_link = Math.ceil(this.props.view_user.total_record / this.state.limit)
        console.log("total_link", total_link)
        var element = []
        for (var i = 1; i <= this.state.total_link; i++) {
            element.push(<PaginationItem id={i} active={this.props.view_user.current_page === i ? true : false} >
                <PaginationLink id={i} onClick={this.handle_link} href="">
                    {i}
                </PaginationLink>
            </PaginationItem>
            )

        }
        return element
    }
    btnAdd_user = (e) => {
        e.preventDefault()
        this.props.history.push({ pathname: "/signup" })
    }
    btnView_user = (e) => {
        e.preventDefault()
        console.log(this.state.check_id)
        this.props.history.push({ pathname: "/view_selected_user", state: { data: this.state.check_id } })

    }
    handleSearch = (e) => {
        if (e.target.value !== "") {
            this.setState({
                search: e.target.value
            }, function () {
                this.search_sort_api_call()
            })
        }
    }
    handle_sort = (e) => {
       
        e.preventDefault()
     
        this.setState({
            sort_type:Number(e.target.id)
        })

        this.search_sort_api_call()
    }
    
    handle_change_of_filter = (e) => {

        this.setState({
            filter: e.target.value !== "-1" ? e.target.value : ""
        }, function () {
            this.search_sort_api_call();

        })


    }
    handle_change_entries = (e) => {
        this.setState({
            limit: Number(e.target.value)
        }, function () {
            this.search_sort_api_call()
        })
    }
    search_sort_api_call = () => {
        this.props.action.view_user.search_user_data({ page: this.state.page, search: this.state.search, filter: this.state.filter, type: this.state.sort_type, limit: this.state.limit })
            .then((data) => {
                this.setState({
                    total_link: Math.ceil(data.total_record / this.state.limit)
                })
                console.log(data)
            })
    }
    handleSearch_page = (e) => {
        if (e.target.value != "" && e.target.value <= this.state.total_link && e.target.value > 0 && !isNaN(e.target.value)) {
            this.setState({
                page: e.target.value
            }, function () {
                this.search_sort_api_call();
            })
        } else
            alert("page not found")

    }
    render() {



        return (
            <div>

                <h1>Player details</h1>
                <nav class="navbar navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
                    <form class="form-inline">
                        <Label>Show Entries:</Label>
                        <Input type="select" onChange={this.handle_change_entries} name="limit" >
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="10">10</option>


                        </Input>
                        <Label>Search:</Label>
                        <Input class="form-control mr-sm-2" type="search" name="search" onChange={this.handleSearch} placeholder="Search" aria-label="Search" />
                        <FaSearch style={{ fontSize: "25px" }} />

                    </form>
                    <form style={{ float: "right" }} class="form-inline">
                        <Input type="select" onChange={this.handle_change_of_filter} name="filter" >
                            <option value="-1">Select Team</option>
                            <option value="team1">Team1</option>
                            <option value="team2">Team2</option>
                            <option value="team3">Team3</option>
                            <option value="team4">Team4</option>

                        </Input>

                        <Label style={{ fontSize: '15px' }}>Sort-Order:</Label>
                        <Button onClick={this.handle_sort} color="white" id={1}><FaSortAlphaUp /></Button>

                        <Button onClick={this.handle_sort} color="white" id={-1}><FaSortAlphaDown /></Button>

                    </form>
                </nav>

                <Table hover striped>
                    <thead className="thead-dark" >
                        <th><Input type="checkbox" checked={this.state.check_all.includes(Number(this.state.page))} name="select_all" onChange={this.selectAll} value="selectAll" />Select All</th>
                        <th>Name</th>
                        <th>Dob</th>
                        <th>Profile</th>
                        <th>Role</th>
                        <th>Batsman Style</th>
                        <th>Bowler Style</th>
                        <th>Team</th>
                        <th>Action</th>

                    </thead>
                    <tbody>
                        {this.getData()}

                    </tbody>
                </Table>
                <center>
                    <Pagination aria-label="Page navigation example">
                        <PaginationItem >
                            <PaginationLink onClick={this.handle_link} id='1' href="" >
                                {"<<"}
                            </PaginationLink>
                        </PaginationItem>
                        {this.state.page > 1 &&
                            <PaginationItem >

                                <PaginationLink onClick={this.handle_link} id={this.state.page > 1 ? Number(this.state.page) - 1 : 1} href="" >
                                    {"<"}
                                </PaginationLink>

                            </PaginationItem>
                        }
                        {this.pagination()}
                        {this.state.page < this.state.total_link &&
                            <PaginationItem>

                                <PaginationLink onClick={this.handle_link} id={this.state.page < this.state.total_link ? Number(this.state.page) + 1 : this.state.total_link} href="" >
                                    > </PaginationLink>

                            </PaginationItem>
                        }
                        <PaginationItem>
                            <PaginationLink onClick={this.handle_link} id={this.state.total_link} href=""   >
                                >>
                            </PaginationLink>
                        </PaginationItem>
                        {this.state.total_link > 1 &&
                            <form class="form-inline">
                                <FormGroup>
                                    <Input className="col-xs-1" type="number" name="page" onChange={this.handleSearch_page} placeholder="Enter page number" />
                                </FormGroup>
                            </form>
                        }
                    </Pagination>

                </center>
                {this.state.check_id.length !== 0 ?
                    <Button color="warning" style={{ float: "right" }} onClick={this.btnView_user}  >View User</Button> : ''}
                <Button color="info" style={{ float: "right" }} onClick={this.btnAdd_user}  >Add User</Button>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { view_user, view_selected_user } = state
    return {
        view_user,
        view_selected_user

    }

}
const mapDispatchToProps = dispatch => ({
    action: {
        view_user: bindActionCreators(View_action, dispatch),
        view_selected_user: bindActionCreators(View_action, dispatch)
    }
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(view_all_user))