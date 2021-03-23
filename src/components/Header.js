import React from 'react'
import { Link, useLocation } from "react-router-dom"
function Header() {
    const location = useLocation();
    if (location.pathname === '/login' || location.pathname === '/register' ) {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
                    aria-expanded="false" aria-label="Toggle navigation" />
                <span className="navbar-toggler-icon"></span>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="#">GMS</a>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

                    </ul>
                    <button className="btn btn-success my-2 my-sm-0" type="submit">
                        <Link to='/login'>Login / Register</Link> </button>
                </div>
            </nav>
        )
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
                aria-expanded="false" aria-label="Toggle navigation" />
            <span className="navbar-toggler-icon"></span>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a className="navbar-brand" href="#">GMS</a>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link to='/home' className="nav-link">Home</Link> 
                    </li>
                    <li className="nav-item">
                    <Link to='/users' className="nav-link">Users</Link> 
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <button className="btn btn-success my-2 my-sm-0" type="submit">
                        <Link to='/login'>Log Out</Link> </button>
                </form>
            </div>
        </nav>
    )
}

export default Header
