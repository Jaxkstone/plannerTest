import React from "react";
import {NavLink} from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <div className="brand-logo"><i className="material-icons">cloud</i>Logo</div>
                <ul className="right hide-on-med-and-down">
                    <li><NavLink to="/todo">TodoList</NavLink></li>
                    <li><NavLink to="/calendar">Calendar</NavLink></li>
                    <li><NavLink to='#'><i className="material-icons">search</i></NavLink></li>
                    <li><NavLink to='#'><i className="material-icons">view_module</i></NavLink></li>
                    <li><NavLink to='#'><i className="material-icons">refresh</i></NavLink></li>
                    <li><NavLink to='#'><i className="material-icons">more_vert</i></NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar