import React, {Component} from 'react';import axios from 'axios';import Pagination from "react-js-pagination";import {Link} from 'react-router-dom';import Success from "../../messages/success";export default class Listing extends Component {    constructor(props) {        super(props);        this.handlePageChange = this.handlePageChange.bind(this);        this.state = {            cars: [],            activePage: 1,            itemsCountPerPage: [],            totalItemsCount: 1,            pageRangeDisplayed: 5,            alert_message: '',        }    }    /**     * Get Cars from db     */    componentDidMount() {        axios.get('http://megakit/api/cars')            .then(response => {                this.setState({                    activePage: response.data.current_page,                    itemsCountPerPage: response.data.per_page,                    totalItemsCount: response.data.total,                    cars: response.data.data,                });            });        if (this.props.history.location.state) {            this.setState({                alert_message: this.props.history.location.state            });            this.props.history.push("/cars");        }    }    /**     * Delete car from db     *     * @param car_id     */    deleteCar(car_id) {        axios.delete('http://megakit/api/cars/' + car_id)            .then(response => {                if (response.data.success) {                    const cars = this.state.cars;                    for (let i = 0; i < cars.length; i++) {                        if (cars[i].id === car_id) {                            cars.splice(i, 1);                            this.setState({                                users: cars,                                alert_message: response.data.success                            })                        }                    }                }            });        this.setState({alert_message: ''})    }    /**     * Pagination, get cars from db     *     * @param pageNumber     */    handlePageChange(pageNumber) {        axios.get('http://megakit/api/cars?page=' + pageNumber)            .then(response => {                this.setState({                    activePage: response.data.current_page,                    itemsCountPerPage: response.data.per_page,                    totalItemsCount: response.data.total,                    cars: response.data.data,                });            })    }    render() {        return (            <div>                {(this.state.alert_message.length > 0) ? <Success message={this.state.alert_message}/> : null}                <table className="table table-bordered text-center">                    <thead className="thead-dark">                    <tr>                        <th scope="col">#</th>                        <th scope="col">Make</th>                        <th scope="col">Model</th>                        <th scope="col">Driver / Owner</th>                        <th scope="col">Control</th>                    </tr>                    </thead>                    <tbody>                    {                        this.state.cars.map(car => {                            return (                                <tr key={car.id}>                                    <th scope="row">{car.id}</th>                                    <td>{car.make}</td>                                    <td>{car.model}</td>                                    <td>{car.user.name}</td>                                    <td>                                        <Link className="btn btn-outline-info btn-sm" to={`/cars/read/${car.id}`}>                                            <i className="far fa-eye fa-2x"/>                                        </Link>                                        <Link className="btn btn-outline-secondary btn-sm" to={`/cars/edit/${car.id}`}>                                            <i className="fas fa-edit fa-2x"/>                                        </Link>                                        <a href="#" onClick={this.deleteCar.bind(this, car.id)}                                           className="btn btn btn-outline-danger btn-sm">                                            <i className="fas fa-trash-alt fa-2x"/>                                        </a>                                    </td>                                </tr>                            )                        })                    }                    </tbody>                </table>                <div className="d-flex justify-content-center">                    <Pagination                        activePage={this.state.activePage}                        itemsCountPerPage={this.state.itemsCountPerPage}                        totalItemsCount={this.state.totalItemsCount}                        pageRangeDisplayed={this.state.pageRangeDisplayed}                        onChange={this.handlePageChange}                        itemClass="page-item"                        linkClass="page-link"                    />                </div>            </div>        );    }}