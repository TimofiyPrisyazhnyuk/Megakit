import React, {Component} from 'react';import axios from "axios/index";export default class Edit extends Component {    constructor(props) {        super(props);        this.handleInputChange = this.handleInputChange.bind(this);        this.onSubmit = this.onSubmit.bind(this);        this.state = {            make: '',            model: '',            user_id: 1,            users: [],            errors: {},        }    }    /**     * Get current car from db     */    componentDidMount() {        axios.get(`http://megakit/api/cars/` + this.props.match.params.id + `/edit`)            .then(response => {                this.setState({                    make: response.data[0].make,                    model: response.data[0].model,                    user_id: response.data[0].user_id,                    users: response.data[1]                });            });    }    /**     *  add information about car to state     *     * @param event     */    handleInputChange(event) {        const target = event.target;        this.setState({            [target.name]: target.value        });    }    /**     *  Submit update user to back-end and receive result     *     * @param event     */    onSubmit(event) {        event.preventDefault();        this.setState({errors: {}});        axios.put(`http://megakit/api/cars/` + this.props.match.params.id, this.state)            .then(response => {                if (response.data.success) {                    this.props.history.push("/cars", response.data.success);                }            }).catch(error => {            this.setState({                errors: error.response.data.errors            });        })    }    render() {        return (            <div className="row justify-content-center">                <div className="col-md-6 col-sm-8">                    <form onSubmit={this.onSubmit}>                        <div className="form-group">                            <label htmlFor="userName">Car make</label>                            <input type="text" id="carMake" name="make" className={(this.state.errors.make) ?                                "form-control is-invalid" : 'form-control'} required onChange={this.handleInputChange}                                   value={this.state.make} placeholder="Ivan"/>                            <div className="text-danger">{(this.state.errors.make) ?                                this.state.errors.make.filter((make) => make) : ''}</div>                        </div>                        <div className="form-group">                            <label htmlFor="userEmail">Car model</label>                            <input type="text" id="carModel" name="model" className={(this.state.errors.model) ?                                "form-control is-invalid" : 'form-control'} onChange={this.handleInputChange}                                   placeholder="megakit@gmail.com" value={this.state.model} required/>                            <div className="text-danger">{(this.state.errors.model) ?                                this.state.errors.model.filter((model) => model) : ''}</div>                        </div>                        <div className="form-group">                            <label htmlFor="userCar">User / Owner</label>                            <select name="user_id" className={(this.state.errors.user_id) ?                                "form-control is-invalid" : 'form-control'} id="userCar"                                    value={this.state.user_id} onChange={this.handleInputChange} required>                                {this.state.users.map((user => {                                    return <option key={user.id} value={user.id}>{user.name}</option>;                                }))}                            </select>                            <div className="text-danger">{(this.state.errors.user_id) ?                                this.state.errors.user_id.filter((user_id) => user_id) : ''}</div>                        </div>                        <button type="submit" className="btn btn-outline-dark float-right">                            Update Car <i className="fas fa-car-side"/>                        </button>                    </form>                </div>            </div>        );    }}