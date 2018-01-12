import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component{
    render(){
        console.log("Header-Props: ", this.props);
        return(
            <nav className="app-header">
                <div className="app-header-wrapper">
                    <div className="logo-yc"></div>
                    <div className="nav-menu">
                        <NavLink
                            exact to="/"
                            className="btn btn-link"
                            activeClassName="active">Top</NavLink>
                        <NavLink
                            to="/new"
                            className="btn btn-link"
                            activeClassName="active">New</NavLink>
                        <NavLink
                            to="/show"
                            className="btn btn-link"
                            activeClassName="active">Show</NavLink>
                        <NavLink
                            to="/ask"
                            className="btn btn-link"
                            activeClassName="active">Ask</NavLink>
                        <NavLink
                            to="/job"
                            className="btn btn-link"
                            activeClassName="active">Jobs</NavLink>
                    </div>
                    <div className="logo-react"></div>
                </div>
            </nav>
        );
    }
}

export default Header;
