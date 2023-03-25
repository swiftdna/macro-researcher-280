import React, { useEffect, useState } from 'react';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaRedo } from 'react-icons/fa';
import { Row, Col, Form, Badge, Spinner } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

function MyBookings() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userObj = useSelector(selectUser);
    const navigate = useNavigate();
    const userLandedPage = useLocation();
    const [allbookingslist,setAllBookingsList] = useState([]);
    const [loading, setLoading] = useState(false);
    let { pageID } = useParams();
    const user_id = useSelector((store) => store.app.user.id);
    const username = useSelector((store) =>store.app.user.name);
    const imageurl = useSelector((store) =>store.app.user.imageurl);
    
    useEffect(() => {
        console.log('pageID - ', pageID);
        if (isLoggedIn && user_id) {
            getBookingsData();
        }
    }, []);

    const getBookingsData = () => {
        setLoading(true);
        axios.post(`/api/userbookings`,{
            id: user_id
        })
        .then(response => {
            setLoading(false);
            // console.log('records -> ', response.data.data);
            setAllBookingsList(response.data.data)
        });
    };

    const readableDate = (date, short) => {
        if (short) {
            return moment(date).format('LT');    
        }
        return moment(date).format('lll');
    }
    

    return(
        <div>
            Welcome to {pageID}
        </div>
    )
}

export default MyBookings;