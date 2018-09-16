import React, {Component} from 'react';import {BrowserRouter as Router, Link, Route} from 'react-router-dom';import Users from './Users';import Cars from './Cars';export default class Header extends Component {    render() {        return (            <Router>                <div>                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">                        <b className="navbar-brand">MEGAKIT</b>                        <button className="navbar-toggler" type="button" data-toggle="collapse"                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"                                aria-expanded="false" aria-label="Toggle navigation">                            <span className="navbar-toggler-icon"></span>                        </button>                        <div className="collapse navbar-collapse" id="navbarSupportedContent">                            <ul className="navbar-nav mr-auto">                                <li className="nav-item active">                                    <Link className="nav-link" to="/">Users<span className="sr-only">current</span></Link>                                </li>                                <li className="nav-item">                                    <Link className="nav-link" to="/cars">Cars</Link>                                </li>                            </ul>                        </div>                    </nav>                    <Route path="/" exact component={Users}/>                    <Route path="/cars" component={Cars}/>                </div>            </Router>        );    }}