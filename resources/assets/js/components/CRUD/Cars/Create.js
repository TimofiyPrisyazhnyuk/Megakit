import React, {Component} from 'react';import axios from "axios";export default class Create extends Component {    constructor() {        super();        this.onSubmit = this.onSubmit.bind(this);        this.state = {            new_car: {}        }    }    /**     * Get Cars from db     */    onChangeNewCar(e) {        this.setState({            new_car: {                'make': e.target.value,                'model': e.target.value,                'user_id': e.target.value,            }        });    }    onSubmit(e) {        e.preventDefault();        const car = {car: this.state.new_car};        axios.post('http://megakit/api/cars/store', car)            .then(response => {                console.log(response.data);            })    }    render() {        return (            <div className="row justify-content-center">                <div className="col-md-6 col-sm-8">                    <form onSubmit={this.onSubmit()}>                        <div className="form-group">                            <label htmlFor="makeCar">Make Car</label>                            <input type="make" name="make" className="form-control" id="makeCar"                                   onChange={this.onChangeNewCar()}                                   value={this.state.new_car.new_car.make} placeholder="Volkswagen"/>                        </div>                        <div className="form-group">                            <label htmlFor="modelCar">Model Car</label>                            <input type="model" name="model" className="form-control" id="modelCar"                                   onChange={this.onChangeNewCar()}                                   placeholder="Passat" value={this.state.new_car.new_car.make}/>                        </div>                        <div className="form-group">                            <label htmlFor="userCar">User</label>                            <select className="form-control" name="user_id"                                    onChange={this.onChangeNewCar()} id="userCar">                                <option>1</option>                                <option>2</option>                            </select>                        </div>                        <button type="submit" className="btn btn-primary">Create Car</button>                    </form>                </div>            </div>        );    }}