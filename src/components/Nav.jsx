import React from 'react';
import giticon from '../assets/images/git-icon.png';
import logo from '../assets/images/logo.svg';

function Nav() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img className="icons" src={logo}/>
                    </a>
                    
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                       
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <img className="icons" src={giticon}/>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        
        </div>
    )
}

export default Nav
