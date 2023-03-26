import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { TbDrone } from 'react-icons/tb';
import { selectIsLoggedIn } from '../selectors/appSelector';
import { handleLogoutResponse } from '../actions/app-actions';
import { FaList, FaShoppingCart, FaUserAlt, FaHeart, FaStore } from 'react-icons/fa';

//create the Navbar Component
function Navbar() {
    const isAuthenticated = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();


    const getActiveClass = (currPath) => {
        return currPath === location.pathname ? "btn btn-light nav-buttons active" : "btn btn-light nav-buttons";
    }

    const home = () => {
        navigate('/');
    }
     const contact = () => {
        navigate('/contact');
    }

    const profile = () => {
        navigate('/profile');
    }

    const login = () => {
        navigate('/login');
    }

    const register = () => {
        navigate('/register');
    }


    const logout = () => {
        axios.post('/logout')
            .then(response => {
                navigate('/');
                dispatch(handleLogoutResponse(response));
            });
    }

    return(
        <nav className="navbar justify-content-between dc-default">
            <div className="container">
                <div className="col-3">
                    <a className="navbar-brand" onClick={() => home()}>Dashboard</a>
                </div>
                <div className="col-6 text-center">
                    <Badge bg="success">
                        Connected
                    </Badge>
                </div>
                <div className="col-3 right-contents">
                    {
                        isAuthenticated ? 
                        <button type="button" className="btn btn-light nav-buttons" title="Log out" onClick={() => logout()}>Logout</button> : 
                        ''
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
